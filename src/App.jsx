import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import Footer from "./components/layout/Footer/Footer"
import Header from "./components/layout/Header/Header"
import Loader from "./components/ui/Loader/Loader";
import SmoothScroll from "./components/ui/SmoothScroll/SmoothScroll";
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import NewsPage from './pages/NewsPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);
  return null;
};

function AppContent() {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Define valid routes to determine if we should show header/footer
  const validRoutes = ['/', '/about', '/careers', '/news'];
  const showLayout = validRoutes.includes(pathname);

  return (
    <SmoothScroll>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      {showLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {showLayout && <Footer />}
    </SmoothScroll>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  )
}

export default App
