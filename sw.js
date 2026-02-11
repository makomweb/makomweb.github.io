// Minimal service worker - prevents 404 errors
// This is intentionally blank/minimal to prevent 404 errors while
// not affecting the functionality of the website

self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});
