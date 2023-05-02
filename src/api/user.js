import axios from "axios";

let baseUrl = "http://192.168.15.18:5000/posts/user/";

export const getUserPosts = async (nickName) => {
  let url = baseUrl + nickName;
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
