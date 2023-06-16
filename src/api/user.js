import axios from "axios";

let baseUrl = "https://arena-rpg.up.railway.app/posts/user/";

export const getUserPosts = async (nickName) => {
  let url = baseUrl + nickName;
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
