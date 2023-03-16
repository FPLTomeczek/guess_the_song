import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useArtistContext } from "../context/artist_context";
import Album from "../components/Album";
import { useGameContext } from "../context/game_context";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { usePlayerContext } from "../context/player_context";
import Error from "../components/Error";

const AlbumsPage = () => {
  const { id } = useParams();
  const { fetchArtistAlbums, artistAlbums } = useArtistContext();
  const { resetGame } = useGameContext();
  const { soundStop } = usePlayerContext();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    fetchArtistAlbums(id);
    setLoaded(true);
    soundStop();
    resetGame();
  }, [id]);

  if (!loaded) {
    return <Loading />;
  }

  return (
    <main className="section-center">
      <Wrapper>
        <div className="btn-container">
          <Link className="btn" to="/">
            Return to Home Page
          </Link>
        </div>
        <div className={`${artistAlbums.length > 0 ? "albums" : "error"}`}>
          {artistAlbums.length > 0 ? (
            artistAlbums.map((album) => {
              return <Album key={album.id} {...album} />;
            })
          ) : (
            <Error type={"Albums"} />
          )}
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .albums {
    display: grid;
    column-gap: 2rem;
    row-gap: 2rem;
    grid-template-columns: 1fr 1fr 1fr;
    cursor: pointer;
    max-width: 1060px;
  }
  .error {
    text-align: center;
  }
  .btn-container {
    display: flex;
    justify-content: center;
  }
  @media (max-width: 1100px) {
    .albums {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 750px) {
    .albums {
      grid-template-columns: 1fr;
    }
    .btn {
      text-align: center;
    }
  }
`;

export default AlbumsPage;
