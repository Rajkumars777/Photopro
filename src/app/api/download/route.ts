import { NextRequest, NextResponse } from 'next/server';
import archiver from 'archiver';
import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import os from 'os';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const folder = searchParams.get('folder');
    
    if (!folder) {
      return NextResponse.json({ error: 'Folder path is required.' }, { status: 400 });
    }

    const outputDir = path.resolve(folder);
    const tempBase = path.join(os.tmpdir(), 'photopro-pipeline');

    // Security check: ensure path is within our photopro-pipeline temp dir
    if (!outputDir.startsWith(tempBase)) {
      return NextResponse.json({ error: 'Access denied: Invalid path.' }, { status: 403 });
    }

    if (!fs.existsSync(outputDir)) {
      return NextResponse.json({ error: 'Output directory not found. It may have been cleaned up.' }, { status: 404 });
    }

    // Create a transform stream for the zip
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.on('data', (chunk) => {
      writer.write(chunk);
    });

    archive.on('end', async () => {
      await writer.close();
      
      // Cleanup: Delete the entire session folder after successful download
      const sessionDir = path.dirname(outputDir);
      try {
        if (sessionDir.includes('photopro-pipeline')) {
           await fsp.rm(sessionDir, { recursive: true, force: true });
           console.log(`Cleaned up session: ${sessionDir}`);
        }
      } catch (err) {
        console.error('Cleanup error during download:', err);
      }
    });

    archive.on('error', (err) => {
      console.error('Archiver error:', err);
      writer.abort(err);
    });

    archive.directory(outputDir, false);
    archive.finalize();

    return new Response(readable, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="photography_results.zip"`,
      },
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
