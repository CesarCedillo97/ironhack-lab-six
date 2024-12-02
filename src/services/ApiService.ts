import axios from "axios";

// Basic axios instance, expecting students to add interceptors
const api = axios.create({
  baseURL: "https://example.com/api", // Placeholder URL
});

export default api;
