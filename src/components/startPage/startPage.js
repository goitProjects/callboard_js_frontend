import services from "../../services";

export const fetcher = async () => {
  const response = await services.gellAllCategory();
  console.log("response :", response);
};

fetcher();
