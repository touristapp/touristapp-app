
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
                    "Authorization": 'Bearer '+auth.token
                },
                body
            }
        );
        return response.json();
    } catch (errors) {
        throw errors;
    }
};

const put = async (url, body={}, auth='') => {
    try {
        let response = await fetch(
            url,
            {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer '+auth.token
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
    register: async (body) => post(`${api}auth/register`,JSON.stringify(body)),

    login: async (body) => post(`${api}auth/login`,JSON.stringify(body)),

    authorizeUser: async (token) => post(`${api}auth/authorize`,JSON.stringify({token: token})),

    getCurrentUser: async (auth) => get(`${api}user/${auth.data.decoded.id}`,auth),

    getUserVehicle: async (vehicleId,auth) => get(`${api}vehicle/${vehicleId}`,auth),

    getVehicleFuel: async (fuelId,auth) => get(`${api}vehicle/fuel/${fuelId}`,auth),

    getAllVehicles: async (auth) => get(`${api}vehicle`,auth),

    getAllFuels: async (auth) => get(`${api}fuel`,auth),

    createVehicle: async (body,auth) => post(`${api}vehicle`,JSON.stringify(body),auth),

    updateVehicle: async (vehicleId,body,auth) => put(`${api}vehicle/${vehicleId}`,JSON.stringify(body),auth),
}
