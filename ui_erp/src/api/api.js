import axios from "axios";

//export const BASE_URL = "http://localhost:8000/api/";
//export const BASE_URL_IMG = "http://localhost:8000/";

export const BASE_URL_IMG = "http://smarthydroapp.cl:8000/";
export const BASE_URL = "http://smarthydroapp.cl:8000/api/";

export const INSTANCE = axios.create({
  baseURL: BASE_URL,
});

export const POST_LOGIN = async (endpoint, data) => {
  const request = await INSTANCE.post(endpoint, data);
  return request;
};

export const GET = async (endpoint) => {
  const token = JSON.parse(localStorage.getItem("access_token") || null);
  const options = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  const response = await INSTANCE.get(endpoint, options);

  return response;
};

export const GET_NOTTOKEN = async (endpoint) => {
  const response = await INSTANCE.get(endpoint);

  return response;
};

export const POST = async (endpoint, data) => {
  const token = JSON.parse(localStorage.getItem("access_token") || null);

  const options = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = INSTANCE.post(endpoint, data, options);

  return response;
};

export const UPDATE = async (endpoint, data) => {
  const token = JSON.parse(localStorage.getItem("access_token") || null);

  const options = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = INSTANCE.patch(endpoint, data, options);

  return response;
};

export const DELETE = async (endpoint) => {
  const token = JSON.parse(localStorage.getItem("access_token") || null);

  const options = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = INSTANCE.delete(endpoint, options);

  return response;
};

export const POST_FILE = async (endpoint, fields) => {
  console.log(fields);
  const token = JSON.parse(localStorage.getItem("access_token") || null);
  let data = new FormData();
  fields.map((e) => data.append(e.key, e.value));
  const options = {
    headers: {
      Authorization: `Token ${token}`,
      "content-type": "multipart/form-data",
    },
  };
  const request = await INSTANCE.post(endpoint, data, options);
  return request;
};

export const POST_FILE_NOT_TOKEN = async (endpoint, fields) => {
  console.log(fields);
  let data = new FormData();
  fields.map((e) => data.append(e.key, e.value));
  const options = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const request = await INSTANCE.post(endpoint, data, options);
  return request;
};
