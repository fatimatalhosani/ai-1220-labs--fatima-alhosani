# Playlist API contract

The server runs on `http://127.0.0.1:8000` and serves the page at the same address.
All response bodies are JSON and use camelCase field names.

## 1. Get all songs

Method: `GET`

Path: `/songs`

Request body: none

Response status: `200`

Response body (the three starting songs):

```json
[
  {"id": 1, "title": "Blue Monday", "artist": "New Order", "votes": 3},
  {"id": 2, "title": "Clocks", "artist": "Coldplay", "votes": 1},
  {"id": 3, "title": "Dancing Queen", "artist": "ABBA", "votes": 0}
]
```

## 2. Add a song

Method: `POST`

Path: `/songs`

Request body:

```json
{"title": "Song title", "artist": "Artist name"}
```

Response status: `201`

Response body:

```json
{"id": 4, "title": "Song title", "artist": "Artist name", "votes": 0}
```

Error status (title or artist missing or empty): `400`

Error body:

```json
{"error": "Title and artist are required"}
```

## 3. Vote for a song

Method: `POST`

Path: `/songs/{id}/likes`

Request body: none

Response status: `200`

Response body:

```json
{"id": 1, "title": "Blue Monday", "artist": "New Order", "votes": 4}
```

Error status (no song with that id): `400`

Error body:

```json
{"error": "There is no song 99999"}
```
