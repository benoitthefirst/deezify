import axios from "axios";

const url = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/";
const url2 = "https://jsonplaceholder.typicode.com/posts";
const client = axios.create({
  baseURL: url2
});

export default client;