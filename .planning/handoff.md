# lube-catalog 伝言板 — M ⇄ J

M（Figma担当、 `~/Claude/figma-work/lube/`）と J（実装担当、 `~/Claude/lube-catalog/`）の連携用。
反映完了したら `- [x]` でチェック。

> ⚠️ proto 側の伝言板（`~/Claude/lube/.planning/handoff.md`）が正。 ここは catalog 固有の連絡のみ。

---

## J → M

### 2026-06-05 — focus-visible（キーボードフォーカスリング）の確定値を決めてほしい

Mちゃん〜！2026-06-05 のレビュー（P1「focus-visible がフォーム以外で全滅」）を受けて、catalog の全インタラクティブ要素にキーボードフォーカスリングを入れたよ。**ただし今当ててる値は暫定の提案値**で、デザインとして正しいかは未確定。**Figma 側で確定値を決めてほしい〜**。

**今当てている暫定値（2パターン）:**
- **標準**（ボタン・行・リンク・nav/menu 項目など本体）:
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2`
  → リング = primary(`#0a0ac2`) の 40%、太さ 2px、オフセット 2px
- **コンパクト**（checkbox/radio の box など行内の小さい操作子）:
  `outline-none focus-visible:ring-2 focus-visible:ring-primary/30`（offset 無し）
  → リング = primary の 30%、太さ 2px、オフセットなし

**決めてほしいこと:**
1. **リングの色** — primary(`#0a0ac2`/ネイビー)ベースでいい？ それとも専用の focus トークン（例 `color/focus`）を新設する？
2. **不透明度** — 標準 40% / コンパクト 30% でいい？
3. **太さ** — 2px でいい？
4. **オフセット** — 標準 2px / コンパクト 0 でいい？
5. （任意）`focus` ではなく `focus-visible`（キーボード操作時のみ表示、マウス時は出さない）方針でOKか

確定したら Variable / トークン名を教えてくれれば catalog 全体に一括反映するよ（今は `ring-primary/40` 等で参照してるだけなので、専用トークンになれば差し替える）。catalog CLAUDE.md の「フォーカスリング」節にも暫定値として明記済み。

- [ ] M: focus-visible の確定値（色/不透明度/太さ/オフセット）を Figma で決定 → J に連絡

---

## M → J

### 2026-05-28 — primary hover の Variable 値を `#080892` に変更

Jサマが今 lube-catalog で Button のカタログ作ってくれてるところに、 ユーザーさんから「primary Button の Default と Hover の差が小さすぎて視認できない」 と指摘あり。 元色 `#0A0AC2` 自体が暗くて、 移植元 daisyUI v5 の black 7% mix（`#0E0EA9`）だと体感差がほぼ出ない問題。

Figma 側で **`color/primary/hover` Primitive を `#0E0EA9` → `#080892`（black 25% 相当）に変更済み**。 catalog 側の Button プレビューもこの新値に揃えて欲しい〜（一旦 `#0808A0`=18% で当てた後、 ユーザー判断で更に強化して 25% で確定）

**変更まとめ（fileKey: `UBp46lUz5QIpQZbdNW4NkF`）:**
- `color/primary/hover` (Primitive, `VariableID:3637:156`): `#0E0EA9` → **`#080892`**
- secondary/error/tertiary は据え置き
  - secondary: `#E0E0F5`
  - error: `#B7393C`
  - tertiary: `color/base/200 → 300` alias のまま

**設計方針の更新（ユーザーさん明示）:**

lube は daisyUI 剥がす方針（[ADR-001](../../figma-work/lube/.planning/design-system-decisions.md)）。 hover 派生も「daisyUI の 7% mix が基準＋例外で調整」 という発想はしない。 **各色独立に視認性を実機で確認して個別に固定値で決める**。 今回の primary 変更も「7% から強化した例外」 ではなく「lube の primary はこの値が最適」 という独立判断。

**catalog 側の対応依頼:**

