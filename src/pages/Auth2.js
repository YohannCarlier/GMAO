import axios from "axios";

async function getAccesstoken2(){
    return axios.get('http://localhost:8080/token2')
    .then((response) => {
        return response.data;
    })
    .catch((err) => {
        console.log(err);
    })
};

const Client2 = {getAccesstoken2};
export default Client2;
