# lube-catalog

lube プロダクト用のコンポーネントカタログ。静的 HTML + Tailwind CSS CDN で構成。

## 構成
```
index.html          # カタログビューア（Alpine.js）
components.json     # コンポーネント登録簿
previews/           # 各コンポーネントの HTML プレビューファイル
```

## ⚠️ このリポの .planning/handoff.md は使わない

リポ分割前の残骸。M⇔J 伝言板の正は lube 本体の `~/Claude/lube/.planning/handoff.md`。

## カタログ構造仕様・追加手順（→ 共通スキル `catalog-structure`）

**正は `~/.claude/skills/catalog-structure/SKILL.md`**（2026-09-03 に pro-catalog と共通化・claude-base へ昇格）。セクション固定順・出所・点灯条件／追加物の行き先（配置判断マップ）／**preview / spec の記述規約（小見出し・バリアントラベル・States / Demo の構成・Spec の書き方＝2026-09-03 クロスレビュー #22 で昇格）**／不変則セルフレビュー／追加・変更手順 0〜3／top-script 3分割の正はそちら。**構造を変える時はそちらを編集し、ビューアの変更は pro-catalog の index.html にも入れる**（同型実装）。ここには lube 固有の差分だけ残す:

- `category` は7種: `design-tokens / actions / forms / data-display / feedback / navigation / layout`（pro は navigation 無しの6種）
- Examples セクションは採用済み（`hasExamples: true` 8件）。`spec.anatomy` を 20 件が保持（ビューア未描画）
- usage は全件投入済み（2026-07-08・当時40件）。画面レベルの原則は lube 本体 CLAUDE.md「デザイン原則」が正・二重記載しない
- 旧手順「lube 本体 CLAUDE.md のコンポーネント一覧更新」は 2026-07-15 に廃止（登録簿の正は components.json に一本化）
- **`tokens` のカテゴリ設計（下記「トークン構成」）は昇格対象外**＝lube 固有。pro-catalog は部位軸カテゴリを多数使っており実装が適合しないため（2026-09-03 実測・クロスレビュー #22）

## プレビューサーバー

`.claude/launch.json` に `catalog`（port 8766）を定義済み＝`preview_start` で起動する（pro-catalog と対称・2026-09-03 クロスレビュー #24）。手で立てる場合:

```bash
python3 -m http.server 8766 --directory ~/Claude/lube-catalog
```

## ルール

### Tailwind / スタイル
- Tailwind CSS 標準クラスのみ使用（ハードコードカラー値禁止、各 preview 冒頭の `@theme` ブロックのトークンを使う）
  - ⚠️ **`tailwind.config.js` は 2026-07-27 に削除済み**（Tailwind v4＝`@tailwindcss/browser@4` は v3 形式の JS config を読まない完全な死にファイルで、中身も `error`／旧 soft 値のまま stale だった）。トークンの正は **各 preview の `@theme` ブロック**（値は lube 本体 `app/assets/tailwind/application.css` の @theme と揃える）
- **カスタム text トークンを使う preview は `@theme` にその定義を必ず含める**。特に `text-2xs`（11px）は Tailwind 標準に無いため、`@theme` に `--text-2xs: 11px; --text-2xs--line-height: 16px;` が無いと CDN Tailwind がクラスを生成せず**既定16pxにフォールバックして文字が巨大化する**（2026-07-14 に place/price-table/document/details/quote-table で発生）。app 側 `application.css` の @theme と揃える
- Figma から取得した arbitrary value（`w-[192px]` 等）は、同値の Tailwind 標準クラスがあれば自動で置き換える（例: `w-[192px]` → `w-48`）。等価クラスがない場合はユーザーに報告する
- アイコンは Lucide
- font-family は Tailwind デフォルト（Google Fonts 不使用）
- **スクロールバーは OS 標準（スクロール時のみ表示）＝カスタム描画禁止**（ユーザー確定 2026-07-17）。`::-webkit-scrollbar` / `scrollbar-color` でコンポーネントの見た目としてバーを描かない（プレビュー iframe の飾り消し＝`display: none` 系のデモ用ボイラープレートは対象外）。lube 側は `rake screens:lint` が再導入を検知する

