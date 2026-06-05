# 🔖 作業再開ガイド — lube-catalog

> 別PC / 別セッションでこの作業を再開するための入口。**まずこのファイルを読む。**
> （ローカルの ~/.claude メモリは別PCに引き継がれないため、再開情報はすべてこのリポジトリ内にある）

最終更新: 2026-06-05 / 作業ブランチ: **`tailwind-v4-migration`**

## 再開手順（別PC）
```bash
git fetch origin
git checkout tailwind-v4-migration   # remote から取得
python3 -m http.server 8766          # プレビュー確認（http://localhost:8766/）
```
このブランチは **main 未マージ**。コミット履歴は下記「これまでの作業」を参照。

## このブランチでやったこと（完了・コミット済み）
| commit | 内容 |
|---|---|
| 4c28694 | Tailwind v3 Play CDN → **v4 browser CDN + `@theme`** 全39ファイル移行 |
| aac9cd6 | 固定px → v4 標準クラス（preview HTML） |
| a42e09d | document 請求書パネル **fit化**（`min-h-[404px]` 削除） |
| 4ab993b | audit 一部反映（focus-visible 部分 + 一部トークン） |
| 5a9d704 | 固定px → v4 標準クラス（**components.json** の TOKENS） |
| bb0e798 | handoff: M へ focus-ring 確定値を依頼 |

## 残タスク（ここから再開）
**正式な追跡リストは → [`audit-2026-06-05.md`](./audit-2026-06-05.md) の「📌 進捗」セクション。**
ざっくり優先度:
1. **P0 #1**: フォーム共通トークンを残りコンポーネントへ横展開（往復削減 効果最大）
2. **P1 #1 残り**: focus-visible を全インタラクティブ要素へ（今 15/38）
3. **P1 #2**: Table 実運用項目（空状態/行hover/sticky/列幅）丸ごと未着手
4. その他 P0 #2/#5, P1 #3〜5, P2 → audit 参照

## M（Figma）待ちの項目
- **focus-ring の確定値**（色/不透明度/太さ/オフセット）→ [`handoff.md`](./handoff.md) の J→M 2026-06-05 エントリ参照。今は暫定値 `ring-primary/40` 等で実装。確定したら全体一括差し替え。

## 再開者向け 重要メモ（落とし穴）
- **components.json が PROPS/TOKENS テーブルの正**。preview HTML を直すだけだと TOKENS 表に反映されない → **両方直す**。
- **v4 spacing 規約**: `w-N` = N×4px（例 `w-100`=400px）。固定px撤廃は **px÷4** で標準クラス化。
- **意図的に残した arbitrary-px**（変換しない）: font-size `text-[10px]`（ラベル標準・CLAUDE.md）、A4 `min-h-[1086px]`、CSS三角形 border、radio ドット ramp `inset-[4/5/6px]`、select の border-2 補正 `px-[11px]/py-[7px]`、legend offset `top-[-9px]/left-[15px]`。
- **demo-sync チェック**: `bash scripts/check-demo-sync.sh`（States と Demo のトークン一致を検証）。コミット前に走らせる。
- **pre-commit hook は実際には未インストール**（CLAUDE.md に記載あるが `.git/hooks/pre-commit` 無し）→ 手動で demo-sync を回す。
- ルール詳細は **CLAUDE.md**（フォーカスリング節・見出し体系・トークン名の注意など）。

## まだやってない運用タスク
- [ ] **ブラウザでの視覚確認**（colors / sidebar / modal / 請求書 panel）— v4移行後まだ目視してない
- [ ] **main への PR**（v4移行を確定するなら）
