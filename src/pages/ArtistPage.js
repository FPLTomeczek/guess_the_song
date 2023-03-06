import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useArtistContext } from "../context/artist_context";
import Album from "../components/Album";
import { useGameContext } from "../context/game_context";
import styled from "styled-components";

const ArtistPage = () => {
  const { id } = useParams();
  const { fetchArtistAlbums, artistAlbums } = useArtistContext();
  const { resetGame } = useGameContext();

  useEffect(() => {
    fetchArtistAlbums(id);
    resetGame();
  }, [id]);

  return (
    <Wrapper>
      <section className="section-center">
        <div className="albums">
          {artistAlbums &&
            artistAlbums.map((album) => {
              return <Album key={album.id} {...album} />;
            })}
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .albums {
    display: grid;
    column-gap: 2rem;
    row-gap: 2rem;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default ArtistPage;
