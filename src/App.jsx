import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import Footer from "./components/layout/Footer/Footer"
import Header from "./components/layout/Header/Header"
import Hero from "./features/hero/Hero"
import TextParallax from "./features/text-parallax/TextParallax"
import CharacterShowcase from "./features/character-showcase/CharacterShowcase"
import GamingNews from "./features/gaming-news/GamingNews"
import UpcomingEvents from "./features/upcoming-events/UpcomingEvents"
import ParallaxVisual from "./features/parallax-visual/ParallaxVisual"
import Community from "./features/community/Community"
import Newsletter from "./features/newsletter/Newsletter"
import Loader from "./components/ui/Loader/Loader";
import SectionDivider from "./components/ui/SectionDivider/SectionDivider";
import CustomCursor from "./components/ui/CustomCursor/CustomCursor";

gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <CustomCursor />
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
      <UpcomingEvents />
      <SectionDivider />
      <Community />
      <Newsletter />
      <Footer />
    </>
  )
}

export default App
