# Lab 08: Backend vs. Frontend, Collaborative Playlist

You work in pairs. Together you write the API contract in `CONTRACT.md`. Then one of
you writes the server in `backend.py` (FastAPI) and the other writes the page in
`index.html`. The backend sheet and the frontend sheet (PDFs in this folder) give
the steps and the marking.

## Files

| File | Who | Purpose |
| --- | --- | --- |
| `CONTRACT.md` | both | The API contract. Marked. |
| `TEAM.md` | both | Names, GitHub usernames and roles. |
| `backend.py` | backend person | The server. It also serves `index.html` at `/`. Marked. |
| `index.html` | frontend person | The page: layout and CSS supplied, JavaScript to write. Marked. |
| `pyproject.toml`, `uv.lock` | | The project and its exact package versions. |

## Set up

Move this folder (`lab08_playlist`) into your own `ai1220` repository. Then, in
`lab08_playlist`:

```sh
uv sync --frozen               # once; needs the internet
uv run python backend.py       # http://127.0.0.1:8000 (the page), /docs (the API)
```

Saving `backend.py` restarts the server, and the songs go back to the starting three.

## Submit

Each of you pushes the final `lab08_playlist` folder to your own `ai1220` repository.
