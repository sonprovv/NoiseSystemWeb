import React, { useState, useEffect } from 'react';

const SettingsPanelHeader = ({ setThreshold, onClose }) => {
  const [localThreshold, setLocalThreshold] = useState(85);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    // Cập nhật theme vào localStorage và áp dụng lớp 'dark' cho document
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThresholdChange = (e) => {
    const newThreshold = Number(e.target.value);
    setLocalThreshold(newThreshold);
    setThreshold(newThreshold);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="absolute right-0 mt-2 w-72 rounded-lg shadow-lg border z-10 
      bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Cài đặt
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 
              dark:hover:text-white focus:outline-none transition-colors duration-200"
          >
            ✕
          </button>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Ngưỡng tiếng ồn (dB)
            </label>
            <input
              type="number"
              value={localThreshold}
              onChange={handleThresholdChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 
                focus:ring-opacity-50 transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Chủ đề
            </label>
            <select
              value={theme}
              onChange={handleThemeChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 
                focus:ring-opacity-50 transition-colors duration-200"
            >
              <option value="light">Sáng</option>
              <option value="dark">Tối</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanelHeader;