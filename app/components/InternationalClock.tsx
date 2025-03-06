'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const cities = [
  { name: 'LA', timezone: 'America/Los_Angeles', label: 'PST' },
  { name: 'TOR', timezone: 'America/Toronto', label: 'EST' },
  { name: 'LON', timezone: 'Europe/London', label: 'GMT' },
  { name: 'BJ', timezone: 'Asia/Shanghai', label: 'CST' },
  { name: 'HK', timezone: 'Asia/Hong_Kong', label: 'HKT' }
];

export default function InternationalClock() {
  const [times, setTimes] = useState<string[]>(Array(cities.length).fill(''));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTimes = () => {
      const newTimes = cities.map(city => {
        return new Date().toLocaleTimeString('zh-CN', {
          timeZone: city.timezone,
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm py-2 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {cities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center space-x-2 min-w-[140px]"
            >
              <motion.span
                className="text-sm font-medium text-gray-500"
                whileHover={{ scale: 1.1 }}
              >
                {city.name}
              </motion.span>
              <motion.span
                className="font-mono text-base font-bold text-gray-800"
                whileHover={{ scale: 1.1 }}
                animate={{
                  opacity: [1, 0.8, 1],
                  transition: { duration: 2, repeat: Infinity }
                }}
              >
                {times[index]}
              </motion.span>
              <motion.span
                className="text-xs text-gray-400"
                whileHover={{ scale: 1.1 }}
              >
                {city.label}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
} 