import services from "../../services";
import sideBar from "../sideBar/sideBar.css";

export const fetcher = async () => {
  const response = await services.gellAllCategory();
  console.log("response :", response);
};

fetcher();
