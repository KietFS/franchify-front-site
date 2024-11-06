const fs = require("fs");
const axios = require("axios");

const fetchTailwindConfig = async () => {
  try {
    const response = await axios.get("http://localhost:4000/tenant/theme");
    if (response?.data?.success) {
      const configContent = response.data?.data;

      fs.writeFileSync("tailwind.config.js", configContent);
      console.log(
        "Tailwind CSS configuration fetched and written to tailwind.config.js"
      );
    } else {
      console.error(
        "Error fetching Tailwind CSS configuration:",
        response?.data?.message
      );
    }
  } catch (error) {
    console.error("Error fetching Tailwind CSS configuration:", error);
  }
};

fetchTailwindConfig();
