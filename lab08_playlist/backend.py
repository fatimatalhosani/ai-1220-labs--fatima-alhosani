"""Collaborative Playlist instructor reference backend.

Run with:
    uv run python backend.py
"""
from pathlib import Path

import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, JSONResponse

HERE = Path(__file__).resolve().parent


def create_app() -> FastAPI:
    app = FastAPI(title="Collaborative Playlist")

    songs = [
        {"id": 1, "title": "Blue Monday", "artist": "New Order", "votes": 3},
        {"id": 2, "title": "Clocks", "artist": "Coldplay", "votes": 1},
        {"id": 3, "title": "Dancing Queen", "artist": "ABBA", "votes": 0},
    ]

    @app.get("/", include_in_schema=False)
    def page():
        return FileResponse(HERE / "index.html")

    @app.get("/songs")
    def all_songs():
        return songs

    @app.post("/songs", status_code=201)
    async def add_song(request: Request):
        try:
            body = await request.json()
        except ValueError:
            body = {}

        title = body.get("title") if isinstance(body, dict) else None
        artist = body.get("artist") if isinstance(body, dict) else None
        if not isinstance(title, str) or not title.strip() or not isinstance(artist, str) or not artist.strip():
            return JSONResponse(
                status_code=400,
                content={"error": "Title and artist are required"},
            )

        song = {
            "id": max((song["id"] for song in songs), default=0) + 1,
            "title": title,
            "artist": artist,
            "votes": 0,
        }
        songs.append(song)
        return song

    @app.post("/songs/{song_id}/likes")
    def vote(song_id: int):
        for song in songs:
            if song["id"] == song_id:
                song["votes"] += 1
                return song
        return JSONResponse(
            status_code=400,
            content={"error": f"There is no song {song_id}"},
        )

    return app


app = create_app()

if __name__ == "__main__":
    print(
        "Playlist: http://127.0.0.1:8000    "
        "API documentation: http://127.0.0.1:8000/docs",
        flush=True,
    )
    uvicorn.run("backend:app", host="127.0.0.1", port=8000, reload=True)
