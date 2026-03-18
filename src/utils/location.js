export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

export function getGoogleMapsLink(lat, lng) {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

export function buildSOSMessage(message, lat, lng) {
  const mapsLink = getGoogleMapsLink(lat, lng);
  return `${message}${mapsLink}`;
}

export function buildSMSUri(phones, body) {
  const numbers = phones.join(',');
  const encoded = encodeURIComponent(body);
  return `sms:${numbers}?body=${encoded}`;
}

export function triggerVibration(pattern = [200, 100, 200, 100, 500]) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

export function stopVibration() {
  if (navigator.vibrate) {
    navigator.vibrate(0);
  }
}
