# Lab 04 - Frontend and Backend: starter tasks

This starter was recreated from the supplied Lab 4 student sheet. The original
`lab04_files.zip` was not attached. It provides the supporting server, page,
form handler, and list display described in the sheet. The two marked functions,
heading change, report answers, verification, and Git tasks remain unfinished.

## Setup

1. Extract `lab04_starter.zip`. Copy the five files inside its `lab04` folder
   into `ai1220/lab04/` in your existing private repository. Include `.gitignore`.
   If that folder already has work, review it before copying over files.
2. Keep `backend.py` and `index.html` together. Use Python 3.10 or newer and a
   browser; no extra Python packages, API key, or purchase are needed.
3. Follow the desktop-app setup on page 1 of the student sheet. Use
   `ai1220/lab04` as the working folder in a Local chat.
4. Open a terminal in `lab04/` and run:

   ```bash
   python3 backend.py
   ```

   On Windows, use `py backend.py`.
5. Open <http://127.0.0.1:8000/>. The initial list should show
   **First Light / Demo Band**. Keep the server terminal open.

Use `Ctrl+C` to stop. Restart after Python edits; refresh after HTML edits.
Restarting resets the playlist to the seed song. Adding a song reports
"Not implemented" until the relevant exercises are completed. A direct POST
with a JSON object returns 501 while the backend function is unfinished.

## Files

| File | Starter role / remaining work |
| --- | --- |
| `backend.py` | Supplied HTTP setup and seed data; complete `create_song(payload)`. |
| `index.html` | Supplied helper, form, and display; complete `sendSong(title, artist)` and change the heading. |
| `REPORT.md` | Fill in your name, explanations, commit details, and actual observations. |
| `README.md` | Setup, task checklist, contract, and checks. |
| `.gitignore` | Ignore local Python cache and virtual-environment files. |

## API contract to implement

| Request | Required result after completion |
| --- | --- |
| `GET /` | The browser page. Already supplied. |
| `GET /songs` | 200 and a JSON list of stored songs in insertion order. Already supplied. |
| `POST /songs` | A JSON object containing `title` and `artist`; return 201 and the stored song with its server-assigned integer `id`. |
| Invalid addition | 400 and `{"error": "a helpful message"}`; leave the playlist and next ID unchanged. |

- Both fields must be strings and must be present.
- Remove surrounding whitespace; each trimmed field must have 1-80 characters.
- Store trimmed values and ignore extra fields. Duplicate titles are allowed.
- IDs start at 1 and increase by one for each accepted addition. The seed uses
  ID 1, so the first successful addition uses ID 2.
- JSON requests and replies use `Content-Type: application/json`.
- Data is kept in memory only. The supplied HTTP setup handles malformed JSON,
  non-object bodies, and unknown paths.

## Exercise 1 - Explore and make a commit (15%)

- [ ] Ask for the working folder and Git repository root. Confirm `lab04` and
  the existing `ai1220` repository.
- [ ] Ask how the two code files work together, without changing files yet.
- [ ] Run the starter and inspect the seed song.
- [ ] Enter your name in `REPORT.md` and inspect that change.
- [ ] In your existing repository, commit only `lab04/REPORT.md` with the
  message `Start lab04 report`. Preserve unrelated changes and staging.
  Do not push yet.
- [ ] Verify the commit hash and that the only included file is
  `lab04/REPORT.md`. Record the hash and what was saved in the report.
- [ ] Explain ownership of the playlist, display of the page, and initial song
  loading in your own words. Record any access issue and instructor support.

## Exercise 2 - Complete the Python backend (35%)

- [ ] Complete only `create_song(payload)` in `backend.py`, following its
  docstring and the contract above. Keep the supplied HTTP setup.
- [ ] Restart the server after saving.
- [ ] Check one accepted and one rejected direct request before continuing.
- [ ] Record what actually happened in `REPORT.md`.

## Exercise 3 - Connect the frontend (30%)

- [ ] Change the visible page heading to `My playlist`.
- [ ] Complete only `sendSong(title, artist)`. Send the supplied form values
  as JSON to `POST /songs` using `requestJSON`, and return the helper's result.
- [ ] Ask for an explanation of how the changes match the contract.
- [ ] Refresh and check that an accepted song appears once and clears the inputs.
- [ ] Check that a rejected addition shows an error, keeps the inputs, and
  leaves the displayed list unchanged.
- [ ] Confirm that the displayed songs match the server's stored data.

## Exercise 4 - Verify and explain (20%)

Perform the page 3 checks after completing the marked code. Record actual
observations in `REPORT.md`; the expected results below are not evidence.
Use invented song data. The curl commands work in macOS/Linux shells and
Windows Git Bash. Use a second terminal while the server is running.

- [ ] Restart. The page and this request should show only the seed song, ID 1:

  ```bash
  curl -i http://127.0.0.1:8000/songs
  ```

- [ ] In the form, add `Blue Sky` / `Test Duo`. It should appear once and the
  fields should clear. Refresh: both songs should remain. Add another invented
  song with different values.
- [ ] Add a song directly. Expect 201, trimmed values, and the next unused ID.
  Refresh the page and confirm it appears:

  ```bash
  curl -i http://127.0.0.1:8000/songs \
    -H 'Content-Type: application/json' \
    -d '{"title":"  Quiet Road  ","artist":"Sample Artist"}'
  ```

- [ ] Send invalid input. Expect 400, a helpful error, and no new song:

  ```bash
  curl -i http://127.0.0.1:8000/songs \
    -H 'Content-Type: application/json' \
    -d '{"title":"   ","artist":"Sample Artist"}'
  ```

- [ ] Also check a missing artist, a numeric title, and an 81-character title.
  Check that an 80-character title succeeds. Rejected requests must not
  consume an ID. Both title and artist must follow the same validation rules.
- [ ] Submit spaces as the title and a nonempty artist through the form.
  Confirm that the error is visible, the inputs remain, and the list does not
  change. Correct the title and submit successfully. Check Tab and Enter.
- [ ] In browser Developer Tools > Network, inspect a successful `POST /songs`
  payload, status 201, and JSON response, then the following `GET /songs`.
- [ ] Restart and refresh; confirm that only the seed song remains.
- [ ] Record one successful and one failed request/response, explain one code
  change you reviewed, and prepare to explain both completed functions.

## Finish the lab

- [ ] Keep the five required files in `ai1220/lab04/`.
- [ ] Review and commit the remaining changes in those files with the message
  `Complete lab04 playlist`, preserving other work.
- [ ] Use your existing terminal workflow to run `git push` from the repository
  root before the session ends, then verify the files on GitHub.
- [ ] Optional stretch (ungraded): display the number of songs and check it
  stays correct after additions and refreshes.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| Cannot open the page | Keep the server running and use the exact HTTP URL above. |
| Port 8000 is in use | Stop your earlier lab server with Ctrl+C; ask for help if it is another process. |
| Changes are not visible | Save the file, then restart Python or refresh the browser as appropriate. |
| "Not implemented" | Complete the relevant marked function; this is expected in the starter. |
