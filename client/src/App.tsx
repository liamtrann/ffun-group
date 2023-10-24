import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CarList from "./components/CarList";
import AddCar from "./components/AddCar";
import Car from "./components/Car";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/cars"} className="navbar-brand">
          Home
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path={"/cars"} element={<CarList />} />
          <Route path="/add" element={<AddCar />} />
          <Route path="/car/:id" element={<Car />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
