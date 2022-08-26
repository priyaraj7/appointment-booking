const commonRequestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
};

export const postDoctor(body) {
    const requestOptions = {
	...commonRequestOptions,
      method: "POST",
      body: JSON.stringify(addDoctor),
    };
    try {
      const fetchResponse = await fetch("/api/doctor", requestOptions);
      console.log(fetchResponse);
      return await fetchResponse.json();
    } catch (error) {
      console.log(error);
      return error;
    }
}
