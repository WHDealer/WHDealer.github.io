importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
const firebaseConfig = {
    apiKey: "AIzaSyA1MVOuDazXDae422bsawFoZ311H0QDoUM",
    authDomain: "herzbegleiter-5ffbc.firebaseapp.com",
    projectId: "herzbegleiter-5ffbc",
    storageBucket: "herzbegleiter-5ffbc.appspot.com",
    messagingSenderId: "576192852555",
    appId: "1:576192852555:web:648289aad705e20fb293ce",
    measurementId: "G-4QFVWT2Q7X"
  };
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
     const promiseChain = clients
          .matchAll({
               type: "window",
               includeUncontrolled: true,
          })
          .then((windowClients) => {
               for (let i = 0; i < windowClients.length; i++) {
                    const windowClient = windowClients[i];
                    windowClient.postMessage(payload);
               }
          })
          .then(() => {
               return registration.showNotification("my notification title");
          });
     return promiseChain;
});
self.addEventListener("notificationclick", function(event) {
     console.log(event);
});