const publicVapidKey = 'BE_iBLWWIvWiTz76E-C8Fh0LkPYj_GMPZaMzN8SwiDO29KF9wJVSPCzHaefnQy3WZpVbxLwazknd4eg5_HcMYWk';

//CHeck
if('serviceWorker'in navigator) {
    send().catch(err => console.error(err));
}

// Register sw register push send push
async function send() {
    console.log('registering service worker..')
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('Service Worker Registered...');

    console.log('reg push');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('push regi');

    //send push notification
    console.log('sending push..');
    await fetch('/subscribe', {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('push sent');
}


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
