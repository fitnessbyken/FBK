import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBQXsK7lgx9sNDmcLvyZQALSLHQa_gHN7E",
  authDomain: "my-business-portal-58965.firebaseapp.com",
  projectId: "my-business-portal-58965",
  storageBucket: "my-business-portal-58965.firebasestorage.app",
  messagingSenderId: "288106403902",
  appId: "1:288106403902:web:20d69f1d8134a8abf0996f",
  measurementId: "G-ZZPK3X25HK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Form
const form = document.getElementById("signup-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    document.getElementById("message").textContent =
      "Account created! Redirecting...";

    window.location.href = "dashboard.html";
  } catch (error) {
    document.getElementById("message").textContent = error.message;
  }
});
