import { spawn } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { existsSync } from 'fs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const schoolName = formData.get('schoolName') as string;
    const batchYear = formData.get('batchYear') as string;
    const rosterFile = formData.get('rosterFile') as File | null;
    const photoFiles = formData.getAll('photoFiles') as File[];

    if (!schoolName || photoFiles.length === 0) {
      return NextResponse.json({ error: 'School name and photo files are required.' }, { status: 400 });
    }

    const timestamp = Date.now();
    const safeSchoolName = schoolName.replace(/\s+/g, '_');
    // Store in system temp directory to avoid local project clutter
    const uploadBaseDir = path.join(os.tmpdir(), 'photopro-pipeline', `${safeSchoolName}_${timestamp}`);
    const photosDir = path.join(uploadBaseDir, 'photos');
    await fs.mkdir(photosDir, { recursive: true });

    // Save photos
    for (const file of photoFiles) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(photosDir, file.name);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, buffer);
    }

    // Save roster
    let rosterPath = '';
    if (rosterFile) {
      const bytes = await rosterFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      rosterPath = path.join(uploadBaseDir, rosterFile.name);
      await fs.writeFile(rosterPath, buffer);
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        let isClosed = false;

        const safeEnqueue = (msg: string) => {
          if (!isClosed) {
            try {
              controller.enqueue(encoder.encode(msg));
            } catch (e) {
              console.error('Enqueue error:', e);
              isClosed = true;
            }
          }
        };

        const safeClose = () => {
          if (!isClosed) {
            isClosed = true;
            try {
              controller.close();
            } catch (e) {
              console.error('Stream close error:', e);
            }
          }
        };

        const args = [
          'colab_photography_pipeline.py',
          '--photos_folder', photosDir,
          '--school_name', schoolName,
          '--year', batchYear || '26',
          '--output_folder', path.join(uploadBaseDir, 'OUTPUT')
        ];

        if (rosterPath) {
          args.push('--roster_file', rosterPath);
        }

        if (process.env.OPENAI_API_KEY) {
           args.push('--openai_key', process.env.OPENAI_API_KEY);
        }

        // Set environment variable to force UTF-8 for the child process
        const pythonProcess = spawn('python', args, {
          env: { ...process.env, PYTHONUTF8: '1' }
        });

        pythonProcess.stdout.on('data', (data) => {
          safeEnqueue(data.toString());
        });

        pythonProcess.stderr.on('data', (data) => {
          const msg = data.toString();
          // Filter out normal info/warnings from being labeled as ERROR in the UI
          // Handle both standard '|' and unicode '│'
          const isInfo = /INFO\s*[|│]/.test(msg) || /WARNING\s*[|│]/.test(msg) || msg.includes('Downloading');
          
          if (isInfo) {
            safeEnqueue(msg);
          } else {
            safeEnqueue(`ERROR: ${msg}`);
          }
        });

        pythonProcess.on('close', async (code) => {
          // Cleanup: Delete input photos and roster to save space, keep only OUTPUT
          try {
            if (existsSync(photosDir)) {
              await fs.rm(photosDir, { recursive: true, force: true });
            }
            if (rosterPath && existsSync(rosterPath)) {
              await fs.rm(rosterPath, { force: true });
            }
          } catch (err) {
            console.error('Cleanup error:', err);
          }
          
          safeEnqueue(`PROCESS_COMPLETE: Exit code ${code}\nFINAL_PATH: ${path.join(uploadBaseDir, 'OUTPUT')}`);
          safeClose();
        });

        pythonProcess.on('error', (err) => {
          safeEnqueue(`FATAL_ERROR: ${err.message}`);
          safeClose();
        });
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
