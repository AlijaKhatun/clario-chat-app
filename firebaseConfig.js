import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA8HsvRFhz_n-3PGanfPwZgYdvF7eAZ5Po',
  authDomain: 'clario-86c02.firebaseapp.com',
  projectId: 'clario-86c02',
  storageBucket: 'clario-86c02.firebasestorage.app',
  messagingSenderId: '695345876123',
  appId: '1:695345876123:web:69a80e8567eab426d9ca3e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig