import services from "../../services";
//import template from './modalTemplate.html';








export const fetcher = async () => {
	const response = await services.gellAllCategory();
	// console.log("response :", response);
	
};

fetcher();