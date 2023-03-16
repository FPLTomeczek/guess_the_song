import React, { useEffect, useState } from "react";
import { useArtistContext } from "../context/artist_context";
import SearchArtistCard from "../components/SearchArtistCard";
import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import Error from "../components/Error";
import Loading from "../components/Loading";

const HomePage = () => {
  const { artistName, artists, setArtistName, fetchArtists } =
    useArtistContext();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    fetchArtists();
    setIsLoaded(true);
  }, [artistName]);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <section className="section-center">
      <Wrapper>
        <div className="input-and-results">
          <form className="search-artist-form">
            <DebounceInput
              type="text"
              id="artist"
              className="artist-input"
              value={artistName}
              placeholder="Enter artist name"
              onChange={(e) => setArtistName(e)}
              debounceTimeout={300}
              data-test="artist-input"
            ></DebounceInput>
          </form>
          <div>
            {artists.length > 0 ? (
              artists.map((artist, index) => {
                const { name, images, id } = artist;
                return (
                  <SearchArtistCard
                    name={name}
                    image={images[2]}
                    id={id}
                    key={id}
                    index={index}
                  />
                );
              })
            ) : artistName && isLoaded ? (
              <Error type="artist" />
            ) : null}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  .input-and-results {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
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
  @media (max-width: 800px) {
    .artist-input {
      width: fit-content;
    }
  }
`;
export default HomePage;
