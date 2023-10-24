import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { TCar } from "./Car";
import { useNavigate } from "react-router-dom";
import CarHistogram from "./CarHistogram";

const CarList = () => {
  const [allCars, setAllCars] = useState<TCar[]>();
  const [searchCar, setSearchCar] = useState<string>("");
  const navigate = useNavigate();
  const fetchData = async () => {
    await axios.get("/api/cars").then((res) => {
      const cars = res.data;
      setAllCars(cars);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handledSearch = async () => {
    await axios.get(`/api/cars?search=${searchCar}`).then((res) => {
      const cars = res.data;
      setAllCars(cars);
    });
  };

  return (
    <div>
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchCar}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchCar(e.target.value)
            }
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handledSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">NO</th>
            <th scope="col">Make</th>
            <th scope="col">Model</th>
            <th scope="col">Year</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        {allCars && allCars.length ? (
          <tbody>
            {allCars.map((car, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{car.no}</th>
                  <td>{car.make}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>${car.price}</td>
                  <td className="font-weight-bold">{car.status}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate(`/car/${car.id}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <div
            className="font-weight-bold"
            style={{
              margin: 10,
            }}
          >
            No Data Found
          </div>
        )}
      </table>
      <div className="w-75 p-3">
        <CarHistogram carStatus={allCars?.map((car) => car.status)} />
      </div>
    </div>
  );
};

export default CarList;
