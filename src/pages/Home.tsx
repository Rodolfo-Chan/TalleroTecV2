import React from "react";
import "../components/styles.css";
import { PiStudentFill } from "react-icons/pi";
import { MdOutlineSportsKabaddi, MdSportsVolleyball } from "react-icons/md";
import { TbLocationStar } from "react-icons/tb";
import { GiMailbox } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { BiSolidHomeHeart } from "react-icons/bi";
import { SiHomeadvisor } from "react-icons/si";

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <div className="header-content">
          <h1>BASHBOARD <SiHomeadvisor />
          </h1>

        </div>
        <div>
          <p>
            <FcGoogle />
            rodolfochan2910@gmail.com
          </p>
        </div>
      </header>

      <main className="main-content">
        <section className="cards">
          <div className="card">
            <div className="card-content">
              <div className="card-text">
                <h2>Alumnos</h2>
                <p>$40</p>
              </div>
              <PiStudentFill className="card-icon" />
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="card-text">
                <h2>Talleres</h2>
                <p>$215,000</p>
              </div>
              <MdSportsVolleyball className="card-icon" />
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="card-text">
                <h2>Instructores</h2>
                <p>50%</p>
              </div>
              <MdOutlineSportsKabaddi className="card-icon" />
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="card-text">
                <h2>Locaciones</h2>
                <p>18</p>
              </div>
              <TbLocationStar className="card-icon" />
            </div>
          </div>
        </section>

        <section className="table-section">
          <h2>Tabla de Datos</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Ciudad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Juan</td>
                <td>28</td>
                <td>Ciudad de México</td>
              </tr>
              <tr>
                <td>María</td>
                <td>34</td>
                <td>Guadalajara</td>
              </tr>
              <tr>
                <td>Carlos</td>
                <td>22</td>
                <td>Monterrey</td>
              </tr>
            </tbody>
          </table>
        </section>

        
      </main>
    </div>
  );
};

export default Home;