### z-index スケール
- `z-10`: ドロップダウン / ポップアップ系（SelectMenu, ComboBoxMenu, Calendar, FilterMenu）。ローカルな重なり（GroupBox ラベル、Sidebar ホバー Tooltip 等）もここ
- `z-30`: sticky 要素（Footer, Table の Sticky Header）
- `z-40`: Toast
- `z-50`: Modal（最前面。Modal 表示中の Toast は Modal オーバーレイの下に隠れる仕様）
- これ以外の z 値は使わない。新コンポーネントはこのスケールに割り当てる

### トークン構成（components.json）
- トークンカテゴリは **役割軸**（Color/State/Size/Layout/Common 等）で分ける。モード軸（Expanded/Collapsed 等）や部位軸で分けて状態色を重複させない
- **Color vs State の使い分け**: 色バリアントを**選べる**コンポーネント（Primary/Secondary 等）→ `Color`。色バリアントがなく**操作で状態が変わる**だけ → `State`
- **ボタン系**（button, icon-button 等）: `Color`（色バリアント別の bg/hover/text + Disabled）→ `Common`（radius/border/focus）→ `Size`
- **フォーム系**（input, select 等）: `Size` → `State`（Default/Focus/Error/Disabled の border/bg）→ 固有カテゴリ（Menu 等）→ `Common`（radius/placeholder/helperText/errorText/required）
- **ナビゲーション系**（menu-button 等）: `State`（Default/Hover/Active の bg/text）→ `Layout`（モード別の padding/gap）→ `Common`
- **`hover:` プレフィックスの規約**: key が `hover` の行（例: `"hover": "hover:bg-primary-hover"`）は `hover:` 付き（実装コピペ可能な形式）。variant が `Hover` 状態を表す行は、状態側で hover を表現しているため値はプレフィックス無しの素のクラス（例: `"background": "bg-base-200"`）

### フォーカス表現
- **ボタン系・ナビ系**: `ring`（box-shadow）でフォーカスを表現。レイアウトに影響しない
  - **標準**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`
  - **コンパクト（checkbox/radio の box 等）**: `outline-none focus-visible:ring-2 focus-visible:ring-primary`（offset 無し）
- **フォーム系**（input, select, combobox, date-picker 等）: `border-2` でフォーカスを表現（Focus: `border-2 border-primary`、Error: `border-2 border-danger`）。ring は使わない
  - border-2 によるサイズ変動は padding 補正で吸収する（例: `px-[11px]`）
  - 理由: Error 状態も border-2 を使うため、ring に統一しても padding 補正は残る。2つの仕組みを混在させるより border-2 で統一した方がシンプル
- `focus:` ではなく **`focus-visible:`** を使う（マウス操作時に出さず、キーボード操作時のみ表示）
- `tabindex="0"` と `@keydown.enter` は操作対象の要素に付け、クリックエリアは親要素で広く取る

### Alpine.js デモ実装
- x-data のロジックが長い場合は関数に切り出す（インライン x-data が長いと HTML パーサーが壊れる）
- 関数定義の `<script>` タグはデモセクション内に配置し `data-demo-keep` 属性を付ける（demo-only モードで除去されないように）
- `x-for` テンプレート内では Lucide の `<i data-lucide>` タグが初期化されない → inline SVG を使う
- `@click.away` は入力欄+メニューを包む親要素に配置する（子要素のクリックが away 判定されるのを防ぐ）
- キーボード操作（ArrowDown/Up, Enter, Escape, Tab）は spec に記載した通りに実装する
- フォーカスリング（`focus-visible:ring`、→「フォーカスリング」節参照）と `tabindex` は操作対象の要素に付ける（行全体ではなくボックスやボタン本体）。クリックエリアは親要素で広く取る
- スクロール: `scrollIntoView({ block: 'nearest' })` でアクティブ項目を追従

### トークン名の注意（実 @theme 値・混同しやすい）
- 黒い本文・見出し = `text-base-content`（#101016）。補助のグレー文字は `text-base-content/60`
- 青い文字（リンク・Secondary ボタン文字）= `text-secondary-content`（#0a0ac2）。Link・Table の LinkText・Props の Link はこれを使う
- `text-primary` も #0a0ac2 の青（`--color-primary`）だが、**青文字は `text-secondary-content` に統一**する（`text-primary`/`bg-primary` は Primary ボタン等のブランド青用）
- `text-secondary` は文字色ではなく薄いラベンダーの**背景色**（#e8e8fd・`bg-secondary` 用）。文字色として使わない
