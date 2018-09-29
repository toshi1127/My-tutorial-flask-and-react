import React from "react";
import styled, { keyframes } from "styled-components";
import { media } from "../utile/Helper";

const rotate360 = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
`;

export const LoadingContent = styled.p`
  width: 70px;
  height: 70px;
  border: 4px solid #00f;
  border-top-color: #fff;
  border-radius: 100%;
  animation: ${rotate360} 0.6s linear infinite;
  background-color: #fff;
  box-sizing: border-box;
`;

const Loading = () => (
  <LoadingContainer>
    <LoadingContent />
  </LoadingContainer>
);

export default Loading;
