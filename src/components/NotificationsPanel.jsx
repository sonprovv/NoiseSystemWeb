import React from 'react';

const NotificationsPanel = ({ notifications, onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 transition-colors duration-200">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Thông báo
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none transition-colors duration-200"
          >
            ✕
          </button>
        </div>
        <div className="mt-2 max-h-48 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {notification.time}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Không có thông báo
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;