import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth_context";
import axios from "axios";
import { useArtistContext } from "../context/artist_context";
import SearchArtistCard from "../components/SearchArtistCard";

const HomePage = () => {
  const { isLoaded, token } = useAuthContext();
  const { artistName, artists, setArtistName, fetchArtists, setArtist } =
    useArtistContext();

  useEffect(() => {
    fetchArtists();
  }, [artistName]);

  if (!token && isLoaded) {
    console.log("nav from home to login");
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <div>
        <form>
          <label htmlFor="artist">Search for Artist: </label>
          <input
            type="text"
            id="artist"
            value={artistName}
            onChange={(e) => setArtistName(e)}
          ></input>
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
                  onClick={() => setArtist(artist)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
