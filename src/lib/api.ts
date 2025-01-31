const BASE_URL = "https://global-warming.org/api";

export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const api = {
  getTemperature: () => fetchData("temperature-api"),
  getCO2: () => fetchData("co2-api"),
  getMethane: () => fetchData("methane-api"),
  getNO2: () => fetchData("nitrous-oxide-api"),
  getPolarIce: () => fetchData("arctic-api"),
};
