# GUCC Cyber Security Society – Official Website

**Live site:** [https://irtizaa6x.github.io/csweb.demo/](https://irtizaa6x.github.io/csweb.demo/)

---

## How the entire website works

This is a **static HTML/CSS/JavaScript** website. All content (text, images, events, blogs, committee members, etc.) is stored in one file: **`data.js`**.

When you open any page:
1. The page loads its HTML structure.
2. `script.js` reads the data from `data.js`.
3. JavaScript injects the data into the HTML (events, blogs, committee cards, contact info, FAQ, etc.).
4. The page also loads shared components (`navbar.html` and `footer.html`) using `fetch()`.
5. Countdown timers, stats counters, typing animation, mobile menu, and scroll effects start automatically.

Because content is separated from structure, you can update the website by editing **only `data.js`** – no HTML changes needed.

---

## File roles

| File | What it does |
|------|---------------|
| `index.html` | Homepage structure (hero, features, countdown, stats, activities). |
| `events.html` | Events page structure + container for active event banner and event grid. |
| `blogs.html` | Blog posts grid container. |
| `about.html` | About page structure (text + image). |
| `committee.html` | Committee page container for member cards. |
| `contact.html` | Contact page (info cards, form, FAQ, map). |
| `navbar.html` | Top navigation bar (loaded into every page). |
| `footer.html` | Footer with social links (loaded into every page). |
| `data.js` | **All dynamic content** – events, blogs, committee members, contact info, social links, FAQ, features, stats, activities, active event, countdown target, page titles. |
| `script.js` | Reads `data.js`, renders everything (events, blogs, committee, etc.), handles countdown, typing animation, stats counter, mobile menu, navbar hide/show on scroll, contact form validation, scroll reveal. |
| `style.css` | All colors, fonts, grid layouts, responsive design, animations, button effects. |

---

## What happens on each page

### Homepage (`index.html`)
- Hero section with typing animation.
- Features (from `data.js`) – displayed as cards.
- Countdown timer – counts down to the date in `countdownTarget`.
- Statistics (from `data.js`) – animated numbers.
- Activities (from `data.js`) – list of club operations.

### Events page (`events.html`)
- **Active event banner** – shows the event from `activeEvent` (name, date, location, status, CTA button). Appears on top.
- **All events** – past and upcoming events from the `events` array. Each event shows date, title, description, speakers, location, and a badge (e.g., "✅ Completed").

### Blogs page (`blogs.html`)
- Displays all blog posts from the `blogs` array.
- Each blog card shows an image, category, title, summary, and a "Read More" link.

### About page (`about.html`)
- Shows club description, highlights, and a team image from `aboutContent`.
- Also displays the activities grid (same as homepage) below.

### Committee page (`committee.html`)
- Groups members by category (e.g., Moderator Team, Executive Committee).
- Each member card shows: name, role, and an optional photo (if `imageUrl` is provided). No email or phone shown.

### Contact page (`contact.html`)
- **Contact info cards** – address and email (from `contactInfo`). No phone number.
- **Contact form** – when submitted, it opens the user's default email client with pre‑filled recipient (`gucc.css.gub@gmail.com`), subject, and message body. The user clicks Send inside their email client.
- **FAQ** – from `faq` array, shows questions and answers.
- **Google Map** – embedded map showing Green University location.

### Shared components
- **Navbar** – loaded on every page. On mobile, it turns into a hamburger menu. The navbar hides when scrolling down and reappears when scrolling up or moving the mouse to the top edge.
- **Footer** – loaded on every page. Social links come from `socialLinks` in `data.js`.

---

## Dynamic features

| Feature | How it works |
|---------|---------------|
| Countdown | Reads `countdownTarget` from `data.js`, calculates remaining time, updates every second. |
| Stats counter | When the stats section comes into view, numbers count up from 0 to the target value. |
| Typing animation | Cycles through hacker‑style commands in the hero section. |
| Scroll reveal | Elements fade and slide up when they enter the viewport. |
| Mobile menu | Navbar toggles open/close with a button. |
| Navbar hide/show | On desktop, navbar hides when scrolling down, reappears when scrolling up or hovering near the top. |
| Contact form | Uses `mailto:` – no backend. Opens user's email client with pre‑filled content. |

---

## How to update content (for club moderators)

1. Open `data.js`.
2. Find the relevant array or object (e.g., `events`, `blogs`, `committeeGroups`, `activeEvent`, etc.).
3. Edit the text, add new items, or remove items following the existing format.
4. Save the file and refresh the website.

Example: to change the active event, edit `activeEvent` and `countdownTarget`.  
To add a blog post, add a new object to the `blogs` array.

No coding knowledge is needed – just follow the structure already inside `data.js`.

---

## Technical notes

- The website must be served from a **local server** (like VS Code Live Server) or GitHub Pages – it won't work by opening files directly (because `fetch()` is used for navbar and footer).
- All JavaScript is vanilla ES6 – no frameworks or external libraries except FontAwesome and Google Fonts.
- Images can be hosted anywhere (use full URLs or relative paths inside the project folder).

---

**Live website:** [https://irtizaa6x.github.io/csweb.demo/](https://irtizaa6x.github.io/csweb.demo/)  
**Contact:** gucc.css.gub@gmail.com