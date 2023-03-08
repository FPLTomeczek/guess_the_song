import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth_context";
import { useArtistContext } from "../context/artist_context";
import SearchArtistCard from "../components/SearchArtistCard";
import styled from "styled-components";
// import { debounce } from "lodash";
import { DebounceInput } from "react-debounce-input";

const HomePage = () => {
  const { isLoaded, token } = useAuthContext();
  const { artistName, artists, setArtistName, fetchArtists } =
    useArtistContext();

  useEffect(() => {
    fetchArtists();
  }, [artistName]);

  if (!token && isLoaded) {
    console.log("nav from home to login");
    return <Navigate to="/login" />;
  }
  return (
    <section className="section-center">
      <Wrapper>
        <form className="search-artist-form">
          <DebounceInput
            type="text"
            id="artist"
            className="artist-input"
            value={artistName}
            placeholder="Enter artist name"
            onChange={(e) => setArtistName(e)}
            debounceTimeout={300}
          ></DebounceInput>
        </form>
        <div>
          {artists &&
            artists.map((artist) => {
              const { name, images, id } = artist;
              return (
                <SearchArtistCard
                  name={name}
                  image={images[2]}
                  id={id}
                  key={id}
                />
              );
            })}
        </div>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .artist-input {
    border: none;
    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #f2f2f2;
    border-radius: 3px;
    padding: 1rem;
    width: 500px;
    outline: none;
    font-size: 1.2rem;
  }
`;
export default HomePage;
