import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGameContext } from "../context/game_context";

const Album = ({ id, images, name, total_tracks }) => {
  const { setImagesAndName } = useGameContext();

  return (
    <Wrapper>
      <div className="singleAlbum" key={id}>
        <Link
          onClick={() => setImagesAndName(images, name)}
          to={`/player/${id}`}
        >
          <img src={images[1].url} alt="album cover" />
          <div className="desc">
            <h3>{name.length > 20 ? `${name.substring(0, 20)}...` : name}</h3>
            <h5>{total_tracks} tracks</h5>
          </div>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .singleAlbum {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #38502a;
    border-radius: 0.5rem;
    box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.2);
    opacity: 0.8;
    padding: 0 1rem;
  }
  .singleAlbum:hover {
    opacity: 1;
  }
  a {
    color: white;
    text-decoration: none;
  }
  .desc {
    display: flex;
    justify-content: space-between;
  }
  img {
    border-radius: 0.5rem;
    margin-top: 1rem;
  }
`;

export default Album;
