import React from "react";

const Error = ({ type }) => {
  console.log(type);
  return (
    <h1 style={{ textTransform: "uppercase" }}>
      No matched results for {type}
    </h1>
  );
};

export default Error;
