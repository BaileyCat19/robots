import axios from "axios";

export const fetchRobots = () => {
  return axios.request({
    method: "get",
    headers: {
      "Content-Type": "application/json"
    },

    url: "https://localhost:3001/robots"
  });
};
