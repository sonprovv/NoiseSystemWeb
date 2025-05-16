// Import các function cần thiết từ Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Cấu hình Firebase Web App
const firebaseConfig = {
  apiKey: "AIzaSyDVdC9Cgu6equODw_gBLm6uqzvdEP2jdpo",
  authDomain: "webnoise-e4b87.firebaseapp.com",
  databaseURL: "https://webnoise-e4b87-default-rtdb.firebaseio.com/",
  projectId: "webnoise-e4b87",
  storageBucket: "webnoise-e4b87.firebasestorage.app",
  messagingSenderId: "1027222583981",
  appId: "1:1027222583981:web:0019e022a851c3c6fde424"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Export Realtime Database
export const database = getDatabase(app);
