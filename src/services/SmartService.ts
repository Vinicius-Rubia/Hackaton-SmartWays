import axios from "axios";

const url = import.meta.env.VITE_API_BASE_URL;

async function get<T>(path: string): Promise<T> {
  try {
    const resp = await axios.get<T>(`${url + path}`);
    return resp.data;
  } catch (e: any) {
    return e;
  }
}

async function post<T>(path: string, rq: any): Promise<T> {
  try {
    const resp = await axios.post<T>(`${url + path}`, rq);
    return resp.data;
  } catch (e: any) {
    return e;
  }
}

export const SmartService = {
  get,
  post,
};
