---
description: Start work on a GitHub issue — branch, board status, then discuss before building
argument-hint: <issue number>
allowed-tools: Bash(git checkout:*), Bash(git pull:*), Bash(git status:*), Bash(gh issue view:*), Bash(gh project:*)
---

Start ticket #$ARGUMENTS in `rvarela11/pay-my-lawyer`.

1. Run `git status`. If there are uncommitted changes, stop and ask what to do with them.
2. `git checkout main && git pull`, then `git checkout -b $ARGUMENTS-<slug>`, where `<slug>` is 2–4 lowercase words from the ticket's title (e.g. `71-group-setup-components`).
3. Find the issue on the boards (owner `rvarela11`; `gh project list --owner rvarela11`, then `gh project item-list <n> --owner rvarela11 --format json --limit 200`).
   - If it's on no board, ask which one it belongs to, then add it with `gh project item-add`. Auto-add is off.
   - Look up the board's Status field and its "In progress" option with `gh project field-list <n> --owner rvarela11 --format json`, and the project id with `gh project view <n> --owner rvarela11 --format json`. Don't hard-code ids; each board has its own.
   - Set Status to In progress with `gh project item-edit`.
4. Read the ticket (`gh issue view $ARGUMENTS`) and the code it touches.
5. Report back: the branch name, the board status, and the ticket in your own words — what it changes, the files involved, and anything unclear or worth deciding first. Don't build anything until the owner has agreed on the approach.
