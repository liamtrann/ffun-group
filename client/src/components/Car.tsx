import axios from "axios";
import { error } from "console";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export type TCar = {
  id?: any;
  no: number | undefined;
  make: string | undefined;
  model: string | undefined;
  year: number | undefined;
  price: number | undefined;
  status: "live" | "sold";
};

const Car = () => {
  const [currentCar, setCurrentCar] = useState<TCar>();
  let { id } = useParams();
  const navigate = useNavigate();
  const fetchCar = async (id: string) => {
    await axios
      .get(`/api/cars/${id}`)
      .then((res) => setCurrentCar(res.data))
      .catch((err) => console.warn(err));
  };
  useEffect(() => {
    if (id) fetchCar(id);
  }, [id]);

  const updateCar = async (sold: boolean) => {
    let updateData = { ...currentCar };
    if (sold) updateData = { ...updateData, status: "sold" };
    await axios
      .put(`/api/cars/${id}`, updateData)
      .then((res) => navigate("/"))
      .catch((err) => console.warn(err));
  };

  return currentCar ? (
    <div className="submit-form">
      {
        <div>
          <div className="form-group">
            <label htmlFor="no" className="font-weight-bold">
              NO
            </label>
            <input
              type="number"
              className="form-control"
              id="no"
              required
              value={currentCar.no ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCurrentCar({ ...currentCar, no: parseFloat(e.target.value) })
              }
              name="no"
            />
          </div>

          <div className="form-group">
            <label htmlFor="make" className="font-weight-bold">
              Make
            </label>
            <input
              type="text"
              className="form-control"
              id="make"
              required
              value={currentCar.make ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCurrentCar({ ...currentCar, make: e.target.value })
              }
              name="make"
            />
          </div>

          <div className="form-group">
            <label htmlFor="model" className="font-weight-bold">
              Model
            </label>
            <input
              type="text"
              className="form-control"
              id="model"
              required
              value={currentCar.model ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCurrentCar({ ...currentCar, model: e.target.value })
              }
              name="model"
            />
          </div>

          <div className="form-group">
            <label htmlFor="year" className="font-weight-bold">
              Year
            </label>
            <input
              type="number"
              className="form-control"
              id="year"
              required
              value={currentCar.year ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCurrentCar({
                  ...currentCar,
                  year: parseFloat(e.target.value),
                })
              }
              name="year"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price" className="font-weight-bold">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              value={currentCar.price ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCurrentCar({
                  ...currentCar,
                  price: parseFloat(e.target.value),
                })
              }
              name="price"
              placeholder="$"
            />
          </div>

          <div className="d-flex justify-content-between">
            <button
              onClick={() => updateCar(false)}
              className="btn btn-success"
              disabled={!currentCar.make || !currentCar.model}
            >
              Update
            </button>
            <button
              onClick={() => {
                setCurrentCar({ ...currentCar, status: "sold" });
                updateCar(true);
              }}
              className="btn btn-info"
            >
              Mask as sold
            </button>
          </div>
        </div>
      }
    </div>
  ) : (
    <div>No data exist</div>
  );
};

export default Car;
