"""Run a three-message conversation through your chat.py and save it as evidence (supplied).

Usage, from the lab10 folder:
    uv run --env-file lmstudio.env python check_chat.py lmstudio
    uv run --env-file ifm.env python check_chat.py ifm

It types the messages into your chat.main() for you, so the model must be reachable. It writes
evidence/lmstudio.json or evidence/ifm.json when every message got an answer. The file holds the base URL,
the messages and what your program printed; it never holds your API key.
"""
import builtins
import io
import json
import os
import sys
import time
from contextlib import redirect_stdout
from pathlib import Path

import chat

QUESTIONS = [
    "Hello! What can you help me with?",
    "My name is Sam and I study physics.",
    "What is my name?",
]

if len(sys.argv) != 2 or sys.argv[1] not in ("lmstudio", "ifm"):
    sys.exit("Usage: python check_chat.py lmstudio   or   python check_chat.py ifm")
label = sys.argv[1]
pending = iter([*QUESTIONS, "/quit"])
turns, output, started = [], io.StringIO(), [0.0]


def type_next(prompt: str = "") -> str:
    """Called by chat.main() whenever it waits for the student's message."""
    if turns:
        turns[-1]["output"] = output.getvalue().strip()
        turns[-1]["seconds"] = round(time.perf_counter() - started[0], 1)
        print(f"\n> {turns[-1]['question']}\n[{turns[-1]['seconds']} s] {turns[-1]['output']}", file=sys.stderr)
    output.seek(0)
    output.truncate()
    line = next(pending)
    if line != "/quit":
        turns.append({"question": line})
        started[0] = time.perf_counter()
    return line


builtins.input = type_next
with redirect_stdout(output):
    chat.main()

answers = [turn.get("output", "") for turn in turns]
if len(turns) != len(QUESTIONS) or any("no usable answer" in answer or not answer for answer in answers):
    sys.exit("At least one message got no answer, so nothing was saved. Fix the problem and run this script again.")
Path("evidence").mkdir(exist_ok=True)
evidence = {"label": label, "base_url": os.environ.get("LLM_BASE_URL"), "model_setting": os.environ.get("LLM_MODEL"), "turns": turns}
Path(f"evidence/{label}.json").write_text(json.dumps(evidence, indent=2, ensure_ascii=False) + "\n")
print(f"\nSaved evidence/{label}.json", file=sys.stderr)
