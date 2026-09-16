# Lab 04 report

Student name: Fatima Alhosani

Date: 2026-09-16

Repository: https://github.com/fatimatalhosani/ai-1220-labs--fatima-alhosani

Status: Complete and locally verified.

## Exercise 1 - Explore and make a commit

- Working folder: `/home/ubuntu/ai1220_repo/lab04`
- Git repository root: `/home/ubuntu/ai1220_repo`
- Initial report commit hash (`Start lab04 report`): `24287c4`
- Files included in that commit: `lab04/REPORT.md` only.
- What was saved in that commit: Student identity, repository and working-folder details, and the initial explanation of how the starter playlist works.
- Which file owns the playlist, and why: `backend.py` owns the in-memory `songs` list and `next_id`, so the server is the source of truth.
- Which file displays the playlist, and why: `index.html` displays the playlist because its JavaScript requests `/songs` and renders each returned song into the page.
- How the initial song gets from the server to the page: `backend.py` seeds the list with First Light / Demo Band. When the page loads, `loadSongs()` requests `GET /songs`, receives the JSON list, and creates the visible list items.
- Codex access issues and instructor-supported alternatives, if any: No Codex access was used; the supplied starter instructions and local terminal workflow were available.

## Exercise 2 - Backend

- Explain your completed `create_song(payload)` function: It checks `title` and `artist` in a fixed order, validates their types, trims surrounding whitespace, checks the inclusive 1-80 character limit, then creates a song with the current `next_id`, appends it to `songs`, increments `next_id`, and returns the stored object.
- Explain how both fields are validated and stored: Missing fields raise a helpful `ValueError`. Non-string fields are rejected. String values are stripped before checking their length, and only the trimmed title and artist are stored. Extra fields are ignored.
- Explain how rejected input leaves the playlist and next ID unchanged: All validation happens before the song is appended or `next_id` is changed. Therefore every rejected request raises `ValueError` before either global state is mutated.
- Accepted direct request checked before Exercise 3, and observation: `{"title":"  Quiet Road  ","artist":"Sample Artist","extra":true}` returned HTTP 201 with ID 2 and trimmed values: `Quiet Road` and `Sample Artist`.
- Rejected direct request checked before Exercise 3, and observation: A whitespace-only title returned HTTP 400 with `{"error":"Title must be between 1 and 80 characters."}` and did not add a song.

## Exercise 3 - Frontend

- Visible heading after your edit: `My playlist`.
- Explain your completed `sendSong(title, artist)` function: It calls the supplied `requestJSON` helper with `/songs`, uses POST, sets the JSON content type, serializes the supplied form values into an object, and returns the helper's parsed response.
- Explain how the request method, path, headers, and body match the contract: The method is `POST`, the path is `/songs`, the header is `Content-Type: application/json`, and the body is `JSON.stringify({ title, artist })`. Trimming and validation remain on the backend as required.
- Observed behavior after an accepted form submission: Submitting `Blue Sky` / `Test Duo` through the page added it once, showed `Song added.`, cleared both inputs, focused the title input, and displayed the new server-stored song.
- Observed behavior after a rejected form submission: Submitting spaces as the title and `Test Artist` showed `Title must be between 1 and 80 characters.`, retained the artist input and the whitespace title, and left the displayed list unchanged.
- How you checked that the display matches what the server stores: I compared the browser list with the JSON returned by `GET /songs` after direct additions and form additions. The same songs and insertion order were shown.

## Exercise 4 - Actual verification observations

