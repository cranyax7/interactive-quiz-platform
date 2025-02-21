// src/db/indexedDB.js
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('QuizDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('attempts')) {
        db.createObjectStore('attempts', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};
  
export const saveAttempt = async (attemptData) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['attempts'], 'readwrite');
    const store = transaction.objectStore('attempts');
    const request = store.add({
      ...attemptData,
      timestamp: new Date().toISOString()
    });

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getAttempts = async () => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['attempts'], 'readonly');
    const store = transaction.objectStore('attempts');
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};