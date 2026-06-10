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

### Tailwind / スタイル
- Tailwind CSS 標準クラスのみ使用（ハードコードカラー値禁止、`tailwind.config.js` のテーマトークンを使う）
- Figma から取得した arbitrary value（`w-[192px]` 等）は、同値の Tailwind 標準クラスがあれば自動で置き換える（例: `w-[192px]` → `w-48`）。等価クラスがない場合はユーザーに報告する
- アイコンは Lucide
- font-family は Tailwind デフォルト（Google Fonts 不使用）

### トークン構成（components.json）
- トークンカテゴリは **役割軸**（Color/State/Size/Layout/Common 等）で分ける。モード軸（Expanded/Collapsed 等）や部位軸で分けて状態色を重複させない
- **ボタン系**（button, icon-button 等）: `Color`（色バリアント別の bg/hover/text）→ `Common`（radius/border/focus）→ `Size`
- **フォーム系**（input, select 等）: `Size` → `State`（Default/Focus/Error/Disabled の border/bg）→ 固有カテゴリ（Menu 等）→ `Common`（radius/placeholder/helperText/errorText/required）
- **ナビゲーション系**（menu-button 等）: `State`（Default/Hover/Active の bg/text）→ `Layout`（モード別の padding/gap）→ `Common`
- hover トークンの値には `hover:` プレフィックスを付ける（実装コピペ可能な形式）

### プレビュー構成
- States セクションは必ず **md サイズ** で作成する（lg や sm ではなく md が基準）
- States セクションのトークンは Demo セクションにも反映する（`scripts/check-demo-sync.sh` で検証、pre-commit hook で自動チェック）
- Disabled 状態のみ Demo 不要。意図的な除外は `<!-- demo-skip: token1 token2 -->` で宣言
- 既存コンポーネントを内包・利用するプレビューでは、そのコンポーネントの挙動（hover, checked, disabled 等の見た目・インタラクション）を踏襲する。既存プレビューの実装を確認してから組み込むこと
- Demo 付きコンポーネントは `demoBgWhite: true` を設定する（DEMO タグのコントラスト確保）

### フォーカスリング（focus-visible）
- すべてのインタラクティブ要素（button, リンク, nav/menu 項目, トグル等）にキーボードフォーカスリングを明示する。daisyUI 剥がす方針のため自動では付かない
- `focus:` ではなく **`focus-visible:`** を使う（マウス操作時に出さず、キーボード操作時のみ表示）
- **標準（ボタン・行・リンク等の本体）**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2`
- **コンパクトな操作子（checkbox/radio の box 等、行内の小さな要素）**: `outline-none focus-visible:ring-2 focus-visible:ring-primary/30`（offset 無し）。`tabindex="0"` と `@keydown.enter` は box に付け、クリックエリアは親行で広く取る
- リングの色・太さは暫定の提案値。デザイン確定は M（Figma）に確認

### 見出し体系（セクションタイトル / サブタイトル）
- **セクションタイトル**（VARIANTS, PROPS, TOKENS, DEMO, SPEC, EXAMPLES）: `text-xl font-normal text-base-content mb-4 uppercase`
- **サブタイトル**（Sizes, States, Color 等）: `flex items-center gap-1.5 text-xs font-normal text-gray-400 tracking-wider mb-4` + ドット `<span class="w-1 h-1 rounded-full bg-gray-300"></span>`
- サブタイトルに `capitalize` / `uppercase` は使わない（md が Md になる問題を防ぐ）
- サブタイトルにコンポーネント名を含めない（例: ✕ ComboBoxMenu Variants → ○ Menu）

### バリアントと利用例の分離
- コンポーネント固有のバリアント（Default / States / Sizes 等）は VARIANTS セクション内にサブタイトルで配置
- 利用パターン（テンプレート）がある場合は EXAMPLES セクションタイトルで分離し、サブタイトルで個別パターンを表示
- 利用例サブタイトルに「利用例：」プレフィックスは不要（EXAMPLES セクション内なので自明）

### バリアントラベル
- 個別の状態/サイズラベル（sm, md, lg, Default, Hover 等）は `text-[10px] text-gray-400` で統一
- サブタイトル（ドット付き）とは別物。サブタイトルはセクション見出し、ラベルは個別バリアントの注釈

### Spec 記述ルール
- **States の effect**: トークン名やCSS値を使わず、自然な日本語で書く（例: ✕「bg-primary + check アイコン表示」→ ○「チェックマークが表示される」）
- **States と Behavior の重複禁止**: States に書いた遷移（クリック→トグル等）を Behavior で繰り返さない。Behavior は States で表現できない補足情報のみ

### Alpine.js デモ実装
- x-data のロジックが長い場合は関数に切り出す（インライン x-data が長いと HTML パーサーが壊れる）
- 関数定義の `<script>` タグはデモセクション内に配置し `data-demo-keep` 属性を付ける（demo-only モードで除去されないように）
- `x-for` テンプレート内では Lucide の `<i data-lucide>` タグが初期化されない → inline SVG を使う
- `@click.away` は入力欄+メニューを包む親要素に配置する（子要素のクリックが away 判定されるのを防ぐ）
- キーボード操作（ArrowDown/Up, Enter, Escape, Tab）は spec に記載した通りに実装する
- フォーカスリング（`focus-visible:ring`、→「フォーカスリング」節参照）と `tabindex` は操作対象の要素に付ける（行全体ではなくボックスやボタン本体）。クリックエリアは親要素で広く取る
- スクロール: `scrollIntoView({ block: 'nearest' })` でアクティブ項目を追従

### トークン名の注意
- lube のデザインシステムでは `text-primary` = `text-base-content`（#101016、黒）であり、Tailwind デフォルトの primary カラー（青）ではない
- `text-secondary` = `text-base-content/60`（60% opacity）
- この対応を間違えやすいので注意
