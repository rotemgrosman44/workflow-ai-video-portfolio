import React, { useEffect } from 'react';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ValueSection from './components/ValueSection';
import PortfolioGrid from './components/PortfolioGrid';
import ProcessStrip from './components/ProcessStrip';
import CTASection from './components/CTASection';
import SocialRow from './components/SocialRow';
import Navbar from './components/Navbar';
import HalftoneBackground from './components/ui/HalftoneBackground';

const App: React.FC = () => {
  // Global Smooth Scroll Handler for all anchor links
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      // Only handle internal anchor links
      if (!target) return;
      
      const href = target.getAttribute('href');
      if (!href) return;

      // Handle "Back to Top" links (href="#")
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Handle Section Links (href="#sectionId")
      if (href.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
          // Update URL without jumping
          window.history.pushState(null, '', href);
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-workflow-black text-gray-100 selection:bg-white selection:text-black">
      {/* Global Background Layer (Art + Halftone) */}
      <HalftoneBackground />

      {/* Global Grain/Noise Texture fixed overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      {/* Navbar */}
      <Navbar />

      {/* Content - Reduced Gap */}
      <div className="relative z-10 flex flex-col gap-4 md:gap-16">
        <Hero />
        <AboutSection />
        <ValueSection />
        <PortfolioGrid />
        <ProcessStrip />
        <CTASection />
        {/* TrustedBy moved inside SocialRow (Footer) */}
        <SocialRow />
      </div>
    </main>
  );
};

export default App;