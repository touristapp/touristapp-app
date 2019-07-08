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

    postPicture: async (userId, body, token) => {
      try{
        let response = await fetch(`${api}user/addImage/${userId}`, {
          method: "POST",
          headers: {
            "Authorization": 'Bearer ' + token
          },
          body
        })
        return response.json()
      }
      catch(err){
        console.log("ERROR on fetching picture", err)
      }
    }

    // postPicture: async (userId, body, token) => {
    //   await fetch(`${api}user/addImage/${userId}`, {
    //     method: "POST",
    //     headers: {
    //       "Authorization": 'Bearer ' + token
    //     },
    //     body
    //   })
    //   .then(res => {
    //     return res.json()
    //   })
    //   .catch(err => {
    //     console.log("ERROR on fetching picture", err)
    //   })
    // }
}
