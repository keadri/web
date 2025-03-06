'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-sm border-b border-gray-100' : 'bg-transparent'}`}>
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
            <Link href="#services" className="text-gray-700 hover:text-black transition-colors">
              {t('ourServices')}
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-black transition-colors">
              {t('navTeam')}
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-black transition-colors">
              {t('contactUs')}
            </Link>
            <motion.a
              href="#consultation"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('freeConsultation')}
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">打开菜单</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white`}>
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
          <Link href="#consultation" className="block px-3 py-2 text-white bg-black hover:bg-gray-800 rounded-md">
            {t('freeConsultation')}
          </Link>
        </div>
      </div>
    </nav>
  );
} 