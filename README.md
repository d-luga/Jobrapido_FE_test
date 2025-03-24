# 🗂️ Comment Search App

A React + TypeScript challenge solution for **Jobrapido**.

This app allows users to search comments from a public JSON API and displays contextual results with smart highlighting.

---

## 🚀 Features

- 🔍 Search comments by body text (`https://jsonplaceholder.typicode.com/comments`)
- ✅ Trigger search only on **form submit**
- ✅ Input must be at least **4 characters**
- ✅ Show up to **20 results**
- ✅ Each result shows:
  - Name
  - Email
  - Contextual 64-character snippet from body
- ✨ Highlight matched text inside the body
- ⚠️ Show user-friendly error messages
- 🔁 Retry failed requests
- 🧠 Focus input on load
- 🧪 Tested with **Vitest** + **React Testing Library**
- 🐳 Fully Dockerized (runs on port `8080`)

---

## 📦 Getting Started

### ▶️ Run locally (Dev mode)

```bash
npm install
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

### 🐳 Run with Docker

```bash
docker build -t comment_search .
docker run -p 8080:8080 comment_search
```

Visit: [http://localhost:8080](http://localhost:8080)

---

### 🧪 Run tests

```bash
npm run test
```

---

## 🛠️ Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Docker](https://www.docker.com/)

---

## 🎁 Bonus Ideas (not implemented)

- [ ] 🔠 Typeahead / autosuggestions
- [ ] 📃 Pagination of results

---

## 🤝 Author

Built with ❤️ and clean code by [Me](https://www.linkedin.com/in/denis-lugavtsov/)
---

## 💡 Bonus Implementation Thoughts

If I had more time, I would implement the bonus features as follows:

- **Typeahead / Autosuggestions**: I would track the user's previous search queries or parse unique words from already loaded comments. Then I’d show a filtered dropdown below the input using a custom component (or a native `<datalist>` for simplicity). It would update as the user types and allow arrow key navigation.

- **Pagination**: After fetching and filtering the data, I’d calculate total pages and display a set of navigation buttons (Prev, Next, or numeric). The UI would update based on the selected page using React state, slicing the data appropriately.

Instead, I focused on enhancing search logic (with RegExp), contextual highlighting, and overall UX and test quality.
