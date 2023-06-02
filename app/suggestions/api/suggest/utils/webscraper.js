import axios from "axios";
const cheerio = require("cheerio");

export const fetchPerformances = async () => {
  const lineUpUrl =
    "https://www.glastonburyfestivals.co.uk/line-up/line-up-2023/?artist";
  try {
    const response = await axios.get(lineUpUrl);

    const html = response.data;
    const $ = cheerio.load(html);

    const performances = [];

    $("li").each((_idx, el) => {
      const performance = {};

      for (const child of el.children) {
        let key = child.attribs.class;
        let value = $(child).text();
        if (key == "title tooltip") key = "title";
        performance[key] = value;
      }
      if (Object.keys(performance).length == 4) {
        performances.push(performance);
      }
    });
    return performances;
  } catch (error) {
    throw error;
  }
};
