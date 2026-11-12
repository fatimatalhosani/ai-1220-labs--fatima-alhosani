# Lab 10: Study-room desk chat

A terminal chatbot with Pydantic AI. The lab sheet (PDF) has the tasks.

```
uv sync                                                   # once
uv run pytest                                             # public checks, no model needed
uv run --env-file lmstudio.env python chat.py             # chat with your model
uv run --env-file lmstudio.env python check_chat.py lmstudio
```

You write `chat.py` and put the model identifier in `lmstudio.env`. Your own `ifm.env` is never committed.
Keep `check_chat.py` and `tests/` as they are.
