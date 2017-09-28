const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 8082;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.post("/loan", (req, res) => {
  const price = req.body.price;
  const months = req.body.months;
  const insurance = req.body.insurance;

  res.json(computeResult(price, months, insurance));
});

const computeResult = (price, months, insurance) => {
  const lowerRate = 0.069;
  const higherRate = 0.0711;

  let rate = 0;

  if (insurance === true) {
    rate = higherRate;
  } else {
    rate = lowerRate;
  }

  let result =
    price * (rate / 12 / (1 - Math.pow(1 / (1 + rate / 12), months))) * months;

  return result;
};

app.use("/api", router);
app.listen(port);
console.log("Magic happens on port " + port);
