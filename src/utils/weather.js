const request = require("request");

const currentWeather = (address, callback) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=fbb0195d7c7148809b580616222005&q=${address}&aqi=no`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (!body.current) {
      callback(
        "Unable to find location, Please try another location :(",
        undefined
      );
    } else {
      callback(
        undefined,
        `${body.location.name}, ${body.location.region}`,
        `${body.current.temp_c}`,
        `${body.current.condition.text}`,
        `${body.current.condition.icon}`,
        `${body.current.feelslike_c}`,
        `${body.current.humidity}`,
        `${body.current.vis_km}`,
        `${body.current.pressure_mb}`
      );
    }
  });
};

module.exports = currentWeather;
