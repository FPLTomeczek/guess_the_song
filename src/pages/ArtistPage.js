import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useArtistContext } from "../context/artist_context";
import Album from "../components/Album";

const ArtistPage = () => {
  const { id } = useParams();
  const { fetchArtistAlbums, artistAlbums } = useArtistContext();

  useEffect(() => {
    fetchArtistAlbums(id);
  }, [id]);

  return (
    <div>
      {artistAlbums &&
        artistAlbums.map((album) => {
          return <Album key={album.id} {...album} />;
        })}
    </div>
  );
};

export default ArtistPage;
