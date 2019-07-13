
console.log('service worker loaded..')

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push Received..');
    self.registration.showNotification(data.title,{
        body: "This is a reminder to take your birth control pills!!",
        icon: "https://user-images.githubusercontent.com/47131619/60829873-9555fa80-a17b-11e9-807e-48d9ad52e46a.png"
    });

});