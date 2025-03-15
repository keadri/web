'use client';

import Navbar from './components/Navbar';
import AnimatedText from './components/AnimatedText';
import { motion } from 'framer-motion';
import InternationalClock from './components/InternationalClock';
import { useState, useEffect } from 'react';
import { useLanguage } from './contexts/LanguageContext';
import dynamic from 'next/dynamic';
import ServiceIcon from './components/ServiceIcon';

const Earth3D = dynamic(() => import('./components/Earth3D'), { ssr: false });

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [isOffersVisible, setIsOffersVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
  const itemsPerPage = 6;
  const totalPages = Math.ceil(27 / itemsPerPage);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getCurrentPageItems = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return Array.from({ length: 27 }, (_, i) => i + 1).slice(start, end);
  };

  const handleImageLoad = (num: number) => {
    setLoadedImages(prev => ({ ...prev, [num]: true }));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <main className="min-h-screen">
      <Navbar key={language} />
      <div className="h-16"></div>
      
      <InternationalClock />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Earth Background */}
        <div className="absolute inset-0 z-0 bg-black">
          <Earth3D />
        </div>

        {/* Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-8">
          <div className="flex flex-col items-start space-y-8">
            <h1 className="text-4xl font-bold text-white mb-4">WoM Offer</h1>
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => {
                  setLanguage('zh');
                  window.location.search = '?lang=zh';
                }}
                className={`px-3 py-1 rounded ${language === 'zh' ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
              >
                中文
              </button>
              <button
                onClick={() => {
                  setLanguage('en');
                  window.location.search = '?lang=en';
                }}
                className={`px-3 py-1 rounded ${language === 'en' ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
              >
                English
              </button>
            </div>
            <motion.p
              key={language}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed tracking-wide max-w-3xl"
            >
              {language === 'zh' ? (
                <>
                  跨越山海，连接梦想。我们为每一个追梦者打造成长的舞台。从上海到硅谷，我们与你一起，将大胆的梦想变为全球现实。
                </>
              ) : (
                t('slogan')
              )}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full sm:w-auto"
            >
              <a
                href="#contact"
                className="w-full sm:w-auto inline-block bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-md text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 text-center"
              >
                {t('freeConsultation')}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-start">
            <AnimatedText
              text={t('ourServices')}
              className="text-5xl font-bold text-left mb-4 text-black whitespace-normal"
            />
            <div className="w-full h-px bg-black mb-16 opacity-20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t('services').map((service: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative bg-black text-white p-8 rounded-2xl transition-all duration-300 transform-gpu"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start space-x-4">
                  <ServiceIcon name={service.icon} className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">{service.title}</h3>
                    <p className="text-gray-300">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.05),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-start">
            <AnimatedText
              text={t('navTeam')}
              className="text-5xl font-bold text-left mb-4 text-black whitespace-normal"
            />
            <div className="w-full h-px bg-black mb-16 opacity-20" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-black text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
                }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
                  <ServiceIcon name="graduation-cap" className="w-6 h-6 mr-3" />
                  {t('professionalBackground')}
                </h3>
                <ul className="space-y-4">
                  {t('professionalItems').map((item: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start group"
                    >
                      <span className="text-blue-400 mr-3">•</span>
                      <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-black text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
                }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
                  <ServiceIcon name="passport" className="w-6 h-6 mr-3" />
                  {t('identityAdvantage')}
                </h3>
                <ul className="space-y-4">
                  {t('identityItems').map((item: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start group"
                    >
                      <span className="text-blue-400 mr-3">•</span>
                      <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 bg-black text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
              }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
                <ServiceIcon name="document-check" className="w-6 h-6 mr-3" />
                {t('ourCommitment')}
              </h3>
              <ul className="space-y-4">
                {t('commitmentItems').map((item: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start group"
                  >
                    <span className="text-blue-400 mr-3">•</span>
                    <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Success Cases Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <AnimatedText
              text={t('successCases')}
              className="text-4xl font-bold text-center mb-8 whitespace-normal px-4 max-w-3xl"
            />
            <button
              onClick={() => setIsOffersVisible(!isOffersVisible)}
              className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-md flex items-center space-x-2"
            >
              <span>{isOffersVisible ? t('hideOffersButton') : t('viewOffersButton')}</span>
              <svg 
                className={`w-5 h-5 transform transition-transform duration-300 ${isOffersVisible ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Offers Display Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={false}
              animate={{
                height: isOffersVisible ? 'auto' : 0,
                opacity: isOffersVisible ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-6xl overflow-hidden"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getCurrentPageItems().map((num) => (
                    <motion.div
                      key={num}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-white hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={`/offers/offer${num}.jpg`}
                        alt={`录取通知书 ${num}`}
                        className={`w-full h-full object-contain transition-all duration-300 ${loadedImages[num] ? 'opacity-100' : 'opacity-0'}`}
                        loading="lazy"
                        onLoad={() => handleImageLoad(num)}
                      />
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-center items-center space-x-4">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded transition-colors ${
                      currentPage === 1 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-black text-white hover:bg-gray-900'
                    }`}
                  >
                    上一页
                  </button>
                  <span className="text-gray-600">
                    {currentPage} / {totalPages}
                  </span>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded transition-colors ${
                      currentPage === totalPages 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-black text-white hover:bg-gray-900'
                    }`}
                  >
                    下一页
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText
            text={t('contactUs')}
            className="text-5xl font-bold text-center mb-16 text-white whitespace-normal"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white">{t('contactInfo')}</h3>
                <div className="space-y-4 sm:space-y-6">
                  <motion.div 
                    className="flex items-start space-x-4"
                    whileHover={{ x: 10 }}
                  >
                    <div>
                      <p className="font-medium text-white">{t('email')}</p>
                      <a href="mailto:womoffer@gmail.com" className="text-gray-300 hover:text-white transition-colors">womoffer@gmail.com</a>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-start space-x-4"
                    whileHover={{ x: 10 }}
                  >
                    <div>
                      <p className="font-medium text-white">{t('address')}</p>
                      <p className="text-gray-300">{t('addressText')}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="grid grid-cols-2 gap-8">
                  {/* WeChat */}
                  <motion.div 
                    className="space-y-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.5,13.5A1.5,1.5 0 0,1 7,12A1.5,1.5 0 0,1 8.5,10.5A1.5,1.5 0 0,1 10,12A1.5,1.5 0 0,1 8.5,13.5M13.5,13.5A1.5,1.5 0 0,1 12,12A1.5,1.5 0 0,1 13.5,10.5A1.5,1.5 0 0,1 15,12A1.5,1.5 0 0,1 13.5,13.5M19,12C19,15.86 15.86,19 12,19C11.62,19 11.24,18.96 10.87,18.9C10.14,19.28 9.35,19.5 8.5,19.5C6.57,19.5 5,17.93 5,16C5,14.07 6.57,12.5 8.5,12.5C8.83,12.5 9.15,12.56 9.45,12.67C9.16,11.82 9,10.93 9,10C9,6.14 12.14,3 16,3C19.86,3 23,6.14 23,10C23,10.93 22.84,11.82 22.55,12.67C22.85,12.56 23.17,12.5 23.5,12.5C25.43,12.5 27,14.07 27,16C27,17.93 25.43,19.5 23.5,19.5C22.65,19.5 21.86,19.28 21.13,18.9C20.76,18.96 20.38,19 20,19C16.14,19 13,15.86 13,12" />
                      </svg>
                      <h3 className="text-xl font-semibold text-white">{t('wechat')}</h3>
                    </div>
                    <div className="space-y-4">
                      <motion.p 
                        className="text-gray-300"
                        whileHover={{ x: 10, color: '#fff' }}
                      >
                        WoMoffer_Tiago
                      </motion.p>
                      <motion.p 
                        className="text-gray-300"
                        whileHover={{ x: 10, color: '#fff' }}
                      >
                        WoMoYu_002
                      </motion.p>
                    </div>
                  </motion.div>

                  {/* Xiaohongshu */}
                  <motion.div 
                    className="space-y-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,7H13V14H11V7M11,15H13V17H11V15Z" />
                      </svg>
                      <h3 className="text-xl font-semibold text-white">{t('xiaohongshu')}</h3>
                    </div>
                    <div className="space-y-4">
                      <motion.p 
                        className="text-gray-300"
                        whileHover={{ x: 10, color: '#fff' }}
                      >
                        WoMOffer
                      </motion.p>
                      <motion.p 
                        className="text-gray-300"
                        whileHover={{ x: 10, color: '#fff' }}
                      >
                        WoMOffer_Tiago
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-white/60 text-center">
        <p>2024 上海旺米优途科技教育有限公司 WoM Offer. 保留所有权利。</p>
      </footer>
    </main>
  );
}
