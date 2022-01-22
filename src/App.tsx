import { useState, useEffect } from "react";
import * as d3 from "d3";
import spotifyJSON from "./spotifyJSON.js";

function App() {
  const [count, setCount] = useState(0);

  const chartSize = 500;

  let popularityValues = [];
  let danceabilityValues = [];

  for (let i = 0; i < spotifyJSON.length - 15000; i++) {
    popularityValues.push(spotifyJSON[i].popularity);
    danceabilityValues.push(spotifyJSON[i].danceability);
  }

  console.log(danceabilityValues);
  return (
    <div className="app">
      <h1 style={{ textAlign: "center" }}>Spotify Data Dashboard</h1>
      <h3 style={{ textAlign: "center" }}>Spotify Genre</h3>

      <svg
        width={chartSize}
        height={chartSize}
        style={{
          border: "2px solid black",
          display: "block",
          margin: "auto",
        }}
      >
        <text x={15} y={492}>
          Danceability
        </text>
        {[475, 375, 275, 175, 75].map((num, i) => {
          return <line x1={0} y1={num} x2={500} y2={num} stroke="gray" />;
        })}

        {[400, 300, 200, 100].map((num, i) => {
          return <line x1={num} y1={0} x2={num} y2={475} stroke="gray" />;
        })}

        {[400, 300, 200, 100].map((num, i) => {
          return (
            <text x={10} y={470 - num}>
              {num / 4}
            </text>
          );
        })}

        {[400, 300, 200, 100].map((num, i) => {
          return (
            <text x={num - 27} y={470}>
              {num / 500}
            </text>
          );
        })}

        <text x={30} y={515} transform={`rotate(-90, 0, 500)`}>
          Popularity
        </text>

        {popularityValues.map((songPopularity, i) => {
          console.log("hello");
          return (
            <circle
              cx={danceabilityValues[i] * 500}
              cy={songPopularity * 5}
              r="2"
              fill="#1DB954"
              strokeWidth="3"
              opacity="0.35"
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

/* {[5, 20, 30, 50].map((num, i) => {
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

        */
