import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log("called me");
    fetch("http://localhost:4000/graphql?query=%7Bimages%7D", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "{ posts { title } }" }),
    })
      .then((res) => res.json())
      .then((res) => setImages(JSON.parse(res?.data.images)));
  }, []);

  const convertIdtoFormattedName = (id: string) => {
    return id
      ?.split("_")
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ");
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <h3 style={{ fontFamily: "montserrat" }}>Dog breeds</h3>
      <div
        style={{
          display: "grid",
          gridGap: "1px",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {images.map((dog) => (
          <Link to={`${dog.id}`} style={{ padding: 5, textDecoration: "none" }}>
            <div
              style={{
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "5px",
                padding: "10px",
                height: "160px",
                width: "160px",
                borderRadius: "5px",
                fontFamily: "montserrat",
                color: "black",
                textDecoration: "none",
              }}
            >
              {convertIdtoFormattedName(dog.id)}
            </div>
          </Link>
        ))}
        <Link to="/add" style={{ padding: 5, textDecoration: "none" }}>
          <div
            style={{
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "5px",
              padding: "10px",
              height: "160px",
              width: "160px",
              borderRadius: "5px",
            }}
          >
            +
          </div>
        </Link>
      </div>
    </div>
  );
};
