# Syed's Personal Developer Portfolio Website

A modern, fast, and authentic personal portfolio website designed for **Syed**, a second-year college student and aspiring software developer specializing in **Python, FastAPI, PostgreSQL, backend development, and automation**.

## 🎨 Design Philosophy & Highlights
- **Palette**: Warm cream (`#FAF7F2`), Terracotta (`#C85A32`), Burnt orange (`#E07A5F`), Warm brown, and Charcoal.
- **Typography**: Clean hierarchy with *Plus Jakarta Sans* for headings & body, and *JetBrains Mono* for technical code blocks.
- **Authenticity**: Honest student developer portrayal with strictly verified skills and actual projects. No misleading percentage bars or fake statistics.
- **Interactive Visuals**:
  - Live interactive API simulator simulating `FastAPI` + `PostgreSQL` responses.
  - Tiered Architecture Flow Diagram (`Client` → `FastAPI` → `PostgreSQL`).
  - Seamless Light / Warm Dark mode switcher.
  - Toast notifications and 1-click copy-to-clipboard for email.

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Main semantic HTML5 document
├── css/
│   ├── variables.css       # Design tokens (warm palette, dark mode variables)
│   ├── base.css            # CSS reset, typography, container utilities
│   ├── components.css      # Buttons, cards, terminal widget, architecture flow
│   └── responsive.css      # Tablet & mobile responsive breakpoints
├── js/
│   ├── config.js           # ⚙️ Easy configuration (Edit your email/GitHub/LinkedIn here!)
│   ├── terminal.js         # Interactive API request simulator
│   └── main.js             # Theme switcher, scroll spy, copy utility & modals
└── README.md               # Documentation & deployment guide
```

---

## ⚡ How to Preview & Run Locally

### Option 1: Using Python's Built-in HTTP Server (Recommended)
Open your terminal in the `portfolio` folder and run:
```bash
python -m http.server 3000
```
Then visit [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Using VS Code Live Server
Right-click `index.html` and select **"Open with Live Server"**.

---

## 🛠️ How to Customize

All key personal links and placeholder data can be updated in one central file:
👉 **[`js/config.js`](./js/config.js)**

```javascript
const PORTFOLIO_CONFIG = {
  name: "Syed",
  social: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-profile",
    email: "your.real.email@example.com"
  }
};
```

---

## 🚀 Free 1-Click Deployment to GitHub Pages

1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Syed developer portfolio"
   ```
2. Push to your GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Branch**, select `main` and `/ (root)`.
   - Click **Save**. Your site will be live instantly at `https://<your-username>.github.io/<repo-name>/`!
