import services from "../../services";

export const searchByAllAds = async () => {
  const getAllAds = await services.getAllAds();
  const quantityAllAds = getAllAds.totalDocs;

  const allAds = await services.getAdsLimit(quantityAllAds, 1);
  const allTitles = allAds.data.ads.docs;

  allTitles.map(el => {
    const titleName = el.title.toLowerCase();
    const inputValue = "title";

    if (titleName.includes(inputValue)) {
      // console.log(el);
    }
  });
};

searchByAllAds();

export const searchByCategories = async () => {
  const getAllAds = await services.getAllAds();
  const quantityAllAds = getAllAds.totalDocs;
  const catID = 8;

  const allAds = await services.getAdsByCategory(catID, quantityAllAds);
  const allTitles = allAds.data.ads.docs;

  allTitles.map(el => {
    const titleName = el.title.toLowerCase();
    const inputValue = "title";

    if (titleName.includes(inputValue)) {
      // console.log(el);
    }
  });
};

searchByCategories();

