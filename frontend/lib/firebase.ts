// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDaGgcCl4N1-17nQDfMsL9mw56_PgkHh9M",
//   authDomain: "m-kim-portfolio.firebaseapp.com",
//   projectId: "m-kim-portfolio",
//   storageBucket: "m-kim-portfolio.appspot.com",
//   messagingSenderId: "7669124334",
//   appId: "1:7669124334:web:d1bc797f23c87a8a3877ff"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Get a reference to the storage service
// const storage = getStorage(app);

// export { app, storage };



import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDaGgcCl4N1-17nQDfMsL9mw56_PgkHh9M",
    authDomain: "m-kim-portfolio.firebaseapp.com",
    projectId: "m-kim-portfolio",
    storageBucket: "m-kim-portfolio.appspot.com",
    messagingSenderId: "7669124334",
    appId: "1:7669124334:web:d1bc797f23c87a8a3877ff"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = getStorage(app);

export { app, storage };

///////////////////////
// FIREBASE FUNCTIONS
// Import necessary Firebase functions for storage operations
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

// Utility function to generate a random alphanumeric ID of a given length
function generateRandomId(length:number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  
  // Loop to create a string of random characters
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result;
}

// Function to upload a file to Firebase Storage
export const uploadFileToFirebase = (file:File, path:string) => {
  // Generate a unique filename by appending a random ID to the original file name
  const randomId = generateRandomId(10);
  const uniqueFilename = `${randomId}_${file.name}`;

  return new Promise((resolve, reject) => {
    // Create a reference to the storage location
    const storageRef = ref(storage, `${path}/${uniqueFilename}`);

    // Start the file upload
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Monitor the upload process
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Can be used to track upload progress
      },
      (error) => {
        // Reject the promise if an error occurs
        reject(error);
      },
      () => {
        // On successful upload, get the download URL of the uploaded file
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Resolve the promise with the file's download URL
          resolve(downloadURL);
        });
      }
    );
  });
};

export const uploadMultipleFilesToFirebase = async (
    files: File[], // Accepts an array of files
    path: string
  ): Promise<string[]> => {
    try {
      const uploadPromises = files.map(async (file) => {
        const randomId = generateRandomId(10);
        const uniqueFilename = `${randomId}_${file.name}`;
        const storageRef = ref(storage, `${path}/${uniqueFilename}`);
        const uploadTask = await uploadBytesResumable(storageRef, file);
        return getDownloadURL(uploadTask.ref);
      });
  
      // Wait for all uploads to complete
      const downloadURLs = await Promise.all(uploadPromises);
      return downloadURLs;
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
};
  

// Function to extract the file path from the download URL
export const getFilePathFromUrl = (url:string) => {
  const baseUrl = "https://firebasestorage.googleapis.com/v0/b/m-kim-portfolio.appspot.com/o/";
  const startIndex = baseUrl.length;
  const endIndex = url.indexOf("?alt=media");
  
  // Decode the URL to get the file path
  const filePath = decodeURIComponent(url.substring(startIndex, endIndex));
  return filePath;
};

// Function to delete a file from Firebase Storage using its download URL
export const deleteFileFromFirebase = async (url:string) => {
  // Get the file path from the URL
  const filePath = getFilePathFromUrl(url);
  
  // Create a reference to the file in storage
  const fileRef = ref(storage, filePath);
  
  // Delete the file from Firebase Storage
  await deleteObject(fileRef);
};