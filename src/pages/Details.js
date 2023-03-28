import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .request({
        method: "GET",
        url: `https://sekawanserver.vercel.app/restaurants/${id}`,
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [id]);
  return (
    <div className="w-full px-8">
      <div className="flex flex-row items-center mx-2 md:mx-8 mt-4 md:mt-12 gap-4">
        <button
          className="border-2 gap-4 hover:scale-105 duration-200 flex flex-row items-center rounded-md py-2 px-4"
          onClick={() => navigate("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          <h5>Back</h5>
        </button>
        {isLoading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="animate-spin h-6 w-6"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
          </svg>
        ) : null}
      </div>

      <div className="py-4 md:py-12 flex flex-col gap-2 px-4 md:px-20">
        <h1 className="text-4xl">{data?.name}</h1>
        <div className="flex flex-row gap-4 items-center text-stone-500">
          {data?.isOpen ? (
            <h5 className="w-20 flex justify-center bg-green-200 pointer-events-none py-1 px-4">
              Open
            </h5>
          ) : (
            <h5 className="w-20 flex justify-center bg-red-200 pointer-events-none py-1 px-4">
              Closed
            </h5>
          )}
          <h5>{data?.categories}</h5>
          <h5>{`Rp.${data?.minPrice} ~ Rp.${data?.maxPrice}`}</h5>
        </div>
        <div className="flex flex-row ">
          {data?.rating?.map((val, index) => {
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
      </div>
      <div className="flex flex-col lg:flex-row gap-4 w-full px-2 md:px-16">
        <img
          alt="Restaurant"
          src={`https://sekawanserver.vercel.app/${data?.image}`}
          className="w-full h-96"
        ></img>
        <iframe
          title="lokasi"
          className="w-full h-96"
          src={`${data?.map}`}
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div className="px-4 md:px-20 py-12">
        <h3>{data?.desc}</h3>
      </div>
    </div>
  );
};

export default Details;
