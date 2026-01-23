# FICTION
### Working on the issue of page reload error

### Immersive Gaming Experience Platform

> A high-fidelity, visually stunning web application designed to showcase the future of gaming narrative and character design.

## 📖 Overview

**Fiction** is a cutting-edge frontend project built to deliver a premium user experience for gaming content. It leverages modern web technologies to create fluid animations, interactive character showcases, and a responsive news feed. The design philosophy centers on "dark aesthetics" with vibrant neon accents, typical of high-end sci-fi gaming interfaces.

## ✨ Key Features

- **🛡️ Fiction Protocol (About)**
  - **Philosophy Cards**: Interactive 3D flipping cards showcasing the studio's core values: Immersion Absolutism, Systemic Agency, and Narrative Architecture.
  - **Animated Stats**: (Replaced by Philosophy section for deeper narrative impact).

- **🎮 Armory & Gear**
  - **Product Showcase**: Detailed gear layout with "morphing" SVG ease-of-access animations.
  - **Filtering**: Category-based filtering for apparel, hardware, and collectibles.

- **🛡️ Cinematic Character Showcase**
  - **Horizontal/Vertical**: Adaptive scrolling mechanism driven by GSAP ScrollTrigger.
  - **Visual Effects**: Glitch text and noise overlays for a futuristic feel.

- **📰 Dynamic News & Careers**
  - **News Feed**: Masonry-grid layout for updates.
  - **Careers Portal**: Role-based modal system with "Selection Process" step indicators.

- **🎨 Advanced Animations**
  - Powered by **GSAP (GreenSock Animation Platform)**.
  - `ScrollReveal` wrapper for consistent section entry animations.
  - Custom "Text Parallax" and "Global Noise" effects.

## 🛠️ Tech Stack

- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
- ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
- ![FontAwesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)

## 📂 Project Structure

The project follows a **Feature-based Architecture** for scalability and maintainability:

```
src/
├── features/            # Feature-specific logic (Components, Data, CSS)
│   ├── about/           # "Fiction Protocol" & Team sections
│   ├── armory/          # Product grid and data
│   ├── careers/         # Job listings and application flow
│   ├── home/            # Hero, Newsletter, Parallax sections
│   ├── news/            # News feed and article logic
│   └── not-found/       # 404 Error interface
├── pages/               # Lightweight wrappers for routing
│   ├── Home.jsx
│   ├── AboutPage.jsx
│   └── ...
├── components/          # Shared UI elements (PageHero, Buttons, GlobalNoise)
├── data/                # Shared data (Characters)
└── App.jsx              # Main routing and layout
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fiction.git
   cd fiction
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
