import axios from "axios";
let baseUrl = "http://192.168.15.18:5000/posts";
export const getPosts = async (filter, setLoading) => {
  if (filter == "Inicio") {
    url = `${baseUrl}`;
  } else if (filter == "Mesas") {
    url = `${baseUrl}/post/Mesa`;
  } else if (filter == "Jogadores") {
    url = `${baseUrl}/post/Jogadores`;
  } else if (filter == "Off Topic") {
    url = `${baseUrl}/post/Off Topic`;
  }
  try {
    const response = await axios.get(url);
    setLoading(false);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};