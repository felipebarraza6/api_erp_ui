import axios from "axios";

export const BASE_URL = "https://api.smarthydro.app/api/";
//export const BASE_URL = 'http://localhost:8000/api'

export const INSTANCE = axios.create({
  baseURL: BASE_URL,
});

export const GET = async (endpoint) => {
  //965b545de8abb74e663b76baee04b0544e49cdb6
  //e1b8180c0c8ff832654109b3cdd4dbb6658c3abe
  const options = {
    headers: {
      Authorization: `Token c36dd73dbcd84d02636b761ef5b6185023e9ee52`,
    },
  };
  const response = await INSTANCE.get(endpoint, options);

  return response;
};
