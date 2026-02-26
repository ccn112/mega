importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "REPLACE_WITH_ACTUAL_API_KEY",
  authDomain: "REPLACE_WITH_ACTUAL_AUTH_DOMAIN",
  projectId: "REPLACE_WITH_ACTUAL_PROJECT_ID",
  storageBucket: "REPLACE_WITH_ACTUAL_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_WITH_ACTUAL_MESSAGING_SENDER_ID",
  appId: "REPLACE_WITH_ACTUAL_APP_ID"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://tanadaithanh.vn/wp-content/uploads/2024/10/cropped-icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
