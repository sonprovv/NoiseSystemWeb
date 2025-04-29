// Import các function cần thiết từ Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Cấu hình Firebase Web App
const firebaseConfig = {
  apiKey: "AIzaSyCJGgGx-GHT1EB1lgng4ejeOTJIUnEfG4w",
  authDomain: "noisecityweb.firebaseapp.com",
  databaseURL: "https://noisecityweb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "noisecityweb",
  storageBucket: "noisecityweb.firebasestorage.app",
  messagingSenderId: "1098434765098",
  appId: "1:1098434765098:web:55a8df1de2313cae97fe53",
  measurementId: "G-83GQE0WHZD"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Export Realtime Database
export const database = getDatabase(app);
