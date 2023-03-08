import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <section className="section-center">
        <div className="lds-ring" style={{ margin: " 0 auto" }}>
          <div></div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Loading;

const Wrapper = styled.div`
  .lds-ring {
    display: flex;
    justify-content: center;
  }
`;
