import React from "react";
import { Link } from "react-router-dom";
import PlayerPage from "../pages/PlayerPage";

const Album = ({ id, images, name, total_tracks }) => {
  return (
    <div key={id}>
      <Link to={`/player/${id}`}>
        <img src={images[1].url} alt="album cover" />
        <h3>{name}</h3>
        <h5>{total_tracks}</h5>
      </Link>
    </div>
  );
};

export default Album;
