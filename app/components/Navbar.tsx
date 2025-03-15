'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="flip-box">
              <div className="flip-box-inner">
                <div className="flip-box-front bg-white px-4 py-2 rounded-lg">
                  <span className="text-xl font-bold">{t('companyNameEn')}</span>
                </div>
                <div className="flip-box-back bg-white px-4 py-2 rounded-lg">
                  <span className="text-xl font-bold">{t('companyName')}</span>
                </div>
              </div>
            </div>
            <style jsx>{`
              .flip-box {
                display: inline-block;
                perspective: 1000px;
                min-width: 320px;
                white-space: nowrap;
                height: 40px;
              }
              .flip-box-inner {
                position: relative;
                width: 100%;
                height: 100%;
                text-align: center;
                transition: transform 0.8s;
                transform-style: preserve-3d;
              }
              .flip-box:hover .flip-box-inner {
                transform: rotateY(180deg);
              }
              .flip-box-front, .flip-box-back {
                position: absolute;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                white-space: nowrap;
                padding: 0.5rem 1rem;
              }
              .flip-box-front {
                color: black;
              }
              .flip-box-back {
                transform: rotateY(180deg);
                color: black;
              }
            `}</style>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#services" className="text-gray-800 hover:text-blue-600 transition-colors px-3 py-2 text-sm font-medium">
              {t('ourServices')}
            </Link>
            <Link href="#about" className="text-gray-800 hover:text-blue-600 transition-colors px-3 py-2 text-sm font-medium">
              {t('navTeam')}
            </Link>
            <Link href="#contact" className="text-gray-800 hover:text-blue-600 transition-colors px-3 py-2 text-sm font-medium">
              {t('contactUs')}
            </Link>
            <motion.a
              href="#contact"
              className="inline-block bg-white text-black px-4 py-2 rounded-md text-sm font-medium border border-black hover:bg-gray-100 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('freeConsultation')}
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">打开菜单</span>
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="hidden md:hidden bg-white">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="#services" className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
            {t('ourServices')}
          </Link>
          <Link href="#about" className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
            {t('navTeam')}
          </Link>
          <Link href="#contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
            {t('contactUs')}
          </Link>
          <Link 
            href="#contact" 
            className="block px-3 py-2 text-black bg-white hover:bg-gray-100 rounded-md border border-black"
          >
            {t('freeConsultation')}
          </Link>
        </div>
      </div>
    </motion.nav>
  );
} 