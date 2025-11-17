import axios from "axios";

export const eventApi = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5 * 1000,
});
