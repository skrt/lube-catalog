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
