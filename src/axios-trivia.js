import axios from "axios";

const instance = axios.create({
  baseURL: "https://triviaboard-reactjs-default-rtdb.firebaseio.com/",
});

export default instance;