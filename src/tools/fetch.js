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
}
