// import axios from "axios";

// async function getAccesstoken(){
//     return axios.get('http://localhost:8080/token')
//     .then((response) => {
//         return response.data;
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// };

// const Client = {getAccesstoken};
// export default Client;

import axios from "axios";

async function getAccesstoken(){
    // Simulez une réponse comme si elle provenait du serveur
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: "faux-jeton-simulé-pour-le-développement"
            });
        }, 1000); // Simule un délai réseau
    });
};

const Client = {getAccesstoken};
export default Client;
