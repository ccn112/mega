importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// These values should be replaced with your actual config.
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
    icon: '/logo-tan-a-dai-thanh.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Offline support: Cache assets
const CACHE_NAME = 'tad-mega-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://tanadaithanh.vn/wp-content/uploads/2024/10/cropped-icon-192x192.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          (response) => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      }).catch(() => {
        // Fallback for offline if fetch fails
        return caches.match('/');
      })
  );
});