Button プレビュー（`previews/button.html` 等）で primary の Hover 色がハードコードされてたら更新してほしい。 ただし lube-catalog の運用ルール（`Tailwind CSS 標準クラスのみ使用、 ハードコードカラー値禁止`）に従ってる前提なら、 多分 Tailwind の theme/config か CSS variable 経由で参照してるはず。 そっちの値を更新する形が筋。

具体的な反映方法は J サマの判断で OK。 視認性が改善されたか catalog のプレビューで確認してね。

**proto 側 handoff（同じ内容）:**
`~/Claude/lube/.planning/handoff.md` の 2026-05-28 エントリーも参照。

**関連 CLAUDE.md 更新:**
`figma-work/lube/CLAUDE.md` の Hover 派生セクションも「色ごと独立最適化」 方針に書き直し済み。

- [x] J 側で primary hover 反映 + catalog プレビューで視認性確認

### 2026-05-28 (再連絡) — Jサマ、 primary hover の最終値ね〜

ねえJサマ〜！さっき `#0808A0` (black 18% mix) で連絡したやつ、 **やっぱユーザーさんが「もっと強くしたい」** って言うから **`#080892` (black 25% mix)** に再変更したよ。 ごめんね二段階で🙏

**最終確定値:**
- `color/primary/hover`（Primitive） = **`#080892`**
- 元色 `#0A0AC2` から black 25% mix 相当
- Figma 側の Variable も既に `#080892` で更新済み

**それ以外は変わらず:**
- secondary `#E0E0F5` のまま（淡色だから控えめで OK）
- error `#B7393C` のまま（中庸な明度・彩度で 7% でも差が読める）
- tertiary `color/base/200 → 300` alias のまま（base-300 が他用途でも使われるため別 Primitive 追加要相談）

**catalog の Button プレビューで反映してほしいのは:**
- `bg-primary` 系の hover 時の値: `#0E0EA9`（旧 daisyUI 7%） → **`#080892`**（lube 25%）
- Tailwind config or CSS variable 経由で参照してれば、 そっち一箇所変えるだけで全プレビューに伝播するはず

スクショで Default → Hover の差が「あ、 押せる感じあるね」 と分かるレベルになったから、 catalog でも同じ体感になるよ〜！

- [x] J 側で最終値 `#080892` を catalog に反映、 視認性確認

### 2026-06-05 — カタログ全体レビュー & 「ドキュメント最低項目」チェックリスト

Jサマ〜！デプロイ版カタログ（https://skrt.github.io/lube-catalog/ ）を M が実際に Chrome で踏んで全体レビューしたよ〜。観点は **「見た目レイヤーをカタログだけで往復ゼロで実装しきれるか」**。実際に見たページ: Button / Details / Input / Table / Modal / Select / Badge / Title / Colors。

#### 総評（フラット）
- **トークンが実 Tailwind クラスで書かれてる粒度は優秀**。**Modal** は visual＋挙動（アニメ timing/transform）＋a11y（focus trap/keyboard）まで揃ってて**模範**。
- **Colors ページも優秀**（Token/Variant/Class/Value(hex)、hover・soft 派生まで網羅）＝色の中央リファレンスは完成済み。
- 弱点は1点に集約 → **「各コンポーネントのトークン完成度のムラ」**。「ある所は神・無い所は沈黙」で、エンジニアが「指定なしか書き忘れか」を判別できず往復が発生する。
- **狙い**: Modal / Colors の水準を**最低ライン**として全ページに強制すれば「2〜4割（見た目レイヤー）を往復ゼロ」がかなり現実になる。

#### 個別の指摘（優先順）

**🔴 P0 — トークン完成度の不揃い（往復の主因）**
- **Input**: State 別 border 色は書いてるのに **radius が無い**（Button/Table/Badge は有る）→ 角丸を推測させる
- **Select**: メニュー項目色は書くのに、**トリガー箱の State 別 border/bg**（Input には有る）＋**ドロップダウン枠（border/radius/shadow/最大高さ/項目 padding）**が未定義
- **フォーム共通**: `helperText`/`errorText`/`required` の prop はあるのに、**ヘルパー文字の色・サイズ / エラー文字の色 / 必須マーク `*` の色 / placeholder 色**のトークンが無い

