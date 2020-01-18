import axios from "axios";
axios.defaults.baseURL = "https://dashads.goit.co.ua";

export default {
  async gellAllCategory() {
    try {
      const data = await axios.get("/api/v1/ads/all");
      return data;
    } catch (e) {
      throw e;
    }
  }
};
