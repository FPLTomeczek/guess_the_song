import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Album = ({ id, images, name, total_tracks }) => {
  return (
    <Wrapper>
      <div className="singleAlbum" key={id}>
        <Link to={`/player/${id}`} state={{ from: images }}>
          <img src={images[1].url} alt="album cover" />
          <div className="desc">
            <h3>{name.length > 25 ? `${name.substring(0, 25)}...` : name}</h3>
            <h5>{total_tracks} tracks</h5>
          </div>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .singleAlbum {
    display: grid;
    align-items: center;
    justify-content: center;
    background-color: #0c1d5a;
    border-radius: 0.5rem;
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
