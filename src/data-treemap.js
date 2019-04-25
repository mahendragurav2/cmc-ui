const data = {
  name: "Top Coins- Blockchain",
  children: [
    {
      name: "BTC",
      value: 500,
      link: "https://google.com"
    },
    { name: "ETH", value: 200 },
    { name: "EOS", value: 400 },
    { name: "ADA", value: 300 },
    { name: "XLM", value: 200 },
    {
      name: "LTC",
      children: [{ name: "LTC1", value: 130 }, { name: "LTC2", value: 300 }]
    },

    {
      name: "OTHER COINS",
      children: [
        { name: "XET", value: 200 },
        { name: "XEM", value: 30 },
        { name: "ZEC", value: 80 },
        { name: "ADA", value: 40 }
      ]
    }
  ]
};

export default data;
