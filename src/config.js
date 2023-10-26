// config.js
const username = "firestore-user";
const password = "IZs8@04%p#21H";

// Function to generate the basic auth header value
const generateBasicAuthHeader = (username, password) => {
    const credentials = `${username}:${password}`;
    const base64Credentials = btoa(credentials);
    return `Basic ${base64Credentials}`;
  };
  
const basicAuthHeader = generateBasicAuthHeader(username, password);

export { basicAuthHeader };
