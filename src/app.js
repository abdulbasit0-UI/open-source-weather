const path = require("path");
const express = require("express");
const hbs = require("hbs");
const currentWeather = require("./utils/weather");

const port = process.env.PORT || 3000;

const app = express();

const PublicPath = path.join(__dirname, "../public");
const ViewsPath = path.join(__dirname, "../templates/views");
const PartialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs"); // set the view engine to hbs
app.set("views", ViewsPath);
hbs.registerPartials(PartialsPath);

app.use(express.static(PublicPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
  });
});

app.get("/weather", (req, res) => {
  currentWeather(
    req.query.address,
    (
      error,
      locations,
      temp_c,
      text,
      icon,
      feelslike_c,
      humidity,
      vis_km,
      pressure_mb
    ) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        locations,
        temp_c,
        text: text,
        icon,
        feelslike_c,
        humidity,
        vis_km,
        pressure_mb,
      });
    }
  );
});

app.listen(port, () => {
  console.log("Server is up on port 3000");
});
