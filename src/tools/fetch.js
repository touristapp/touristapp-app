import { returnStatement } from "@babel/types";
import ENV from '../../env';

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

const remove = async (url, auth='') => {
    try {
        let response = await fetch(
            url,
            {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer '+auth.token
                },
            }
        );
        return response.json();
    } catch (errors) {
        throw errors;
    }
};

const mapsApi = async (addressDescDepart, addressDescArrivee, vehicle) => {
    try {
        let response = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${addressDescDepart}&destination=${addressDescArrivee}&mode=${vehicle}&key=${ENV.googleMapsApiKey}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: ENV.googleMapsApiKey
                }
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
  /******** AUTH ********/
  register: (body) => post(`${api}auth/register`,JSON.stringify(body)),

  login: (body) => post(`${api}auth/login`,JSON.stringify(body)),

  authorizeUser: (token) => post(`${api}auth/authorize`,JSON.stringify({token: token})),

  /******** USER ********/
  getCurrentUser: (auth) => get(`${api}user/${auth.decoded.id}`,auth),

  updateInfos: (id,body,auth) => put(`${api}user/${id}`, JSON.stringify(body), auth),

  updateVehicle: (id,body,auth) => put(`${api}user/vehicle/${id}`, JSON.stringify(body), auth),

  updatePassword: (id,body,auth) => put(`${api}user/updatepassword/${id}`, JSON.stringify(body), auth),

  /******** VEHICLE *******/
  getUserVehicle: (userId,auth) => get(`${api}vehicle/${userId}`,auth),

  getVehicleFuel: (vehicleId,auth) => get(`${api}vehicle/fuel/${vehicleId}`,auth),

  getAllVehicles: (auth) => get(`${api}vehicle`,auth),

  getOneVehicle: (name, auth) => get(`${api}vehicle/name/${name}`,auth),

  deleteVehicle: (vehicleId,auth) => remove(`${api}vehicle/${vehicleId}`,auth),

  /******** FUEL *********/
  getAllFuels: (auth) => get(`${api}fuel`,auth),

  /******** MAPS *********/
  getDirections: (addressDescDepart, addressDescArrivee, vehicle) =>
      mapsApi( addressDescDepart, addressDescArrivee, vehicle),

  /******** PICTURES *********/
  postPicture: async (userId, body, auth) => {
    try{
      let response = await fetch(`${api}user/addImage/${userId}`, {
        method: "POST",
        headers: {
          "Authorization": 'Bearer ' + auth.token
        },
        body
      })
      return response.json()
    }
    catch(err){
      console.log("ERROR on fetching picture", err)
    }
  },

  deletePicture: (fileKey, auth) => remove(`${api}user/deleteImage/${fileKey}`,auth),

  /******** TRAVEL ************/
  getSearches: (UserId, auth) => get(`${api}travel/itineraire/${UserId}`, auth),

  getTravels: (UserId, auth) => get(`${api}travel/voyage/${UserId}`, auth),

  createTravel: (body,auth) => post(`${api}travel/`, JSON.stringify(body), auth),
}
