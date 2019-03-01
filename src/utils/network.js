export function apiCall(method, url, data, successCallback, errorCallback){
  const BASE_URL = "https://spotparking-api.herokuapp.com/api"
	fetch(BASE_URL + url, {
			method: method,
			mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
			body: JSON.stringify(data)
		}
	)
  .then(res => res.json())
  .then((res) => successCallback(res))
  .catch((error) => errorCallback(error))
}