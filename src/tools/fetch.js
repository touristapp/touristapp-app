export default Fetch = {
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
