import axios from "axios";

const url = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/";
const client = axios.create({
  baseURL: url
});

export default client;