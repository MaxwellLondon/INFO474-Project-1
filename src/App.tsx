import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import spotifySongImport from "./spotifySongData.js";
import spotifyAlbumImport from "./spotifyAlbums.js";
import { AxisLeft, AxisBottom } from "@visx/axis";

function App() {
  const chartSize = 500;

  let spotifySongData = spotifySongImport[0].audio_features;

  let spotifyAlbumData: any = spotifyAlbumImport[0].albums;

  const danceabilityScale = d3.scaleLinear().domain([0, 1]).range([20, 480]);

  let tempoData: number[] = [];

  for (let i = 0; i < spotifySongData.length; i++) {
    tempoData.push(spotifySongData[i].tempo);
  }

  const spotifyBinGenerator = d3.bin().value((d: any) => d);

  const spotifyBins = spotifyBinGenerator(tempoData);

  //console.log(spotifyBins);

  let tempoScale: any = null;
  let tempoHeightScale: any = null;

  const _max: number | undefined = d3.max(tempoData);
  if (typeof _max === "number") {
    tempoScale = d3.scaleLinear().domain([0, _max]).range([20, 480]);
  }

  const _maxHeight: number | undefined = 48;
  if (typeof _maxHeight === "number") {
    tempoHeightScale = d3
      .scaleLinear()
      .domain([_maxHeight, 0])
      .range([40, 180]);
  }

  let speechinessDataKanye: number[] = [];
  let speechinessDataBowie: number[] = [];
  let speechinessDataPrince: number[] = [];

  for (let i = 0; i < spotifySongData.length; i++) {
    if (spotifySongData[i].artist === "Kanye West") {
      speechinessDataKanye.push(spotifySongData[i].speechiness);
    } else if (spotifySongData[i].artist === "David Bowie") {
      speechinessDataBowie.push(spotifySongData[i].speechiness);
    } else {
      speechinessDataPrince.push(spotifySongData[i].speechiness);
    }
  }

  //Kanye Stats
  const maxSpeechinessKanye: number | undefined = d3.max(speechinessDataKanye);
  const minSpeechinessKanye: number | undefined = d3.min(speechinessDataKanye);
  const medianSpeechinesKanye: number | undefined =
    d3.median(speechinessDataKanye);
  const lowerQSpeechinessKanye: number | undefined = d3.quantile(
    speechinessDataKanye,
    0.25
  );
  const upperQSpeechinessKanye: number | undefined = d3.quantile(
    speechinessDataKanye,
    0.75
  );

  const albumPhotosKanye: string[] | undefined = [];

  //Bowie Stats
  const maxSpeechinessBowie: number | undefined = d3.max(speechinessDataBowie);
  const minSpeechinessBowie: number | undefined = d3.min(speechinessDataBowie);
  const medianSpeechinesBowie: number | undefined =
    d3.median(speechinessDataBowie);
  const lowerQSpeechinessBowie: number | undefined = d3.quantile(
    speechinessDataBowie,
    0.25
  );
  const upperQSpeechinessBowie: number | undefined = d3.quantile(
    speechinessDataBowie,
    0.75
  );

  const albumPhotosBowie: string[] | undefined = [];

  //Prince Stats
  const maxSpeechinessPrince: number | undefined = d3.max(
    speechinessDataPrince
  );
  const minSpeechinessPrince: number | undefined = d3.min(
    speechinessDataPrince
  );
  const medianSpeechinesPrince: number | undefined = d3.median(
    speechinessDataPrince
  );
  const lowerQSpeechinessPrince: number | undefined = d3.quantile(
    speechinessDataPrince,
    0.25
  );
  const upperQSpeechinessPrince: number | undefined = d3.quantile(
    speechinessDataPrince,
    0.75
  );

  const albumPhotosPrince: string[] | undefined = [];

  for (let i = 0; i < spotifyAlbumData.length; i++) {
    if (spotifyAlbumData[i].artists[0].name === "David Bowie") {
      albumPhotosBowie.push(spotifyAlbumData[i].images[0].url);
    } else if (spotifyAlbumData[i].artists[0].name === "Prince") {
      albumPhotosPrince.push(spotifyAlbumData[i].images[0].url);
    } else {
      albumPhotosKanye.push(spotifyAlbumData[i].images[0].url);
    }
  }

  const [currentOpacity, setVisiblity] = useState<string | number | undefined>(
    1
  );

  const [currentArtist, setArtist] = useState<string | undefined>("Kanye West");

  const [currentOverlay, setOverlay] = useState<string | undefined>("None");
  const [currentOverlayColor, setOverlayColor] = useState<string | undefined>(
    "None"
  );

  const [currentOverlayOpacity, setOverlayOpacity] = useState<
    number | undefined
  >(1);

  const [currentAlbums, setCurrentAlbums] = useState<string[] | undefined>(
    albumPhotosKanye
  );

  function handleVizChange() {
    if (currentOpacity === 1) {
      setVisiblity(0);
    } else {
      setVisiblity(1);
    }
  }

  function handleAlbumsChange(artist: string) {
    if (artist === "Kanye West") {
      setCurrentAlbums(albumPhotosKanye);
    } else if (artist === "Prince") {
      setCurrentAlbums(albumPhotosPrince);
    } else if (artist === "David Bowie") {
      setCurrentAlbums(albumPhotosBowie);
    } else {
    }
  }

  function handleArtistChange(event: any) {
    handleOverlayChange(event);
    setArtist(event.target.value);
    handleAlbumsChange(event.target.value);
  }

  function handleOverlayChange(event: any) {
    if (event.target.value === "Kanye West") {
      setOverlay("Kanye West");
      setOverlayColor("rgba(220,0,0,0.3)");
    } else if (event.target.value === "Prince") {
      setOverlay("Prince");
      setOverlayColor("rgba(58,35,62,0.3)");
    } else if (event.target.value === "David Bowie") {
      setOverlay("David Bowie");
      setOverlayColor("rgba(0,220,0,0.4)");
    } else {
      setOverlay("None");
      setOverlayColor("None");
    }
  }

  //currentOverlayOpacity
  function handleOpacityChange(event: any) {
    setOverlayOpacity(event.target.value);
  }

  const opacityScale = d3.scaleLinear().domain([0, 1]).range([0, 100]);

  //const slider: any = sliderBottom.min(0).max(10).step(1).width(300);

  return (
    <div className="app">
      <h1 style={{ textAlign: "center" }}>Spotify Data Dashboard</h1>
      <h3 style={{ textAlign: "center" }}>Spotify Genre</h3>
      <svg
        width={chartSize}
        height={chartSize}
        opacity={currentOpacity}
        onClick={() => handleVizChange()}
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
      </svg>

      <menu style={{ textAlign: "center" }}>
        <label style={{ textAlign: "center" }}>Select Artist: </label>

        <select name="Artist" onChange={(event) => handleArtistChange(event)}>
          <option value="Kanye West">Kanye West</option>
          <option value="David Bowie">David Bowie</option>
          <option value="Prince">Prince</option>
        </select>

        <label style={{ marginLeft: "10px" }}>Select Artist Overlay: </label>

        <select
          name="Artist"
          onChange={(event) => handleOverlayChange(event)}
          style={{ margin: "auto" }}
        >
          <option value="None">None</option>
          <option value="Kanye West">Kanye West</option>
          <option value="David Bowie">David Bowie</option>
          <option value="Prince">Prince</option>
        </select>

        <label style={{ marginLeft: "10px" }}>Adjust Overlay Opacity: </label>

        <input
          onChange={(event) => handleOpacityChange(event)}
          type="range"
          id="points"
          name="points"
          min="0"
          max="1"
          step="0.1"
        ></input>
      </menu>
      <div
        style={{ textAlign: "center", fontSize: "140%", marginBottom: "15px" }}
      >
        Current Albums
      </div>
      <svg
        width="500"
        height="100"
        style={{
          border: "1px solid black",
          display: "block",
          margin: "auto",
        }}
      >
        {currentAlbums &&
          currentAlbums.map((url, i) => {
            return (
              <image href={url} height={100} width={100} x={i * 100} y={0} />
            );
          })}
      </svg>

      <svg
        width="500"
        height="100"
        visibility={currentArtist === "Kanye West" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "Kanye West" ? "block" : "none",
          margin: "auto",
        }}
      >
        <foreignObject x="0" y="20" width="500" height="200">
          <text x={0} y={20}>
            This is a barcode plot of Kanye Wests' Songs Danceability. Here you
            can see that most of Kanye West's songs fall between 0.6-0.8.
          </text>
        </foreignObject>
      </svg>
      <svg
        width="500"
        height="200"
        visibility={currentArtist === "Kanye West" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "Kanye West" ? "block" : "none",
          margin: "auto",
        }}
      >
        {spotifySongData.map((song, i) => {
          if (song.artist === "Kanye West") {
            return (
              <line
                x1={song.danceability * 460 + 20}
                x2={song.danceability * 460 + 20}
                y1={20}
                y2={150}
                style={{ stroke: "rgba(220,0,0,0.3)" }}
              />
            );
          }
        })}

        {spotifySongData.map((song, i) => {
          if (song.artist === currentOverlay) {
            return (
              <line
                x1={song.danceability * 460 + 20}
                x2={song.danceability * 460 + 20}
                y1={20}
                y2={150}
                style={{ stroke: currentOverlayColor }}
                opacity={currentOverlayOpacity}
              />
            );
          }
        })}
        <AxisBottom
          strokeWidth={1}
          top={200 - 20 - 20}
          scale={danceabilityScale}
          numTicks={7}
        />
        <text x={5} y={15}>
          Kanye West Danceability
        </text>
      </svg>
      <svg
        width="500"
        height="100"
        visibility={currentArtist === "David Bowie" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "David Bowie" ? "block" : "none",
          margin: "auto",
        }}
      >
        <foreignObject x="0" y="20" width="500" height="200">
          <text x={0} y={20}>
            This is a barcode plot of David Bowie's Songs Danceability. Here you
            can see most of David Bowies songs fall between 0.4-0.6
          </text>
        </foreignObject>
      </svg>
      <svg
        width="500"
        height="200"
        visibility={currentArtist === "David Bowie" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "David Bowie" ? "block" : "none",
          margin: "auto",
        }}
      >
        {spotifySongData.map((song, i) => {
          if (song.artist === "David Bowie") {
            return (
              <line
                x1={song.danceability * 460 + 20}
                x2={song.danceability * 460 + 20}
                y1={20}
                y2={150}
                style={{ stroke: "rgba(0,220,0,0.4)" }}
              />
            );
          }
        })}

        {spotifySongData.map((song, i) => {
          if (song.artist === currentOverlay) {
            return (
              <line
                x1={song.danceability * 460 + 20}
                x2={song.danceability * 460 + 20}
                y1={20}
                y2={150}
                style={{ stroke: currentOverlayColor }}
                opacity={currentOverlayOpacity}
              />
            );
          }
        })}
        <AxisBottom
          strokeWidth={1}
          top={200 - 20 - 20}
          scale={danceabilityScale}
          numTicks={7}
        />
        <text x={5} y={15}>
          David Bowie Danceability
        </text>
      </svg>
      <svg
        width="500"
        height="100"
        visibility={currentArtist === "Prince" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "Prince" ? "block" : "none",
          margin: "auto",
        }}
      >
        <foreignObject x="0" y="20" width="500" height="200">
          <text x={0} y={20}>
            This is a barcode plot of Prince's Songs Danceability. Here you can
            see most of princes song fall between 0.65-0.85
          </text>
        </foreignObject>
      </svg>
      <svg
        width="500"
        height="200"
        visibility={currentArtist === "Prince" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "Prince" ? "block" : "none",
          margin: "auto",
        }}
      >
        {spotifySongData.map((song, i) => {
          if (song.artist === "Prince") {
            return (
              <line
                x1={song.danceability * 460 + 20}
                x2={song.danceability * 460 + 20}
                y1={20}
                y2={150}
                style={{ stroke: "rgba(48,25,52, 0.3)" }}
              />
            );
          }
        })}

        {spotifySongData.map((song, i) => {
          if (song.artist === currentOverlay) {
            return (
              <line
                x1={song.danceability * 460 + 20}
                x2={song.danceability * 460 + 20}
                y1={20}
                y2={150}
                style={{ stroke: currentOverlayColor }}
                opacity={currentOverlayOpacity}
              />
            );
          }
        })}
        <AxisBottom
          strokeWidth={1}
          top={200 - 20 - 20}
          scale={danceabilityScale}
          numTicks={7}
        />
        <text x={5} y={15}>
          Prince Danceability
        </text>
      </svg>
      <svg
        width="500"
        height="100"
        visibility={currentArtist === "Kanye West" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "Kanye West" ? "block" : "none",
          margin: "auto",
        }}
      >
        <foreignObject x="0" y="20" width="500" height="200">
          <text x={0} y={20}>
            This is a jittered strip plot of Kanye West's Energy. Kanye
            typically has an energy of 0.5 and above
          </text>
        </foreignObject>
      </svg>
      <svg
        width="500"
        height="200"
        visibility={currentArtist === "Kanye West" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "Kanye West" ? "block" : "none",
          margin: "auto",
        }}
      >
        {spotifySongData.map((song, i) => {
          if (song.artist === "Kanye West") {
            return (
              <circle
                cx={danceabilityScale(song.energy)}
                cy={Math.random() * (150 - 20) + 20}
                r={4}
                style={{ stroke: "rgba(220,0,0,0.3)", fill: "none" }}
              />
            );
          }
        })}

        {spotifySongData.map((song, i) => {
          if (song.artist === currentOverlay) {
            return (
              <circle
                cx={danceabilityScale(song.energy)}
                cy={Math.random() * (150 - 20) + 20}
                r={4}
                style={{ stroke: currentOverlayColor, fill: "none" }}
                opacity={currentOverlayOpacity}
              />
            );
          }
        })}

        <AxisBottom
          strokeWidth={1}
          top={200 - 20 - 20}
          scale={danceabilityScale}
          numTicks={7}
        />
        <text x={5} y={15}>
          Kanye West Energy
        </text>
      </svg>
      <svg
        width="500"
        height="100"
        visibility={currentArtist === "David Bowie" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "David Bowie" ? "block" : "none",
          margin: "auto",
        }}
      >
        <foreignObject x="0" y="20" width="500" height="200">
          <text x={0} y={20}>
            This is a jittered strip plot of David Bowies Energy. Bowies songs
            are very diverse and have a wide range of energy
          </text>
        </foreignObject>
      </svg>
      <svg
        width="500"
        height="200"
        visibility={currentArtist === "David Bowie" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "David Bowie" ? "block" : "none",
          margin: "auto",
        }}
      >
        {spotifySongData.map((song, i) => {
          if (song.artist === "David Bowie") {
            return (
              <circle
                cx={danceabilityScale(song.energy)}
                cy={Math.random() * (150 - 20) + 20}
                r={4}
                style={{ stroke: "rgba(0,220,0,0.4)", fill: "none" }}
              />
            );
          }
        })}

        {spotifySongData.map((song, i) => {
          if (song.artist === currentOverlay) {
            return (
              <circle
                cx={danceabilityScale(song.energy)}
                cy={Math.random() * (150 - 20) + 20}
                r={4}
                style={{ stroke: currentOverlayColor, fill: "none" }}
                opacity={currentOverlayOpacity}
              />
            );
          }
        })}
        <AxisBottom
          strokeWidth={1}
          top={200 - 20 - 20}
          scale={danceabilityScale}
          numTicks={7}
        />
        <text x={5} y={15}>
          David Bowie Energy
        </text>
      </svg>
      <svg
        width="500"
        height="100"
        visibility={currentArtist === "Prince" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "Prince" ? "block" : "none",
          margin: "auto",
        }}
      >
        <foreignObject x="0" y="20" width="500" height="200">
          <text x={0} y={20}>
            This is a jittered strip plot of Princes Energy. Most of princes
            songs are somewhat around 0.5
          </text>
        </foreignObject>
      </svg>
      <svg
        width="500"
        height="200"
        visibility={currentArtist === "Prince" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "Prince" ? "block" : "none",
          margin: "auto",
        }}
      >
        {spotifySongData.map((song, i) => {
          if (song.artist === "Prince") {
            return (
              <circle
                cx={danceabilityScale(song.energy)}
                cy={Math.random() * (150 - 20) + 20}
                r={4}
                style={{ stroke: "rgba(48,25,52,0.3)", fill: "none" }}
              />
            );
          }
        })}

        {spotifySongData.map((song, i) => {
          if (song.artist === currentOverlay) {
            return (
              <circle
                cx={danceabilityScale(song.energy)}
                cy={Math.random() * (150 - 20) + 20}
                r={4}
                style={{ stroke: currentOverlayColor, fill: "none" }}
                opacity={currentOverlayOpacity}
              />
            );
          }
        })}
        <AxisBottom
          strokeWidth={1}
          top={200 - 20 - 20}
          scale={danceabilityScale}
          numTicks={7}
        />
        <text x={5} y={15}>
          Prince Energy
        </text>
      </svg>

      <svg
        width="500"
        height="100"
        visibility={currentArtist === "Kanye West" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "Kanye West" ? "block" : "none",
          margin: "auto",
        }}
      >
        <foreignObject x="0" y="20" width="500" height="200">
          <text x={0} y={20}>
            This is a box and whisker plot of Kanye West's Speechiness. Here we
            can see the min, max, first and third quantiles, and the median of
            Kanyes Speechiness. The high values likely come from skits found on
            albums
          </text>
        </foreignObject>
      </svg>
      <svg
        width="500"
        height="200"
        visibility={currentArtist === "Kanye West" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "Kanye West" ? "block" : "none",
          margin: "auto",
        }}
      >
        <text x={5} y={15}>
          Kanye West Speechiness
        </text>
        <AxisBottom
          strokeWidth={1}
          top={200 - 20 - 20}
          scale={danceabilityScale}
          numTicks={7}
        />

        {minSpeechinessKanye && maxSpeechinessKanye && (
          <line
            x1={20 + minSpeechinessKanye * 460}
            y1={100}
            x2={20 + maxSpeechinessKanye * 460}
            y2={100}
            stroke="black"
          />
        )}

        {minSpeechinessKanye && (
          <line
            x1={20 + minSpeechinessKanye * 460}
            y1={95}
            x2={20 + minSpeechinessKanye * 460}
            y2={105}
            stroke="black"
          />
        )}

        {maxSpeechinessKanye && (
          <line
            x1={20 + maxSpeechinessKanye * 460}
            y1={95}
            x2={20 + maxSpeechinessKanye * 460}
            y2={105}
            stroke="black"
          />
        )}

        {lowerQSpeechinessKanye && (
          <line
            x1={20 + lowerQSpeechinessKanye * 460}
            y1={80}
            x2={20 + lowerQSpeechinessKanye * 460}
            y2={120}
            stroke="black"
          />
        )}

        {upperQSpeechinessKanye && (
          <line
            x1={20 + upperQSpeechinessKanye * 460}
            y1={80}
            x2={20 + upperQSpeechinessKanye * 460}
            y2={120}
            stroke="black"
          />
        )}

        {medianSpeechinesKanye && (
          <line
            x1={20 + medianSpeechinesKanye * 460}
            y1={80}
            x2={20 + medianSpeechinesKanye * 460}
            y2={120}
            stroke="black"
          />
        )}

        {lowerQSpeechinessKanye && upperQSpeechinessKanye && (
          <line
            x1={20 + lowerQSpeechinessKanye * 460}
            y1={120}
            x2={20 + upperQSpeechinessKanye * 460}
            y2={120}
            stroke="black"
          />
        )}

        {lowerQSpeechinessKanye && upperQSpeechinessKanye && (
          <line
            x1={20 + lowerQSpeechinessKanye * 460}
            y1={80}
            x2={20 + upperQSpeechinessKanye * 460}
            y2={80}
            stroke="black"
          />
        )}
      </svg>
      <svg
        width="500"
        height="100"
        visibility={currentArtist === "David Bowie" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "David Bowie" ? "block" : "none",
          margin: "auto",
        }}
      >
        <foreignObject x="0" y="20" width="500" height="200">
          <text x={0} y={20}>
            This is a box and whisker plot of David Bowie's Speechiness. David
            bowies songs are typically not very speechy.
          </text>
        </foreignObject>
      </svg>
      <svg
        width="500"
        height="200"
        visibility={currentArtist === "David Bowie" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "David Bowie" ? "block" : "none",
          margin: "auto",
        }}
      >
        <text x={5} y={15}>
          David Bowie Speechiness
        </text>
        <AxisBottom
          strokeWidth={1}
          top={200 - 20 - 20}
          scale={danceabilityScale}
          numTicks={7}
        />

        {minSpeechinessBowie && maxSpeechinessBowie && (
          <line
            x1={20 + minSpeechinessBowie * 460}
            y1={100}
            x2={20 + maxSpeechinessBowie * 460}
            y2={100}
            stroke="black"
          />
        )}

        {minSpeechinessBowie && (
          <line
            x1={20 + minSpeechinessBowie * 460}
            y1={95}
            x2={20 + minSpeechinessBowie * 460}
            y2={105}
            stroke="black"
          />
        )}

        {maxSpeechinessBowie && (
          <line
            x1={20 + maxSpeechinessBowie * 460}
            y1={95}
            x2={20 + maxSpeechinessBowie * 460}
            y2={105}
            stroke="black"
          />
        )}

        {lowerQSpeechinessBowie && (
          <line
            x1={20 + lowerQSpeechinessBowie * 460}
            y1={80}
            x2={20 + lowerQSpeechinessBowie * 460}
            y2={120}
            stroke="black"
          />
        )}

        {upperQSpeechinessBowie && (
          <line
            x1={20 + upperQSpeechinessBowie * 460}
            y1={80}
            x2={20 + upperQSpeechinessBowie * 460}
            y2={120}
            stroke="black"
          />
        )}

        {medianSpeechinesBowie && (
          <line
            x1={20 + medianSpeechinesBowie * 460}
            y1={80}
            x2={20 + medianSpeechinesBowie * 460}
            y2={120}
            stroke="black"
          />
        )}

        {lowerQSpeechinessBowie && upperQSpeechinessBowie && (
          <line
            x1={20 + lowerQSpeechinessBowie * 460}
            y1={120}
            x2={20 + upperQSpeechinessBowie * 460}
            y2={120}
            stroke="black"
          />
        )}

        {lowerQSpeechinessBowie && upperQSpeechinessBowie && (
          <line
            x1={20 + lowerQSpeechinessBowie * 460}
            y1={80}
            x2={20 + upperQSpeechinessBowie * 460}
            y2={80}
            stroke="black"
          />
        )}
      </svg>
      <svg
        width="500"
        height="100"
        visibility={currentArtist === "Prince" ? "visible" : "hidden"}
        style={{
          border: "1px solid black",
          display: currentArtist === "Prince" ? "block" : "none",
          margin: "auto",
        }}
      >
        <foreignObject x="0" y="20" width="500" height="200">
          <text x={0} y={20}>
            This is a box and whisker plot of Prince's Speechiness. Similar to
            Bowie, Princes songs are not very speechy.
          </text>
        </foreignObject>
      </svg>
      <svg
        width="500"
        height="200"
        style={{
          border: "1px solid black",
          display: currentArtist === "Prince" ? "block" : "none",
          margin: "auto",
        }}
      >
        <text x={5} y={15}>
          Prince Speechiness
        </text>
        <AxisBottom
          strokeWidth={1}
          top={200 - 20 - 20}
          scale={danceabilityScale}
          numTicks={7}
        />

        {minSpeechinessPrince && maxSpeechinessPrince && (
          <line
            x1={20 + minSpeechinessPrince * 460}
            y1={100}
            x2={20 + maxSpeechinessPrince * 460}
            y2={100}
            stroke="black"
          />
        )}

        {minSpeechinessPrince && (
          <line
            x1={20 + minSpeechinessPrince * 460}
            y1={95}
            x2={20 + minSpeechinessPrince * 460}
            y2={105}
            stroke="black"
          />
        )}

        {maxSpeechinessPrince && (
          <line
            x1={20 + maxSpeechinessPrince * 460}
            y1={95}
            x2={20 + maxSpeechinessPrince * 460}
            y2={105}
            stroke="black"
          />
        )}

        {lowerQSpeechinessPrince && (
          <line
            x1={20 + lowerQSpeechinessPrince * 460}
            y1={80}
            x2={20 + lowerQSpeechinessPrince * 460}
            y2={120}
            stroke="black"
          />
        )}

        {upperQSpeechinessPrince && (
          <line
            x1={20 + upperQSpeechinessPrince * 460}
            y1={80}
            x2={20 + upperQSpeechinessPrince * 460}
            y2={120}
            stroke="black"
          />
        )}

        {medianSpeechinesPrince && (
          <line
            x1={20 + medianSpeechinesPrince * 460}
            y1={80}
            x2={20 + medianSpeechinesPrince * 460}
            y2={120}
            stroke="black"
          />
        )}

        {lowerQSpeechinessPrince && upperQSpeechinessPrince && (
          <line
            x1={20 + lowerQSpeechinessPrince * 460}
            y1={120}
            x2={20 + upperQSpeechinessPrince * 460}
            y2={120}
            stroke="black"
          />
        )}

        {lowerQSpeechinessPrince && upperQSpeechinessPrince && (
          <line
            x1={20 + lowerQSpeechinessPrince * 460}
            y1={80}
            x2={20 + upperQSpeechinessPrince * 460}
            y2={80}
            stroke="black"
          />
        )}
      </svg>
      <svg
        width="500"
        height="100"
        style={{ border: "1px solid black", display: "block", margin: "auto" }}
      >
        <foreignObject x="0" y="20" width="500" height="200">
          <text x={0} y={20}>
            This is a Histogram of all three artists song tempo. Here we can see
            which tempos are most common between all three artists
          </text>
        </foreignObject>
      </svg>
      <svg
        width="500"
        height="200"
        style={{ border: "1px solid black", display: "block", margin: "auto" }}
      >
        <text x={5} y={15}>
          Histogram of song tempo from Kanye, Bowie and Prince
        </text>
        {spotifyBins.map((value, i) => {
          return (
            <rect
              key={i}
              x={tempoScale && tempoScale(value.x0) - 45}
              y={200 - value.length - 25}
              width={45}
              height={value.length}
              style={{
                fill: "steelblue",
                strokeWidth: "0",
                stroke: "rgb(0,0,0)",
                border: "clear",
              }}
            />
          );
        })}

        {tempoScale && (
          <AxisBottom
            strokeWidth={1}
            top={200 - 25}
            scale={tempoScale}
            numTicks={9}
          />
        )}

        {tempoHeightScale && (
          <AxisLeft strokeWidth={0} left={25} scale={tempoHeightScale} />
        )}
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
