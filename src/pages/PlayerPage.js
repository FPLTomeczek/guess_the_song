import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useArtistContext } from "../context/artist_context";

const PlayerPage = () => {
  const { id } = useParams();
  const { albumTracks, fetchAlbumTracks } = useArtistContext();

  useEffect(() => {
    fetchAlbumTracks(id);
  }, []);
  return <div>PlayerPage</div>;
};

export default PlayerPage;
