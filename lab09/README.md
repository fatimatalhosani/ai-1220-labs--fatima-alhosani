# Lab 09: Campus Coffee Cart

A first React app: a web page for the coffee cart on campus. You write two
components in new files, `src/Welcome.jsx` and `src/DrinkCard.jsx`, put them on
the page in `src/App.jsx`, and add a cup counter with two buttons. The tasks,
the weights and the submission steps are in `lab_week_09_coffee-cart_sheet.pdf`.

## Files

| File | Purpose |
| --- | --- |
| `src/App.jsx` | The whole page, its state and its buttons. Exercises 1 to 4. Marked. |
| `src/Welcome.jsx` | You create it: the title and the opening hours. Exercise 1. Marked. |
| `src/DrinkCard.jsx` | You create it: one drink with its price. Exercise 2. Marked. |
| `src/welcome.test.jsx`, `src/drinkcard.test.jsx`, `src/app.test.jsx` | The six public checks that `npm test` runs. Keep unchanged. |
| `src/main.jsx`, `src/styles.css`, `index.html` | Start React in the page and style it. |
| `package.json`, `package-lock.json`, `vite.config.js` | The project, its exact package versions and its configuration. |
| `.gitignore` | Keeps `node_modules` out of Git. |

## Run

You need Node.js 22.12 or later (`node -v`).

```sh
npm install     # once; needs the internet
npm run dev     # the page at http://127.0.0.1:5175, stop with Ctrl+C
npm test        # the public checks, in a second terminal
```

The page changes each time you save a file. Reloading it starts a new order.

## Submit

From the top folder of your `ai1220` repository:

```sh
git add lab09
git commit -m "Lab 9 coffee cart"
git push
```

Check on GitHub that `lab09/src` holds `App.jsx`, `Welcome.jsx` and
`DrinkCard.jsx`, and that no `node_modules` folder was pushed.
