import services from "../../services";

export const fetcher = async () => {
  const response = await services.gellAllCategory();
  console.log("Start page response :", response.data.ads.categories);
};

fetcher();
