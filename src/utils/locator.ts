const getStoreByLocation = async (
  getListStore: Function,
  currentStore: any,
) => {
  if (!currentStore) {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            await getListStore(longitude, latitude);
            resolve(true);
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            reject(error);
          },
        );
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
};

export { getStoreByLocation };
