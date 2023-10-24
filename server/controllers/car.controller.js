const db = require("../models");
const Car = db.car;
const Op = db.Sequelize.Op;

// Create
exports.create = (req, res) => {
  // Validate request
  if (!req.body.no) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Car
  const car = {
    no: req.body.no,
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    price: req.body.price,
    status: req.body.status,
  };

  Car.create(car)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Car.",
      });
    });
};

exports.findAll = (req, res) => {
  const searchTerm = req.query.search;
  
  const whereCondition = {};

  if (searchTerm) {
    whereCondition[Op.or] = [
      {
        make: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
      {
        model: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
    ];
    if (parseFloat(searchTerm)) {
      whereCondition[Op.or].push(
        {
          no: {
            [Op.eq]: parseFloat(searchTerm),
          },
        },
        {
          year: {
            [Op.eq]: parseFloat(searchTerm),
          },
        }
      );
    }
  }

  Car.findAll({
    where: whereCondition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cars.",
      });
    });
};

// Find a Car with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Car.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Car with id=" + id,
      });
    });
};

// Update a Car by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Car.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Car was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};
