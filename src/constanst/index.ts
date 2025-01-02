export const apiURL =
  process?.env?.NODE_ENV == "production"
    ? "https://coop-mart-23a4fc25e317.herokuapp.com"
    : "http://localhost:4000";
