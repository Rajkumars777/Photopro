export type Language = 'en' | 'ja';

export const dictionaries = {
  en: {
    nav: {
      dashboard: "Dashboard",
      documentation: "Documentation",
      deployment: "Deployment",
      getStarted: "Get Started",
    },
    hero: {
      badge: "Introducing the Future of School Photography",
      title1: "Perfecting",
      title2: "Student",
      title3: "Photo Framing",
      subtitle: "A high-precision AI photography pipeline for schools. Automate student roster matching, frame generation, and batch exports.",
      ctaPrimary: "Deploy Pipeline",
      ctaSecondary: "View Documentation",
    },
    features: {
      faceRec: {
        title: "Facial Recognition",
        desc: "Advanced AI models detect and frame each student perfectly."
      },
      batch: {
        title: "Batch Processing",
        desc: "Process hundreds of photos simultaneously with zero effort."
      },
      export: {
        title: "Automated Export",
        desc: "Generate organized folders with correctly named files instantly."
      },
      pills: {
        sorting: "Student Sorting",
        roster: "Roster Logic",
        layout: "Frame Layouts",
        batch: "Batch Framing",
        grouping: "Smart Grouping",
        branding: "Auto Branding",
      }
    },
    automation: {
      title: "System Automation Hub",
      subtitle: "Monitor pipeline health, system metrics, and deploy processing workloads in real-time.",
      upload: {
        photos: "Upload Photos (100CANON)",
        roster: "Upload Roster Form (Excel)",
        photosSelected: "photos ready",
        rosterSelected: "roster ready",
        dragDrop: "Drag & drop your files here",
        orBrowse: "or click to browse",
      },
      controls: {
        begin: "Begin Operation",
        processing: "Processing...",
        cancel: "Cancel",
        cancelText: "Upload processing will be aborted.",
        downloadBtn: "Results Ready - Download",
        downloadText: "Download processed ZIP archive.",
      },
      monitor: {
        title: "System Monitor",
        metrics: {
          load: "Engine Load",
          cadence: "Cadence",
          sync: "Sync",
        },
        status: {
          idle: "Idle",
          active: "Active",
        },
        logs: {
          title: "System Logs",
          clear: "Clear Logs",
          filterAll: "All Logs",
          filterError: "Errors",
          filterPhase: "Phases",
          empty: "Waiting for system input..."
        },
        timeline: {
          upload: "Upload",
          parse: "Parse",
          analyze: "Analyze",
          export: "Export"
        }
      }
    }
  },
  ja: {
    nav: {
      dashboard: "ダッシュボード",
      documentation: "ドキュメント",
      deployment: "デプロイ",
      getStarted: "はじめる",
    },
    hero: {
      badge: "学校写真の未来をご紹介",
      title1: "完璧な",
      title2: "生徒の",
      title3: "写真フレーミング",
      subtitle: "学校向けの高精度AI写真パイプライン。生徒名簿の照合、フレーム作成、一括エクスポートを自動化します。",
      ctaPrimary: "パイプラインのデプロイ",
      ctaSecondary: "ドキュメントを見る",
    },
    features: {
      faceRec: {
        title: "顔認識",
        desc: "高度なAIモデルが各生徒を検出し、完璧にフレーミングします。"
      },
      batch: {
        title: "バッチ処理",
        desc: "数百枚の写真を同時に処理し、手間をゼロにします。"
      },
      export: {
        title: "自動エクスポート",
        desc: "正しく名前が付けられたファイルを含む整理されたフォルダを即座に生成します。"
      },
      pills: {
        sorting: "生徒の仕分け",
        roster: "名簿ロジック",
        layout: "フレームレイアウト",
        batch: "一括フレーミング",
        grouping: "スマートグループ化",
        branding: "自動ブランディング",
      }
    },
    automation: {
      title: "システム自動化ハブ",
      subtitle: "パイプラインの健全性、システム指標を監視し、処理ワークロードをリアルタイムでデプロイします。",
      upload: {
        photos: "写真のアップロード (100CANON)",
        roster: "名簿ファイルのアップロード (Excel)",
        photosSelected: "枚の写真が準備完了",
        rosterSelected: "名簿が準備完了",
        dragDrop: "ここにファイルをドラッグ＆ドロップ",
        orBrowse: "またはクリックして参照",
      },
      controls: {
        begin: "処理を開始",
        processing: "処理中...",
        cancel: "キャンセル",
        cancelText: "アップロードの処理は中止されます。",
        downloadBtn: "結果の準備完了 - ダウンロード",
        downloadText: "処理されたZIPアーカイブをダウンロードします。",
      },
      monitor: {
        title: "システム・モニター",
        metrics: {
          load: "エンジン負荷",
          cadence: "ケイデンス",
          sync: "同期",
        },
        status: {
          idle: "待機中",
          active: "稼働中",
        },
        logs: {
          title: "システムログ",
          clear: "ログを消去",
          filterAll: "すべて",
          filterError: "エラー",
          filterPhase: "フェーズ",
          empty: "システム入力を待機中..."
        },
        timeline: {
          upload: "アップロード",
          parse: "解析",
          analyze: "分析",
          export: "出力"
        }
      }
    }
  }
};
