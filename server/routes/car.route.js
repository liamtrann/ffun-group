module.exports = (app) => {
  var router = require("express").Router();
  const car = require("../controllers/car.controller");

  router.post("/", car.create);
  router.get("/", car.findAll);
  router.get("/:id", car.findOne);
  router.put("/:id", car.update);
  router.delete("/:id", car.delete);
  router.delete("/", car.deleteAll);

  app.use("/api/cars", router);
};
