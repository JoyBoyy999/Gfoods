import React, { useEffect, useState } from "react";
import Navbar from "../comp/Navbar";
import Footer from "../comp/Footer";
import Card from "../comp/Card";
import download from "../Help/download.jpg"; // assuming the image file is in the same directory as your component
import download1 from "../Help/download1.jpg"; // assuming the image file is in the same directory as your component
import download2 from "../Help/download2.jpg"; // assuming the image file is in the same directory as your component

export default function Home() {
  const [categoryItems, setItems] = useState([]);
  const [categoryData, setcatData] = useState([]);

  async function loadData() {
    let data = await fetch("http://localhost:5000/api/v1/foodData");

    data = await data.json();

    setItems(data[0]);
    console.log(data[0]);
    console.log(data[1]);
    setcatData(data[1]);
  }

  useEffect(() => {
    loadData();
  }, []);

  const [search, setSearch] = useState("");

  return (
    <div>
      <div>
        <Navbar />
      </div >
      
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-caption " style={{ zIndex: "10" }}>
              <div className="d-flex">
                <input
                  className="form-control mr-sm-2 "
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search"
                  aria-label="Search"
                />
                {/* <button className="btn btn-outline-success my-2 my-sm-0 text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src={download}
                width="900px"
                height="600px"
                style={{ objectFit: "cover" ,filter: "brightness(30%)" }}

                className="d-block w-100"
              ></img>
            </div>

            <div className="carousel-item">
              <img
                src={download1}
                width="900px"
                height="600px"
                style={{ objectFit: "cover" ,filter: "brightness(30%)" }}
                className="d-block w-100"
                alt="..."
              />
            </div>

            <div className="carousel-item">
              <img
                src={download2}
                width="900px"
                height="600px"
                style={{ objectFit: "cover" ,filter: "brightness(30%)" }}
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>


      <div className="container">
        {categoryData ? (
          categoryData.map((data) => {
            return (
              <div className="row mb-3">
                
                <div className="fs-3 m-3">{data.CategoryName}</div>

                {categoryItems ? (
                  categoryItems
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItem) => {
                      {
                        return ( 
                          <div className="col-12 col-md-6 col-lg-3">
                            <Card
                              options={filterItem.options[0]}
                              foodItems = {filterItem}
                            />
                          </div>
                        );
                      }
                    })
                ) : (
                  <div>No data found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>No data found</div>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
