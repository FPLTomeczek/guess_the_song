import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SearchArtistCard = ({ name, image, id }) => {
  return (
    <Wrapper>
      <Link
        className="artistCard"
        onClick={() => console.log("click")}
        to={`/artist/${id}`}
      >
        <img
          src={image.url}
          style={{ height: "40px", width: "40px" }}
          alt="artist"
        />
        <h5>{name}</h5>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .artistCard {
    display: flex;
    cursor: pointer;
  }
`;
export default SearchArtistCard;