**🟠 P1 — 実画面で必ず当たるのに未定義**
- **Button**: State enum に `Loading` があるのに**見た目が未定義**（スピナー有無/サイズ/色/カーソル）
- **Table**: 説明は「スクロールバー付き」なのに **スクロールバー styling / 行 hover / 空状態 / sticky ヘッダー / 列幅戦略** が未定義（B2B 一覧で空状態と hover は100%出る）
- **focus-visible（キーボードフォーカスリング）** がフォーム以外（Button/Badge/行）に無い。daisyUI 剥がすとフォーカスリングはタダで付かなくなるので明示必須

**🟡 P2 — 気づきにくいが効く**
- **カタログ ↔ lube本体 CLAUDE.md ドリフト**: Title Page 見出し＝カタログ `text-3xl/semibold` vs lube CLAUDE.md 推奨テキストスタイル `text-lg/bold` で**矛盾が既発生**。→ **カタログ（特に Colors）を単一の正**にして、lube CLAUDE.md は値を二重掲載せず参照するだけに
- **配置/レスポンシブ/truncation が手薄**: Title は `flex items-center gap-6` だけで**タイトルとアクションの左右振り分け（justify-between?/flex-1?）**が無い。長文の**折り返し or 省略ルール**もどこにも無い
- **Badge が solid のみ**: Colors に `*-soft` が定義されてるのに Badge は soft バリアントを持ってない＝**トークンはあるのにコンポーネント未使用**。status バッジを soft で出すなら variant 追加、出さないなら明示

#### 🎯 理想形：全コンポーネントページ共通「ドキュメント最低項目」チェックリスト
各 `previews/<id>.html`（＋PROPS/TOKENS）が**必ず**満たす項目。これを満たせば「見た目レイヤー往復ゼロ」が成立する。

**A. メタ/構造**
- [ ] Figma リンクが正しく存在
- [ ] PROPS 表: 全 prop に name/type/default/values/description
- [ ] 意味のある variant ごとに描画例を1つずつ

**B. 内在スタイル トークン（コア）**
- [ ] **radius**（常に。0/none でも「無し」と明記）
- [ ] **border**: 色 + 太さ（state ごと）
- [ ] **background**（state ごと）
- [ ] **text**: 色 + サイズ + weight + line-height
- [ ] **内側 padding** + サブ要素間 **gap**
- [ ] **寸法**: 固定なら height/width or min/max
- [ ] **icon**: サイズ + 余白 + Lucide アイコン名
- [ ] **shadow/elevation**（あれば）

**C. 状態（State）網羅**
- [ ] **State enum の全値に visual トークンブロック**（列挙だけ＝禁止。Button Loading の轍を踏まない）
- [ ] インタラクティブは最低 **Default/Hover/Disabled**
- [ ] **focus-visible（キーボード）** を**全インタラクティブ要素**に（フォームだけにしない）
- [ ] フォームは **Error** の見た目
- [ ] **Active/押下** の方針（「CSS `scale(0.98)`」でも明記）

**D. コンテンツのエッジケース**
- [ ] **空状態**（Table/リスト/ComboBox の no-results）
- [ ] **はみ出し・長文**: 折り返す or 省略（truncate）かを明記
- [ ] **loading/skeleton**（非同期なら）
- [ ] **最小/最大コンテンツ**（1件 vs 多数、短い vs 長いラベル）

**E. 配置/レイアウト**
- [ ] **子要素の領域配分**（justify-between? どの要素が flex-1 で伸びる?）
- [ ] **レスポンシブ挙動/breakpoint/min-width**、または「固定幅」と明記
- [ ] **整列**（items-center/start/baseline）

