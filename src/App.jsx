import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import Footer from "./components/layout/Footer/Footer"
import Header from "./components/layout/Header/Header"
import Hero from "./components/sections/Hero/Hero"
import TextParallax from "./components/sections/TextParallax/TextParallax"
import CharacterShowcase from "./components/sections/CharacterShowcase/CharacterShowcase"
import GamingNews from "./components/sections/GamingNews/GamingNews"
import UpcomingEvents from "./components/sections/UpcomingEvents/UpcomingEvents"
import ParallaxVisual from "./components/sections/ParallaxVisual/ParallaxVisual"
import Community from "./components/sections/Community/Community"
import Newsletter from "./components/sections/Newsletter/Newsletter"
import Loader from "./components/common/Loader/Loader";
import SectionDivider from "./components/common/SectionDivider/SectionDivider";
import CustomCursor from "./components/common/CustomCursor/CustomCursor";

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
