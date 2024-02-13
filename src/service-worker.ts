/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { request } from "http";
import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import {PrecacheController} from 'workbox-precaching';

const precacheController = new PrecacheController();
declare const self: ServiceWorkerGlobalScope;


// Establish a cache name
const cacheName = "cach_v1";
precacheController.addToCacheList([
  { url: "/src/hook/UsePhoto.tsx", revision: null },
  { url: "/src/component/Banner.tsx", revision: null },
  { url: "/src/component/FooterPg.tsx", revision: null },
  { url: "/src/component/HeaderPg.tsx", revision: null },
  { url: "/src/component/Main.tsx", revision: null },
  { url: "/src/component/SampleCard.tsx", revision: null },
  { url: "/public/index.html", revision: null },
  { url: "/public/favicon.ico", revision: null },
  { url: "/public/logo192.png", revision: null },
  { url: "/public/logo512.png", revision: null },
]);

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);


self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// self.addEventListener("install", (event) => {
//   // Precache assets on install
//   event.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       return cache.addAll(precacheController);
//     })
//   );
// });

self.addEventListener("fetch", (event) => {
  // Open the cache
  event.respondWith(
    caches.open(cacheName).then((cache) => {
      // Go to the cache first
      return cache.match(event.request.url).then((cachedResponse) => {
        // Return a cached response if we have one
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, hit the network
        return fetch(event.request).then((fetchedResponse) => {
          // Add the network response to the cache for later visits
          cache.put(event.request, fetchedResponse.clone());

          // Return the network response
          return fetchedResponse;
        });
      });
    })
  );
});

// Any other custom service worker logic can go here.
