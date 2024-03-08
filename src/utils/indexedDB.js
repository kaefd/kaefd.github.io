const request = indexedDB.open('session', 1)

// inisialisasi ketika versi diperbarui
request.onupgradeneeded = (event) => {
    const db = event.target.result;
}

// run db
request.onsuccess = (event) => {
    const db = event.target.result
}

// error handle
request.onerror = (event) => {
    console.log('indexedDB error connection');
}