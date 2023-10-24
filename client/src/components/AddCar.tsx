import React, { ChangeEvent, useState } from "react";
import { TCar } from "./Car";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const navigate = useNavigate();
  const [addCar, setAddCar] = useState<TCar>({
    no: NaN,
    make: "",
    model: "",
    year: NaN,
    price: NaN,
    status: "live",
  });

  const submitCar = async () => {
    await axios
      .post("/api/cars", addCar)
      .then((response) => navigate("/"))
      .catch((err) => console.warn(err));
  };

  return (
    <div className="submit-form">
      {
        <div>
          <div className="form-group">
            <label htmlFor="no" className="font-weight-bold">NO</label>
            <input
              type="number"
              className="form-control"
              id="no"
              required
              value={addCar.no ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAddCar({ ...addCar, no: parseFloat(e.target.value) })
              }
              name="no"
            />
          </div>

          <div className="form-group">
            <label htmlFor="make" className="font-weight-bold">Make</label>
            <input
              type="text"
              className="form-control"
              id="make"
              required
              value={addCar.make ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAddCar({ ...addCar, make: e.target.value })
              }
              name="make"
            />
          </div>

          <div className="form-group">
            <label htmlFor="model" className="font-weight-bold">Model</label>
            <input
              type="text"
              className="form-control"
              id="model"
              required
              value={addCar.model ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAddCar({ ...addCar, model: e.target.value })
              }
              name="model"
            />
          </div>

          <div className="form-group">
            <label htmlFor="year" className="font-weight-bold">Year</label>
            <input
              type="number"
              className="form-control"
              id="year"
              required
              value={addCar.year ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAddCar({ ...addCar, year: parseFloat(e.target.value) })
              }
              name="year"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price" className="font-weight-bold">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              value={addCar.price ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAddCar({ ...addCar, price: parseFloat(e.target.value) })
              }
              name="price"
              placeholder="$"
            />
          </div>

          <button
            onClick={submitCar}
            className="btn btn-success"
            disabled={!addCar.make || !addCar.model}
          >
            Submit
          </button>
        </div>
      }
    </div>
  );
};

export default AddCar;
