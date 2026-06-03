# lube-catalog

lube プロダクト用のコンポーネントカタログ。静的 HTML + Tailwind CSS CDN で構成。

## 構成
```
index.html          # カタログビューア（Alpine.js）
components.json     # コンポーネント登録簿
previews/           # 各コンポーネントの HTML プレビューファイル
```

## コンポーネント追加手順
1. `previews/` に HTML ファイルを作成（例: `button.html`）
2. `components.json` の `components` 配列にエントリを追加:
   ```json
   {
     "id": "button",
     "name": "Button",
     "file": "button.html",
     "category": "actions"
   }
   ```
3. lube 本体の `CLAUDE.md` のコンポーネント一覧も更新する

## プレビューサーバー
```bash
python3 -m http.server 8766 --directory /Users/skrt/Claude/lube-catalog
```

## ルール
- Tailwind CSS 標準クラスのみ使用（ハードコードカラー値禁止、`tailwind.config.js` のテーマトークンを使う）
- アイコンは Lucide
- font-family は Tailwind デフォルト（Google Fonts 不使用）
- States セクションは必ず **md サイズ** で作成する（lg や sm ではなく md が基準）
- States セクションのトークンは Demo セクションにも反映する（`scripts/check-demo-sync.sh` で検証、pre-commit hook で自動チェック）
- Disabled 状態のみ Demo 不要。意図的な除外は `<!-- demo-skip: token1 token2 -->` で宣言
- 既存コンポーネントを内包・利用するプレビューでは、そのコンポーネントの挙動（hover, checked, disabled 等の見た目・インタラクション）を踏襲する。既存プレビューの実装を確認してから組み込むこと
- Figma から取得した arbitrary value（`w-[192px]` 等）は、同値の Tailwind 標準クラスがあれば自動で置き換える（例: `w-[192px]` → `w-48`）。等価クラスがない場合はユーザーに報告する
- Demo 付きコンポーネントは `demoBgWhite: true` を設定する（DEMO タグのコントラスト確保）