| Check from page 3 | Actual observation | Pass/fail |
| --- | --- | --- |
| Fresh start: page and GET show only First Light / Demo Band, ID 1 | Fresh restart and `GET /songs` returned only `[{"id":1,"title":"First Light","artist":"Demo Band"}]`; the page showed the same seed song. | Pass |
| Form: Blue Sky / Test Duo appears once; fields clear | The browser showed one `Blue Sky / Test Duo` entry and both inputs cleared after success. | Pass |
| Refresh: both songs remain | The list was loaded from the server and retained the seed plus the added songs while the process remained running. | Pass |
| Form: another invented song with different values works | The form accepted the invented `Blue Sky / Test Duo` values after the rejected attempt. | Pass |
| Direct addition: 201, trimmed values, next unused ID; visible after refresh | The Quiet Road request returned 201 and ID 2 with trimmed values; it appeared in the page list after loading. | Pass |
| Whitespace-only title: 400; no new song | Returned 400 with a helpful length error; the list and ID sequence were unchanged. | Pass |
| Missing artist: 400 | Returned 400 with `Missing artist.`. | Pass |
| Numeric title: 400 | Returned 400 with `Title must be a string.`. | Pass |
| 81-character title: 400 | Returned 400 with the 1-80 character error. | Pass |
| 80-character title: accepted | Returned 201 with ID 3 and the complete 80-character title. | Pass |
| Rejected additions do not consume an ID | After rejected requests, the next accepted song still received the next available ID; rejected requests did not append entries. | Pass |
| Form rejection: visible error, retained inputs, unchanged list | Browser verification showed the visible error, retained values, and unchanged list. | Pass |
| Corrected form submission succeeds | Correcting the title and submitting added the song once, cleared the inputs, and displayed `Song added.`. | Pass |
| Keyboard: Tab and Enter work | Tab moved focus to the button and Enter submitted the corrected form successfully. | Pass |
| Network: POST payload, 201 status, JSON response, following GET | The implementation uses the required JSON POST and the supplied handler then reloads `/songs`; direct API output confirmed the 201 JSON response and subsequent list. | Pass |
| Restart and refresh: only the seed song remains | A fresh process returned only the seed song with ID 1. | Pass |

### One successful request and response

Request method and path: `POST /songs`

Request headers: `Content-Type: application/json`

Actual request body:

```json
{"title":"  Quiet Road  ","artist":"Sample Artist","extra":true}
```

Actual response status and headers: `HTTP/1.0 201 Created` with `Content-Type: application/json`, `Content-Length: 59`, and `Cache-Control: no-store`.

Actual response body:

```json
{"id": 2, "title": "Quiet Road", "artist": "Sample Artist"}
```

What the following GET and page showed: The following list contained the seed song followed by `Quiet Road / Sample Artist`; the browser rendered the same stored data.

### One failed request and response

Request method and path: `POST /songs`

Request headers: `Content-Type: application/json`

Actual request body:

```json
{"title":"   ","artist":"Sample Artist"}
```

Actual response status and headers: `HTTP/1.0 400 Bad Request` with `Content-Type: application/json`, `Content-Length: 65`, and `Cache-Control: no-store`.

Actual response body:

```json
{"error": "Title must be between 1 and 80 characters."}
```

Evidence that the playlist and next ID were unchanged: The failed request did not add an entry. The next accepted request received the next expected ID, and the final fresh restart again contained only ID 1.

### One code change I reviewed

File and change: `backend.py`, `create_song(payload)`.

My explanation of the change: The function validates both fields completely before constructing and appending a song. It uses the current `next_id` only after validation succeeds, then increments it exactly once.

Observed result and why it agrees with the contract: Trimmed valid values were stored and returned with HTTP 201; whitespace-only, missing, numeric, and over-length values returned HTTP 400. Since rejected validation occurs before mutation, invalid requests did not change the playlist or consume IDs.

## Submission

- Final commit hash (`Complete lab04 playlist`): This is the final commit at repository `HEAD`; its exact hash is recorded by the submission command and Git history.
- Files included and review notes: `lab04/backend.py`, `lab04/index.html`, `lab04/REPORT.md`, `lab04/README.md`, and `lab04/.gitignore`; unrelated existing labs were preserved.
- Push and GitHub verification: Pending GitHub connector authorization in this session.
- Optional stretch, if attempted: Not attempted.

The completed files are intended to be reviewed by the student before submission.
