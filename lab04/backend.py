"""Lab 04 starter: serve a page and an in-memory playlist.

Run with Python 3.10+: python3 backend.py
Exercise 2: complete only the marked create_song(payload) function.
"""

import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.parse import urlsplit


HOST = "127.0.0.1"
PORT = 8000
INDEX_FILE = Path(__file__).with_name("index.html")

# Supplied starting data. Restarting the process restores this playlist.
songs = [{"id": 1, "title": "First Light", "artist": "Demo Band"}]
next_id = 2


def create_song(payload: dict) -> dict:
    """Validate an addition, store it, and return the stored song.

    TODO - Exercise 2
    Complete this function only. The HTTP handler supplies a parsed dict.

    Required behavior:
    - Both title and artist must be present and must be strings.
    - Remove surrounding whitespace from each value.
    - Each trimmed value must contain between 1 and 80 characters inclusive.
    - Ignore extra fields; duplicate titles are allowed.
    - Store the trimmed title and artist in the global songs list with the
      server-assigned integer next_id, preserving insertion order.
    - Advance next_id by one for each accepted addition and return that song.
    - For invalid input, raise ValueError with a helpful message. The supplied
      handler converts this to HTTP 400 and {"error": "your message"}.
    - A rejected addition must leave both songs and next_id unchanged.

    The seed song has id 1, so the first accepted addition must have id 2.
    """
    global next_id

    values = {}
    for field in ("title", "artist"):
        if field not in payload:
            raise ValueError(f"Missing {field}.")
        value = payload[field]
        if not isinstance(value, str):
            raise ValueError(f"{field.capitalize()} must be a string.")
        value = value.strip()
        if not 1 <= len(value) <= 80:
            raise ValueError(f"{field.capitalize()} must be between 1 and 80 characters.")
        values[field] = value

    song = {"id": next_id, "title": values["title"], "artist": values["artist"]}
    songs.append(song)
    next_id += 1
    return song


# Supplied HTTP setup: no exercise changes are needed below this line.
class PlaylistHandler(BaseHTTPRequestHandler):
    def send_json(self, status: int, data) -> None:
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        path = urlsplit(self.path).path

        if path == "/":
            body = INDEX_FILE.read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)
        elif path == "/songs":
            self.send_json(200, songs)
        else:
            self.send_json(404, {"error": "Path not found."})

    def do_POST(self) -> None:
        if urlsplit(self.path).path != "/songs":
            self.send_json(404, {"error": "Path not found."})
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length < 0:
                raise ValueError
        except ValueError:
            self.send_json(400, {"error": "Invalid Content-Length header."})
            return

        try:
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
        except (json.JSONDecodeError, UnicodeDecodeError):
            self.send_json(400, {"error": "Request body must contain valid JSON."})
            return

        if not isinstance(payload, dict):
            self.send_json(400, {"error": "Request body must be a JSON object."})
            return

        try:
            song = create_song(payload)
        except ValueError as error:
            self.send_json(400, {"error": str(error)})
            return
        except NotImplementedError as error:
            # Expected until Exercise 2 is completed.
            self.send_json(501, {"error": str(error)})
            return

        self.send_json(201, song)


def main() -> None:
    server = HTTPServer((HOST, PORT), PlaylistHandler)
    print(f"Open http://{HOST}:{PORT}/ in your browser.", flush=True)
    print("Press Ctrl+C to stop. Restarting resets the playlist.", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
