<p align="center">
  <img src="https://github.com/user-attachments/assets/ab0aa828-5b93-4d7f-9f91-3994a42ecff7" alt="DuoCodZ Banner" width="100%">
</p>

<p align="center">
  <strong>Duolingo for LeetCode</strong>
</p>

<p align="center">
  <a href="https://duocodz.vercel.app">Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a>
</p>

## About

Data Structures and Algorithms are an essential part of Computer Science. They teach you not only *how* to solve problems, but *why* a solution works, why another approach may not be optimal, and how to think like an engineer.

Platforms like LeetCode make this possible, but staying consistent requires discipline, patience, persistence, and motivation.

DuoCode was created to make that journey more engaging. Instead of feeling like another competitive coding platform, it adds a more playful and interactive experience while helping you stay consistent with your DSA practice.

---

## Features

- **Profile Page** – View your LeetCode statistics and profile information.
- **Compare Page** – Compare progress and statistics between two users.
- **Home Page** – A central dashboard with navigation and quick access to features.
- **Learn Page** – An integrated NeetCode 250 roadmap with progress tracking based on your LeetCode activity.

### NeetCode 250 Progress Tracking

The NeetCode 250 roadmap is manually curated and integrated into DuoCode. Questions are matched against a user's LeetCode profile to determine their progress.

- **Without a LeetCode session:** Progress detection is limited by the publicly accessible profile data, which generally exposes only the 15 most recent submissions.
- **With a LeetCode session:** Providing a session enables broader profile and submission detection, allowing progress tracking across the roadmap beyond the recent-submissions limitation.

---

## Screenshots

| Home | Profile |
|------|---------|
| <img src="https://github.com/user-attachments/assets/0c39e574-b1c4-458e-8b7d-4ab8d77b1025" width="100%" alt="DuoCode Home Page"> | <img src="https://github.com/user-attachments/assets/40c49d26-12b3-4af4-8604-3cd9cd35f165" width="100%" alt="DuoCode Profile Page"> |

| Compare | NeetCode 250 |
|---------|--------------|
| <img src="https://github.com/user-attachments/assets/e061b182-03bd-4854-b884-02d03765cc9a" width="100%" alt="DuoCode Compare Page"> | <img src="https://github.com/user-attachments/assets/085e6399-0816-4301-9915-4175fad54e7e" width="100%" alt="DuoCode NeetCode 250 Roadmap"> |

---

## Tech Stack

- **Next.js** – React framework powering the application and API routes.
- **React** – Component-based UI development.
- **TypeScript** – Type-safe application development.
- **Tailwind CSS** – Utility-first styling.
- **GraphQL** – Fetches data from the LeetCode API.
- **Framer Motion** – Animations and page transitions.
- **Lucide React** and **React Icons** – Icons and visual elements.

---

## Getting Started

DuoCode is designed to run locally without additional API keys or environment variable configuration.

### Prerequisites

- [Node.js](https://nodejs.org/) and npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/BeastCodZ/duocode.git
   cd duocode
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Acknowledgements

Special thanks to [alfaarghya/alfa-leetcode-api](https://github.com/alfaarghya/alfa-leetcode-api) for providing the foundation for the LeetCode API integration.

---
