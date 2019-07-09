
/***************************************/
/*          FETCH PATTERNS             */
/***************************************/

const api = 'https://touristapi.herokuapp.com/api/';
const local = 'http://localhost:8080/api/';

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
    register: (body) => post(`${api}auth/register`,JSON.stringify(body)),

    login: (body) => post(`${api}auth/login`,JSON.stringify(body)),

    authorizeUser: (token) => post(`${api}auth/authorize`,JSON.stringify({token: token})),

    getCurrentUser: (auth) => get(`${api}user/${auth.data.decoded.id}`,auth),

    getUserVehicle: (userId,auth) => get(`${api}vehicle/${userId}`,auth),

    getVehicleFuel: (vehicleId,auth) => get(`${api}vehicle/fuel/${vehicleId}`,auth),

    getAllVehicles: (auth) => get(`${api}vehicle`,auth),

    getAllFuels: (auth) => get(`${api}fuel`,auth),

    updateVehicle: (id,body,auth) => put(`${api}user/vehicle/${id}`, JSON.stringify(body), auth),

    updateInfos: (id,body,auth) => put(`${api}user/${id}`, JSON.stringify(body), auth),

    updatePassword: (id,body,auth) => put(`${api}user/updatepassword/${id}`, JSON.stringify(body), auth),
}
