import React, { useState } from 'react';
import { Bell, Settings, User } from 'lucide-react';
import NotificationsPanel from './NotificationsPanel';
import SettingsPanelHeader from './SettingsPanelHeader';

const Header = ({ setThreshold }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: "Noise level exceeded 85 dB at 10:30 AM", time: "10:30 AM" },
    { id: 2, message: "System check completed", time: "9:15 AM" },
  ];

  // Handler cho Settings
  const handleSettingsClick = () => {
    setShowSettings((prev) => !prev); // Toggle Settings
    setShowNotifications(false);      // Luôn tắt Notifications
  };

  // Handler cho Notifications
  const handleNotificationsClick = () => {
    setShowNotifications((prev) => !prev); // Toggle Notifications
    setShowSettings(false);                // Luôn tắt Settings
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Hệ thống giám sát tiếng ồn
        </h1>
        <div className="flex items-center space-x-4">
          {/* Notifications Icon */}
          <div className="relative">
            <button
              onClick={handleNotificationsClick}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            {showNotifications && (
              <NotificationsPanel
                notifications={notifications}
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>

          {/* Settings Icon */}
          <div className="relative">
            <button
              onClick={handleSettingsClick}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Settings className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            {showSettings && (
              <SettingsPanelHeader
                setThreshold={setThreshold}
                onClose={() => setShowSettings(false)}
              />
            )}
          </div>

          {/* User Icon */}
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;