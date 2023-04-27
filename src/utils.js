import axios from "axios";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const customAxios = () => {
  return axios.create({
    baseURL: "http://localhost:5000/api/v1",
  });
};

export { customAxios, shuffleArray };
