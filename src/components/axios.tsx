import axios from "axios";

const instance = axios.create({
  // Use local development URL since your emulator is running
  baseURL: "http://localhost:5001/clone-6e65f/us-central1/api", // Local API URL
  // baseURL: "https://us-central1-clone-6e65f.cloudfunctions.net/api", // Production API URL (use when deployed)
});

export default instance;
