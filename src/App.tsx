import { useState, useEffect } from "react";
import { scaleLinear, scaleBand, extent, line, symbol, csv } from "d3";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);

  const user = { name: "Colin", city: "Seattle" };

  const chartSize = 500;

  const [token, setToken] = useState("");

  const clientID = "8d8311a5f1e8418a8fdcaf041cee47e2";
  const clientSecret = "cef79cfec6034fc0866a18576f6d233b";

  // axios("https://accounts.spotify.com/api/token", {
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     Authorization: "Basic " + btoa(clientID + ":" + clientSecret),
  //   },
  //   data: "grant_type=client_credentials",
  //   method: "POST",
  // }).then((tokenResponse) => {
  //   console.log(tokenResponse.data.access_token);
  //   setToken(tokenResponse.data.access_token);
  // }, []);

  csv(
    "https://gist.githubusercontent.com/colinmegill/6c405856837dea7f978f337ef864d50e/raw/c0b158814885814c6b1a2cb36202b6577c9ad95d/census.csv",
    (data: never, a: never) => {
      console.log(data);
    }
  );

  return (
    <div className="app">
      <h1 style={{ textAlign: "center" }}>Spotify Data Dashboard</h1>
      <h3 style={{ textAlign: "center" }}>Spotify Genre</h3>

      <svg
        width={chartSize}
        height={chartSize}
        style={{ border: "2px solid black" }}
      >
        {[5, 20, 30, 50].map((num, i) => {
          console.log("the number in position" + i + " is" + num);
          return (
            <circle cx={50 + i * 100} cy={100} r={num} fill={`rgb(255,0,0)`} />
          );
        })}
        {[5, 20, 30, 50, 60].map((num, i) => {
          console.log("the number in position" + i + " is" + num);
          const rectWidth = 40;
          return (
            <rect
              transform={`rotate(${num}, ${
                rectWidth / 2 + 30 + i * 120
              }, ${200})`}
              x={30 + i * 120}
              y={200}
              width={rectWidth}
              height={10}
              fill={`rgb(${num * 4}, ${num * 4}, ${num * 4})`}
            />
          );
        })}
        <text x={180} y={525} transform={`rotate(-90, 0, 500)`}>
          Minutes Listened
        </text>
        <text x={100} y={492}>
          Top 5 most played songs on Spotify
        </text>
        //<path d="M 50 50"></path>
        {[10, 20, 30, 40, 50].map((num, i) => {
          console.log(i + "This is working");
          return (
            <line
              x1={num * 8}
              y1={475}
              x2={num * 8}
              y2={475 - num * 4}
              stroke="#1DB954"
              strokeWidth={50}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default App;

/*

json: java script object notation
.js "Normal" javascript file
.jsx react based format for defining components, a function that returns markup

These will only appear if you've run the react-ts vite

.ts "normal" javascript file, except typescript
.tsx is a .jsx file, but in typescript




*/

/*
<circle
          cx="50"
          cy="50"
          r="5"
          fill="red"
          //stroke = "red" 
          strokeWidth="21"
        />
         <circle
          cx="200"
          cy="200"
          r="5"
          fill="green"
          //stroke = "green" 
          strokeWidth="21"
        />
        <line x1={50}
          y1={50}
          x2={200}
          y2={200}
          stroke="black"
        />
        {[10, 100, 250, 350].map((d) => {
            return <circle cx = {d} cy = {d} r = "5" fill="red"/>
        })}
*/
