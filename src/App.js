import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import './App.css';
import Header from './components/Header';
import NoiseLevel from './components/NoiseLevel';
import NoiseChart from './components/NoiseChart';
import AlertHistory from './components/AlertHistory';
import NoiseMap from './components/NoiseMap';
import { database } from './firebase';
import { ref, push, get} from 'firebase/database';

function App() {
  const [threshold, setThreshold] = useState(85);
  const [locations, setLocations] = useState([
    { id: 1, name: 'Hồ Hoàn Kiếm', position: [21.028511, 105.854167], currentNoise: 0 },
    { id: 2, name: 'Văn Miếu', position: [21.0285, 105.8355], currentNoise: 0 },
  ]);
  const [selectedLocation, setSelectedLocation] = useState(1);
  const [noiseHistory, setNoiseHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // MQTT - Nhận dữ liệu từ ESP32 (Hồ Hoàn Kiếm)
  useEffect(() => {
    const client = mqtt.connect('wss://09e948bd2b80418f8fa4c4f9765322bf.s1.eu.hivemq.cloud:8884/mqtt', {
      username: 'admin',
      password: 'Esp32_admin',
      protocol: 'wss',
    });

    client.on('connect', () => {
      console.log('Connected to MQTT Broker');
      client.subscribe('esp32/noise_level/#', (err) => {
        if (err) console.error('Subscribe error:', err);
      });
    });

    client.on('message', (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        const noiseValue = parseFloat(data.noise);
        const locationId = 1; // Hồ Hoàn Kiếm

        if (!isNaN(noiseValue)) {
          // Cập nhật
          setLocations((prev) =>
            prev.map((loc) => (loc.id === locationId ? { ...loc, currentNoise: noiseValue } : loc))
          );

          const timestamp = new Date().toISOString();
          push(ref(database, `locations/${locationId}/history`), {
            time: timestamp,
            noise: noiseValue,
          });
        }
      } catch (err) {
        console.error('Lỗi phân tích dữ liệu MQTT:', err);
      }
    });

    client.on('error', (err) => {
      console.error('Connection error: ', err);
      client.end(true);
    });

    return () => {
      if (client.connected) {
        client.end();
      }
    };
  }, []);

  // OpenSenseMap - Văn Miếu
  useEffect(() => {
    const fetchOpenSenseNoise = async () => {
      try {
        const response = await fetch('https://api.opensensemap.org/boxes/636a611c9def3a001ceb2392');
        const data = await response.json();

        const noiseSensor = data.sensors.find(sensor => sensor._id === '636a611c9def3a001ceb2394');
        const noiseValue = parseFloat(noiseSensor.lastMeasurement.value);

        if (!isNaN(noiseValue)) {
          const locationId = 2; // Văn Miếu

          setLocations((prev) =>
            prev.map((loc) => (loc.id === locationId ? { ...loc, currentNoise: noiseValue } : loc))
          );

          const timestamp = new Date().toISOString();
          push(ref(database, `locations/${locationId}/history`), {
            time: timestamp,
            noise: noiseValue,
          });
        }
      } catch (error) {
        console.error('Lỗi khi gọi API OpenSenseMap:', error);
      }
    };

    const interval = setInterval(fetchOpenSenseNoise, 30000);
    fetchOpenSenseNoise();

    return () => clearInterval(interval);
  }, []);

  // Cập nhật noiseHistory + ghi alert nếu vượt ngưỡng
  useEffect(() => {
    const selectedLoc = locations.find((loc) => loc.id === selectedLocation);
    if (selectedLoc) {
      const newData = {
        time: new Date().toLocaleTimeString(),
        value: selectedLoc.currentNoise,
      };
      setNoiseHistory((prev) => [...prev, newData].slice(-20));

      if (selectedLoc.currentNoise > threshold) {
        const alert = {
          time: new Date().toISOString(),
          level: selectedLoc.currentNoise,
        };

        setAlerts((prev) => [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            level: selectedLoc.currentNoise,
          },
        ]);

        push(ref(database, `locations/${selectedLocation}/alerts`), alert);
      }
    }
  }, [locations, selectedLocation, threshold]);

  // Tải lại lịch sử cảnh báo khi đổi địa điểm
  useEffect(() => {
    const loadAlertsFromFirebase = async () => {
      const alertsRef = ref(database, `locations/${selectedLocation}/alerts`);
      try {
        const snapshot = await get(alertsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const alertArray = Object.values(data).map((entry) => ({
            time: new Date(entry.time).toLocaleTimeString(),
            level: entry.level,
          }));
          setAlerts(alertArray.slice(-20));
        } else {
          setAlerts([]);
        }
      } catch (err) {
        console.error('Lỗi khi tải cảnh báo từ Firebase:', err);
      }
    };

    loadAlertsFromFirebase();
  }, [selectedLocation]);

  const handleLocationSelect = (locationId) => {
    setSelectedLocation(locationId);
    setNoiseHistory([]);
    setAlerts([]);
  };

  const selectedLoc = locations.find((loc) => loc.id === selectedLocation);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Header setThreshold={setThreshold} alerts={alerts} />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-gray-900 dark:text-white">
        {selectedLoc && (
          <>
            <NoiseLevel noiseLevel={selectedLoc.currentNoise} threshold={threshold} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NoiseMap
                locations={locations}
                selectedLocation={selectedLocation}
                onLocationSelect={handleLocationSelect}
                threshold={threshold}
              />
              <div className="space-y-6">
                <NoiseChart noiseHistory={noiseHistory} />
                <AlertHistory alerts={alerts} />
              </div>
              
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
