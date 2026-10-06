# Lab 06: Late fee checks

The campus library charges a fee when a laptop comes back late. A teammate's coding
agent wrote `late_fee` in `fees.py`. In Terminal, you set up the Codex of the ChatGPT
desktop app with project rules and two personas, each with limits that Codex enforces: a
tester that writes tests from `REQUIREMENTS.md` and cannot see `fees.py`, and a reviewer
that reads `fees.py` against `REQUIREMENTS.md` and changes nothing.
The steps, the exercise weights and the submission are in
`lab_week_06_late-fee-tester_sheet.pdf`.

## Files

| File | Purpose |
| --- | --- |
| `REQUIREMENTS.md` | The acceptance criteria for `late_fee`. Keep it unchanged. |
| `fees.py` | The teammate's code. Keep it unchanged. |
| `tests/` | The folder for the tester's tests. |
| `.gitignore` | Keeps Python's `__pycache__` folders out of Git. |

You add `AGENTS.md`, `.codex/agents/tester.toml`, `.codex/agents/reviewer.toml`,
`.codex/config.toml`, `tests/test_fees.py`, `evidence/sandbox-checks.txt` and
`DECISION.md`. Do not submit Codex session files: they use an internal format and may
contain unrelated local metadata.

## Submit

Commit `lab06/` in your private `ai1220` repository and push before the lab ends.
Check the required files on GitHub, then submit the repository URL and the final full
commit hash through the LMS. Make sure the instructor can open the repository. Do not
upload `lab06_files.zip` as your submission.
