import styled from "styled-components";
import { keyframes } from "styled-components";

const dotAnimation = keyframes`
  0% {
    opacity: 0.1;
  }
  100%{
    opacity: 0.5;
  } 
`;

const spin = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.7;
    transform: translate(-50%, -50%) rotate(1turn);
  }
`;

const LoadingCycle = styled.div`
  border: 10px solid gray;
  border-right-color: transparent;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${spin} 3s linear infinite;
`;

const LoadingText = styled.h2`
  color: black;
  margin: 0;
  text-transform: capitalize;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;

  &:before,
  &:after {
    content: "..";
    position: absolute;
    animation: ${dotAnimation} 1s linear infinite alternate;
  }

  &:before {
    right: -15px;
  }
  &:after {
    right: -20px;
    animation-delay: 1s;
  }
`;

function Loading(props) {
  return (
    <>
      <LoadingText>{props.progress} %</LoadingText>
      <LoadingCycle></LoadingCycle>
    </>
  );
}

export default Loading;
