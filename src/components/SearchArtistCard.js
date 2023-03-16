import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useArtistContext } from "../context/artist_context";
import questionMark from "../img/question-mark.png";

const SearchArtistCard = ({ name, image, id, index }) => {
  const { setArtistID } = useArtistContext();

  const handleClick = () => {
    setArtistID(id);
  };

  return (
    <Wrapper>
      <Link className="artistCard" to={`/artist/${id}`}>
        <div
          onClick={handleClick}
          className="searchResult"
          data-test={`artist-card-${index}`}
        >
          <img
            src={image ? image.url : questionMark}
            style={{ height: "80px", width: "80px" }}
            alt="artist"
          />
          <h4 className="name">{name}</h4>
        </div>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .searchResult {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 1rem;
    background-color: #38502a;
    margin-top: 1rem;
    border-radius: 0.5rem;
    width: 500px;
    opacity: 0.85;
  }
  .searchResult:hover {
    opacity: 1;
  }
  .name {
    margin-left: 2rem;
  }
  img {
    border-radius: 50%;
  }
  @media (max-width: 800px) {
    .searchResult {
      box-sizing: border-box;
      width: 100%;
    }
  }
`;
export default SearchArtistCard;
