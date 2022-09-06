import themes from "../themes";

export const getPrice = async () => {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getGraphicPrice = async (cryptoId) => {
  //String Literals ECMA6
  const urlChart = `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=15&interval=daily`;
  try {
    const response = await fetch(urlChart);
    const data = await response.json();
    const graphicData = data.prices.map(graphicFormat);
    const graphicInfo = [
      {
        color: themes.colors.utility.info,
        seriesName: "prices",
        data: graphicData,
      },
    ];
    return graphicInfo;
  } catch (error) {
    console.error(error.message);
  }

  function graphicFormat(element) {
    let obj = {};
    let formattedDate = new Date(element[0]).toLocaleDateString("en-us");
    obj = { x: formattedDate, y: element[1] };
    return obj;
  }
};
