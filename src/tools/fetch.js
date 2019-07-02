export default Fetch = {
    get: async function(url, auth = null) {
        try {
            let response = await fetch(
                url,
                {
                    method: "GET",
                    headers: {
                        "Authorization": 'Bearer '+auth
                    }
                }
            );
            console.log(response);
            return response
        } catch (errors) {
            throw errors;
        }
    },

    post: async function(url, body = {}, auth = null) {
        try {
            let response = await fetch(
                url,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": auth
                    },
                    body
                }
            );
            return response
        } catch (errors) {
            throw errors;
        }
    },

    authorizeUser: async function (token) {
      const url = "https://touristapi.herokuapp.com/api/auth/authorize"
      const body = JSON.stringify({token: token})
      try {
        let response = await fetch(
            url,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body
            }
        );
        return response.json();
      } catch (errors) {
          throw errors;
      }
    },
    getCurrentUser: async (auth) => {
      const url = `https://touristapi.herokuapp.com/api/user/${auth.data.decoded.id}`
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
    },
    getUserVehicle: async (vehicleId,auth) => {
      const url = `https://touristapi.herokuapp.com/api/vehicle/${vehicleId}`
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
    },
    getVehicleFuel: async (fuelId,auth) => {
      const url = `https://touristapi.herokuapp.com/api/vehicle/fuel/${fuelId}`
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
    },
}