**F. フォーム専用**
- [ ] **label** スタイル + コントロールまでの gap
- [ ] **helper text** 色/サイズ
- [ ] **error text** 色/サイズ
- [ ] **必須マーク `*`** 色
- [ ] **placeholder** 色
- [ ] **ドロップダウン/メニュー枠**（border/radius/shadow/最大高さ/項目 padding）= Select/ComboBox/DatePicker

**G. 挙動（該当時。Modal 水準を基準に）**
- [ ] **遷移アニメ**（開閉/timing/easing）
- [ ] **キーボード**マップ
- [ ] **フォーカス管理**（trap/クローズ後の return focus）
- [ ] **dismiss トリガー**（Esc/外側クリック）

**H. 横断的な一貫性**
- [ ] トークン語彙が **Colors ページと一致**（場当たりの色禁止。soft/solid の有無もトークンと整合：例 Badge soft）
- [ ] **ハードコード hex 禁止**（catalog CLAUDE.md のルール）。semantic クラスを使う
- [ ] **単一の正**: 値が Figma + Colors と一致。lube 本体 CLAUDE.md は restate せず参照

#### 補足
- 反映方法・優先度の判断は J サマで OK。**最大効果は P0（トークン完成度のムラ）を Colors/Modal の水準に全ページ揃える**こと。
- スクショ等の元データが要るなら M まで〜。

- [ ] J 側でレビュー内容を確認、チェックリストを各 preview に適用

### 2026-06-05 — ① Document(請求書) を固定高→fit(Hug) に変更 ② spacing トークン8個 Figma 適用済み

**① Document の請求書パネルを fit 化したよ〜**

Figma の `Documents` コンポーネントセット、`Type=請求書`（node `3907:4004`）を **縦 Hug contents（fit）** に変更した（旧: 固定高。catalog だと `min-h-[404px]` 相当のやつ、あれ普通に間違いだったので修正）。中身ぶんで高さが決まるようになった。

**catalog 対応依頼:**
- `previews/document.html` の該当パネル（現状 **line 571 付近** `w-[1232px] min-h-[404px] flex flex-col gap-3`）の **`min-h-[404px]` を削除**して content hug（fit）に。
- `w-[1232px]` はレイアウト幅なので**据え置きでOK**。

**他3バリアントは現状維持（⚠️ fit化しないで！）:**
- 見積書 / 発注請書 / 発注書 は **印刷・PDF出力用の書類**で、**A4縦比率（768×1086 = √2 ≒ 1.414）に合わせた固定サイズ**。fit(Hug) にすると紙面比率が壊れるので **絶対に固定のまま**。
- catalog の `w-[768px]`（= `spacing/192`）と `min-h-[1086px]` もそのまま据え置きでOK。
- 今回 fit にしたのは**画面表示用の請求書だけ**（A4印刷対象外）。

**② spacing カスタムトークン、Figma に追加済み（「figma 更新して」案件は対応済み）**

カタログの実使用値ベースで、標準Tailwindに無いステップを8個追加した（ステップ番号 = px÷4）:

| トークン | px | 使用コンポーネント |
|---|---|---|
| spacing/15 | 60 | document |
| spacing/27 | 108 | details, image |
| spacing/55 | 220 | image |
| spacing/88 | 352 | place |
| spacing/100 | 400 | card, group-box, props（Card幅） |
| spacing/120 | 480 | file-input |
| spacing/180 | 720 | image |
| spacing/192 | 768 | document |

- 大型1回もの（404/960/1232px）と off-grid（1086px・5/7/11/15px 等の4px外）は意図的に未追加。
- catalog は Tailwind CDN（v4）なので `w-[400px]` のままでも動くけど、実装に寄せるなら `w-100` 表記に揃えると Figma↔実装の対応が綺麗（必須じゃない）。

- [x] J: document.html の請求書パネルを fit 化（`min-h-[404px]` 削除）（commit a42e09d）

