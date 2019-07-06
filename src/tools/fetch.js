import { returnStatement } from "@babel/types";

/***************************************/
/*          FETCH PATTERNS             */
/***************************************/

const api = 'https://touristapi.herokuapp.com/api/';

const get = async (url, auth='') => {
  try {
      let response = await fetch(
          url,
          {
              method: "GET",
              headers: {
                  "Authorization": 'Bearer '+auth.token
              }
          }
      );
      return response.json();
  } catch (errors) {
      throw errors;
  }
};

const post = async (url, body={}, auth='') => {
    try {
        let response = await fetch(
            url,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": auth.token
                },
                body
            }
        );
        return response.json();
    } catch (errors) {
        throw errors;
    }
};

/***************************************/
/*              SHORTCUTS              */
/***************************************/

export default Fetch = {
    register: async function (body) {
      return await post(`${api}auth/register`,JSON.stringify(body));
    },

    login: async function (body) {
      return await post(`${api}auth/login`,JSON.stringify(body));
    },

    authorizeUser: async function (token) {
      return await post(`${api}auth/authorize`,JSON.stringify({token: token}));
    },

    getCurrentUser: async function (auth) {
      return await get(`${api}user/${auth.data.decoded.id}`,auth);
    },

    getUserVehicle: async function (vehicleId,auth) {
      return await get(`${api}vehicle/${vehicleId}`,auth);
    },

    getVehicleFuel: async function (fuelId,auth) {
      return await get(`${api}vehicle/fuel/${fuelId}`,auth)
    },

    // postPicture: async function (userId, pathPicture) {
    //   return await post(`${api}user/addImage/${userId}`,auth)
    // },

    postPicture: async (userId, body, token) => {
      fetch(`${api}user/addImage/${userId}`, {
        method: "POST",
        headers: {
          // "Accept": "application/json",
          // "Content-Type": "application/json",
          "Authorization": 'Bearer ' + token
        },
        body: JSON.stringify(body)
      }).then(
        res => {
          console.log("SUCCESS on fetching picture")
          console.log(body)
          res.json
        }
      ).catch(
        err => {
          console.log("ERROR on fetching picture")
          console.log(body)
          console.log(err)
        }
      )
    }
}
