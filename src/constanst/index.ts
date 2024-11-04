export const apiURL =
  process?.env?.NODE_ENV == "production"
    ? "https://market-floor-f882ae6a2b49.herokuapp.com"
    : "http://localhost:4000";
