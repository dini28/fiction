import { useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import Footer from "./components/layout/Footer/Footer"
import Header from "./components/layout/Header/Header"
import Hero from "./features/hero/Hero"
import TextParallax from "./features/text-parallax/TextParallax"
import CharacterShowcase from "./features/character-showcase/CharacterShowcase"
import GamingNews from "./features/gaming-news/GamingNews"
import ParallaxVisual from "./features/parallax-visual/ParallaxVisual"
import Community from "./features/community/Community"
import Newsletter from "./features/newsletter/Newsletter"
import Loader from "./components/ui/Loader/Loader";
import SectionDivider from "./components/ui/SectionDivider/SectionDivider";
import SmoothScroll from "./components/ui/SmoothScroll/SmoothScroll";

import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SmoothScroll>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <Header />
      <Hero />
      <SectionDivider />
      <TextParallax />
      <CharacterShowcase />
      <SectionDivider variant="glow" />
      <GamingNews />
      <SectionDivider />
      <ParallaxVisual />
      <SectionDivider variant="dots" />
      <SectionDivider />
      <Community />
      <Newsletter />
      <Footer />
    </SmoothScroll>
  )
}

export default App
