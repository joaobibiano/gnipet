import Axios from "axios";
export const BASE_URL = "https://www.joaobibiano.com.br/api/";

export const Api = Axios.create({
  baseURL: BASE_URL,
});
