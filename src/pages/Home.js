import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState("Categories");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: "https://sekawanserver.vercel.app/restaurants",
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="px-4 lg:px-20 py-8">
      <h1 className="px-8 text-4xl">Restaurants</h1>
      <p className="mt-4 px-8 w-8/12 opacity-60">
        Selamat datang di portal restoran Indonesia! Temukan kelezatan kuliner
        Indonesia dari berbagai daerah di sini. Dari hidangan nusantara yang
        autentik hingga sajian modern dengan sentuhan kreatif, restoran-restoran
        terbaik di Indonesia hadir untuk memuaskan selera Anda. Nikmati
        pengalaman kuliner yang tak terlupakan dengan suasana yang menyenangkan,
        di mana tiap hidangan diolah dengan bahan-bahan segar dan berkualitas
        tinggi. Mulai dari nasi padang hingga bakso, sate, dan makanan laut,
        semua ada di sini! Kunjungi restoran-restoran terbaik di Indonesia
        sekarang dan nikmati kelezatan kuliner yang membuat lidah Anda
        bergoyang!
      </p>
      <div className="px-2 md:px-8 w-full mt-4 text-xs md:text-sm flex items-center h-16 justify-between flex-row border-y-2">
        <div className="gap-1 md:gap-4 items-center flex flex-row">
          <h3>Filter By: </h3>
          <div className="border-b-2">
            <input
              onChange={() => setIsOpen((prev) => !prev)}
              type="checkbox"
              id="isOpen"
              name="isOpen"
            ></input>
            <label className="ml-2" htmlFor="isOpen">
              Open Now
            </label>
          </div>
          <div className="border-b-2">
            <select
              value={maxPrice === 0 ? "Price" : [minPrice, maxPrice]}
              className="focus:outline-none"
              onChange={(e) => {
                setMinPrice(e.target.value.split(",")[0]);
                setMaxPrice(e.target.value.split(",")[1]);
              }}
              id="price"
              name="price"
            >
              <option value="Price" disabled hidden>
                Price
              </option>
              <option value={[0, 10000]}>0 - 10.000</option>
              <option value={[10000, 100000]}>10.000 -{">"} 100.000</option>
              <option value={[100000, 500000]}>100.000 -{">"} 500.000</option>
              <option value={[500000, 1000000]}>
                500.000 -{">"} 1.000.000
              </option>
            </select>
          </div>
          <div className="border-b-2">
            <select
              value={categories}
              className="focus:outline-none"
              onChange={(e) => setCategories(e.target.value)}
              id="categories"
              name="categories"
            >
              <option value="Categories" disabled hidden>
                Categories
              </option>
              <option value="All">All</option>
              <option value="IceCream">IceCream</option>
              <option value="Mie">Mie</option>
              <option value="Tradisional">Tradisional</option>
              <option value="Fastfood">Fastfood</option>
            </select>
          </div>
        </div>
        <button
          disabled={`${
            categories === "Categories" && maxPrice === 0 ? "disabled" : ""
          }`}
          className={`border py-1 px-4 ${
            categories === "Categories" && maxPrice === 0 ? "opacity-60" : ""
          }`}
          onClick={() => {
            setCategories("Categories");
            setMinPrice(0);
            setMaxPrice(0);
          }}
        >
          Clear All
        </button>
      </div>

      <section className="p-8">
        <h2 className="text-2xl mb-4">
          {categories === "Categories" ? "All" : categories} Restaurants
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full">
          {data
            ?.filter((val, index) => {
              if (isOpen) {
                return val.isOpen;
              } else if (!isOpen) {
                return val;
              }
            })
            .filter((val, index) => {
              if (maxPrice === 0) {
                return val;
              } else {
                return (
                  (val.minPrice >= minPrice && val.minPrice <= maxPrice) ||
                  (val.maxPrice >= minPrice && val.maxPrice <= maxPrice)
                );
              }
            })
            .filter((val, index) => {
              if (categories === "All" || categories === "Categories") {
                return val;
              } else if (val.categories === categories) {
                return val;
              }
            })
            .map((val, index) => (
              <div key={index} className="h-80 flex flex-col gap-2 w-full">
                <img
                  alt="Restaurant"
                  src={`https://sekawanserver.vercel.app/${val?.image}`}
                  className="w-full h-1/2"
                ></img>
                <h4>{val?.name}</h4>
                <div className="flex flex-row">
                  {val.rating.map((val, index) => {
                    if (val === "true") {
                      return (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="opacity-60"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      );
                    } else {
                      return (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="opacity-60"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      );
                    }
                  })}
                </div>

                <div className="text-xs text-slate-500 flex flex-row justify-between">
                  <h5>{val.categories}</h5>
                  <div className="flex flex-row gap-1 items-center">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        val.isOpen ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    {val.isOpen ? <h5>Open</h5> : <h5>Closed</h5>}
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/${val._id}`)}
                  className="mt-4 w-full bg-blue-800 text-white py-2 hover:bg-blue-700 duration-200"
                >
                  Learn More
                </button>
              </div>
            ))}
        </div>
      </section>
      <div className="flex flex-col gap-2 items-center">
        <button
          onClick={() => {
            setIsLoaded(true);
            setTimeout(() => {
              setIsLoaded(false);
            }, 2000);
          }}
          className="w-1/4 p-2 border hover:shadow-md duration-200"
        >
          Load More
        </button>
        <h3 className={`${isLoaded ? "flex" : "hidden"}`}>
          Semua data sudah termuat
        </h3>
      </div>
    </div>
  );
};

export default Home;
