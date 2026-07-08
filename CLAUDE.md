# lube-catalog

lube プロダクト用のコンポーネントカタログ。静的 HTML + Tailwind CSS CDN で構成。

## 構成
```
index.html          # カタログビューア（Alpine.js）
components.json     # コンポーネント登録簿
previews/           # 各コンポーネントの HTML プレビューファイル
```

## カタログ構造仕様（テンプレート）

カタログは **ビューア `index.html` が定義する固定テンプレート**で構成される。各コンポーネントは components.json のフラグで**必要なセクションだけを点灯**させる（統一テンプレートからの取捨選択）。追加・変更は必ずこの構造に従う。

### セクション（固定順・出所・点灯条件）

| # | セクション | 出所 | 点灯条件 |
|---|---|---|---|
| 1 | Usage | components.json `usage`（when / avoid / rules / tables / vs） | usage が存在 |
| 2 | Variants | preview HTML（`?view=preview`） | 常時 |
| 3 | Examples | preview の `#examples-section`（`?view=examples`） | components.json `hasExamples: true` |
| 4 | Props | components.json `props[]` | props が非空 |
| 5 | Tokens | components.json `tokens[]` | tokens が非空 |
| 6 | Demo | preview の `#demo-section`（`?view=demo`） | components.json `hasDemo: true` |
| 7 | Spec | components.json `spec`（states / behavior / keyboard / anatomy） | spec が存在 |

- **Usage は「いつ・何に使うか」**（2026-07-08 新設）。「作る前に読む」情報なので Variants より上に表示される。実装時はまず Usage を読んでから preview をコピーすること
- preview HTML が持つのは **Variants 本体 ＋（任意で）`#demo-section` / `#examples-section`** だけ。
- **Usage / Props / Tokens / Spec は preview に書かない**。すべて components.json のデータ（ビューアが描画）。
- **セクション見出し（`text-xl uppercase`）はビューアが描画する。preview に手書きしない**（二重見出しになる）。

### 追加物 → 行き先（配置判断マップ）

| 入ってくるもの | 行き先 | 実体 |
|---|---|---|
| 用途・使い分けのルール | Usage | components.json `usage`。`when`(いつ使うか) / `avoid`(使わないとき・注意) / `rules`(使い方のルール) は string 配列、`tables`(色・サイズ等の区分ルール) は `[{title, items:[{label, desc}]}]`、`vs`(**他コンポーネントとの対比のみ**) は string 配列。実例(examples)は持たない |
| 状態 / サイズ等のバリアント | Variants | preview 本体に小見出し（`text-xs text-gray-400 tracking-wider`・ドットなし）で追加 |
| 操作できるデモ | Demo | preview に `#demo-section` ＋ components.json `hasDemo: true` |
| 利用パターン / 画面例 | Examples | preview に `#examples-section` ＋ `hasExamples: true` ＋ top-script を view 3分割対応に |
| プロパティ | Props | components.json `props[]`（既存の粒度・順序に合わせる） |
| デザイントークン | Tokens | components.json `tokens[]`（category → items → tokens 構造） |
| 挙動 / 状態遷移 / キー操作 | Spec | components.json `spec.{states, behavior, keyboard}` |

迷ったら**新セクション見出しを作らず既存に寄せる**。テンプレにきれいに収まらない場合は勝手に作らず**ユーザーに確認**する。

### 不変則（追加・変更後の必須セルフレビュー）

- **フラグ↔マーカーは必ずペア**：`hasDemo` ⇔ `#demo-section` / `hasExamples` ⇔ `#examples-section`（片方だけは禁止）
- Examples を持つ preview は top-script が `view === "examples"` を処理していること
- components.json の各エントリは同じキー構成を保つ：`id / name / description / category / preview / figmaUrl / usage / hasDemo / hasExamples / props / tokens / spec`（usage は figmaUrl の直後。figmaUrl が無いエントリは preview の直後）
- **usage は全コンポーネント必須**（2026-07-08 で全40件投入済み）。コンポーネントの用途・使い分けが変わる変更をしたら usage も更新する（画面レベルの原則は lube 本体 CLAUDE.md「デザイン原則」が正・二重記載しない）
- `category` は既存7種から選ぶ：`design-tokens / actions / forms / data-display / feedback / navigation / layout`
- preview にセクション見出し（`text-xl uppercase`）を書いていないこと

