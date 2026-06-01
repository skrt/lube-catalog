# lube-catalog 伝言板 — M ⇄ J

M（Figma担当、 `~/Claude/figma-work/lube/`）と J（実装担当、 `~/Claude/lube-catalog/`）の連携用。
反映完了したら `- [x]` でチェック。

> ⚠️ proto 側の伝言板（`~/Claude/lube/.planning/handoff.md`）が正。 ここは catalog 固有の連絡のみ。

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
