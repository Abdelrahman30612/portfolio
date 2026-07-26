const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
const fs = require('fs');

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  const saPath = path.join(__dirname, 'serviceAccount.json');
  if (fs.existsSync(saPath)) {
    serviceAccount = require(saPath);
  } else {
    console.error('❌ No Firebase credentials found');
    process.exit(1);
  }
}

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = { db };