## コンポーネント追加・変更手順
0. **着手前に上記「カタログ構造仕様」と、対象ファイル（該当 preview ＋ components.json エントリ）の既存構成を確認する。** 末尾に単純追加せず、配置判断マップに従って行き先を決める
1. `previews/` に HTML ファイルを作成/編集（Variants 本体 ＋ 必要なら `#demo-section` / `#examples-section`）
2. `components.json` の `components` 配列にエントリを追加/更新（既存エントリと同じキー構成）:
   ```json
   {
     "id": "button",
     "name": "Button",
     "description": "ボタン",
     "category": "actions",
     "preview": "previews/button.html",
     "hasDemo": false,
     "hasExamples": false,
     "props": [],
     "tokens": []
   }
   ```
3. lube 本体の `CLAUDE.md` のコンポーネント一覧も更新する
4. 不変則（上記）をセルフレビューする

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

### プレビュー構成
- States セクションは必ず **md サイズ** で作成する（lg や sm ではなく md が基準）
- States セクションのトークンは Demo セクションにも反映する（`scripts/check-demo-sync.sh` で検証、pre-commit hook で自動チェック）
- Disabled 状態のみ Demo 不要。意図的な除外は `<!-- demo-skip: token1 token2 -->` で宣言
- 既存コンポーネントを内包・利用するプレビューでは、そのコンポーネントの挙動（hover, checked, disabled 等の見た目・インタラクション）を踏襲する。既存プレビューの実装を確認してから組み込むこと
- デモ背景はプレビュー内の `.in-iframe.demo-only body` CSS で指定する（components.json にフラグは持たない）

### フォーカス表現
- **ボタン系・ナビ系**: `ring`（box-shadow）でフォーカスを表現。レイアウトに影響しない
  - **標準**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`
  - **コンパクト（checkbox/radio の box 等）**: `outline-none focus-visible:ring-2 focus-visible:ring-primary`（offset 無し）
- **フォーム系**（input, select, combobox, date-picker 等）: `border-2` でフォーカスを表現（Focus: `border-2 border-primary`、Error: `border-2 border-error`）。ring は使わない
  - border-2 によるサイズ変動は padding 補正で吸収する（例: `px-[11px]`）
  - 理由: Error 状態も border-2 を使うため、ring に統一しても padding 補正は残る。2つの仕組みを混在させるより border-2 で統一した方がシンプル
- `focus:` ではなく **`focus-visible:`** を使う（マウス操作時に出さず、キーボード操作時のみ表示）
- `tabindex="0"` と `@keydown.enter` は操作対象の要素に付け、クリックエリアは親要素で広く取る

### 見出し体系（セクションタイトル / サブタイトル）
- **セクションタイトル**（VARIANTS, PROPS, TOKENS, DEMO, SPEC, EXAMPLES）: `text-xl font-normal text-base-content mb-4 uppercase` ※これは**ビューアが描画する**スタイル。preview HTML には手書きしない（→「カタログ構造仕様」参照）。preview 内で使うのはサブタイトル以下
- **サブタイトル**（Sizes, States, Color 等）: `text-xs font-normal text-gray-400 tracking-wider mb-4`。**ドットは付けない**（2026-07-08 全体から廃止。既存 preview に残る `flex items-center gap-1.5` は描画に影響しないため順次整理でよい）
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
- **デモ→spec 昇格**: デモで実装したインタラクション・表示仕様は、commit 前に components.json の spec（behavior/keyboard）に昇格させる。spec に書けない実験的な挙動はデモに入れない（デモにだけ存在する暗黙仕様を作らない）

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
