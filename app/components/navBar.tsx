import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate } from "react-router";

const LandingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-button')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'pt', name: 'Português' },
    { code: 'it', name: 'Italiano' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' }
  ];

  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-red-600 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter cursor-pointer hover:text-red-500 transition-colors"
                style={{ fontFamily: '"Bebas Neue", cursive' }}>
                STREAMFLIX
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">

              <Button onClick={() => navigate('/browse')} className='rounded px-4'><Globe className='w-4 h-4' />Browse</Button>
              {/* Language Selector */}
              {/* 
              <div className="relative">
                <button
                  onClick={() => setLanguageDropdown(!languageDropdown)}
                  className="flex items-center gap-2 text-sm border border-white/30 px-3 lg:px-4 py-2 rounded hover:border-white/60 transition-all hover:bg-white/5"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden lg:inline">
                    {languages.find(lang => lang.code === selectedLanguage)?.name}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${languageDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Language Dropdown 
              {languageDropdown && (
                <div className="absolute top-full mt-2 right-0 bg-black/95 backdrop-blur-md border border-white/20 rounded-md overflow-hidden shadow-2xl min-w-[160px] animate-slide-down">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setLanguageDropdown(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-white/10 transition-colors ${selectedLanguage === lang.code ? 'bg-white/5 text-red-500' : 'text-white'
                        }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
              */}
              {/* Sign In Button */}
              <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 lg:px-6 py-2 rounded transition-all hover:scale-105">
                Sign In
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded hover:bg-white/10 transition-colors menu-button"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden mobile-menu overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="bg-black/95 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              {/* Language Selector Mobile */}
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
                  Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-white/5 border border-white/30 text-white px-4 py-3 rounded focus:outline-none focus:border-red-500 transition-colors"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-black">
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sign In Button Mobile */}
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition-all">
                Sign In
              </Button>

              {/* Additional Links */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  Help Center
                </a>
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav >

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default LandingNavbar;
