import React, { useState, useEffect } from 'react';
import './App.css'; // Nếu bạn có file CSS riêng
import Header from './components/Header';
import NoiseLevel from './components/NoiseLevel';
import NoiseChart from './components/NoiseChart';
import AlertHistory from './components/AlertHistory';
import NoiseMap from './components/NoiseMap';

function App() {
  const [threshold, setThreshold] = useState(85);
  const [locations, setLocations] = useState([
    { id: 1, name: "Hồ Hoàn Kiếm", position: [21.028511, 105.854167], currentNoise: 0 }, // Gần trung tâm Hà Nội
    { id: 2, name: "Văn Miếu", position: [21.0285, 105.8355], currentNoise: 0 }, // Cách Hồ Hoàn Kiếm khoảng 2km về phía Tây
  ]);
  const [selectedLocation, setSelectedLocation] = useState(1); // Mặc định chọn "Hồ Hoàn Kiếm"
  const [noiseHistory, setNoiseHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Cập nhật mức độ tiếng ồn cho tất cả các địa điểm
      setLocations((prevLocations) =>
        prevLocations.map((loc) => ({
          ...loc,
          currentNoise: Math.round(Math.random() * 100),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Cập nhật lịch sử tiếng ồn và cảnh báo dựa trên địa điểm được chọn
    const selectedLoc = locations.find((loc) => loc.id === selectedLocation);
    if (selectedLoc) {
      const newData = {
        time: new Date().toLocaleTimeString(),
        value: selectedLoc.currentNoise,
      };
      setNoiseHistory((prev) => [...prev, newData].slice(-20));
      if (selectedLoc.currentNoise > threshold) {
        setAlerts((prev) => [
          ...prev,
          { time: new Date().toLocaleTimeString(), level: selectedLoc.currentNoise },
        ]);
      }
    }
  }, [locations, selectedLocation, threshold]);

  const handleLocationSelect = (locationId) => {
    setSelectedLocation(locationId);
    setNoiseHistory([]); // Xóa lịch sử cũ khi chuyển địa điểm
    setAlerts([]); // Xóa cảnh báo cũ khi chuyển địa điểm
  };

  const selectedLoc = locations.find((loc) => loc.id === selectedLocation);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Header setThreshold={setThreshold} />
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-gray-900 dark:text-white">
        {selectedLoc && (
          <>
            <NoiseLevel noiseLevel={selectedLoc.currentNoise} threshold={threshold} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <NoiseChart noiseHistory={noiseHistory} />
                <AlertHistory alerts={alerts} />
              </div>
              <NoiseMap
                locations={locations}
                selectedLocation={selectedLocation}
                onLocationSelect={handleLocationSelect}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;