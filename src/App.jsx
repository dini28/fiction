import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);

// Layout
import Footer from "./components/layout/Footer/Footer"
import Header from "./components/layout/Header/Header"

// Ui
import Loader from "./components/ui/Loader/Loader";
import SmoothScroll from "./components/ui/SmoothScroll/SmoothScroll";
import GlobalNoise from "./components/ui/GlobalNoise/GlobalNoise";
import CustomCursor from "./components/ui/CustomCursor/CustomCursor";

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ArmoryPage = lazy(() => import('./pages/ArmoryPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

import { CartProvider } from './context/CartContext';
import CartDrawer from './features/cart/CartDrawer';
import CheckoutOverlay from './features/checkout/CheckoutOverlay';

// Helper
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

  // valid routes to determine wheb we show header/footer
  const validRoutes = ['/', '/about', '/careers', '/news', '/armory'];
  const showLayout = validRoutes.includes(pathname);

  return (
    <SmoothScroll>
      <GlobalNoise />
      <CustomCursor />

      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      {showLayout && <Header />}
      <Suspense fallback={<div style={{ height: '100vh', background: '#0a0a0f' }}></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/armory" element={<ArmoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {showLayout && <Footer />}
    </SmoothScroll>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <CartDrawer />
        <CheckoutOverlay />
        <AppContent />
      </CartProvider>
    </Router>
  )
}

export default App
