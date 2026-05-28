# lube-catalog 伝言板 — M ⇄ J

M（Figma担当、 `~/Claude/figma-work/lube/`）と J（実装担当、 `~/Claude/lube-catalog/`）の連携用。
反映完了したら `- [x]` でチェック。

> ⚠️ proto 側の伝言板（`~/Claude/lube/.planning/handoff.md`）が正。 ここは catalog 固有の連絡のみ。

---

## M → J

### 2026-05-28 — primary hover の Variable 値を `#0808A0` に変更

Jサマが今 lube-catalog で Button のカタログ作ってくれてるところに、 ユーザーさんから「primary Button の Default と Hover の差が小さすぎて視認できない」 と指摘あり。 元色 `#0A0AC2` 自体が暗くて、 移植元 daisyUI v5 の black 7% mix（`#0E0EA9`）だと体感差がほぼ出ない問題。

Figma 側で **`color/primary/hover` Primitive を `#0E0EA9` → `#0808A0`（black 18% 相当）に変更済み**。 catalog 側の Button プレビューもこの新値に揃えて欲しい〜

**変更まとめ（fileKey: `UBp46lUz5QIpQZbdNW4NkF`）:**
- `color/primary/hover` (Primitive, `VariableID:3637:156`): `#0E0EA9` → **`#0808A0`**
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

- [ ] J 側で primary hover 反映 + catalog プレビューで視認性確認
