import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/auth_context";
import { ArtistProvider } from "./context/artist_context";
import { GameProvider } from "./context/game_context";
import { PlayerProvider } from "./context/player_context";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <ArtistProvider>
        <GameProvider>
          <PlayerProvider>
            <App />
          </PlayerProvider>
        </GameProvider>
      </ArtistProvider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
