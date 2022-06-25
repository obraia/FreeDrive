import { lighten } from "polished";
import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  0% { top: calc(100% - 60px); }
  100% {  top: calc(50% - 60px); }
`;

export const Container = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: calc(50% - 15%);
  top: calc(50% - 60px);
  padding: 20px 40px;
  gap: 10px;
  border-radius: ${({ theme }) => theme.metrics.radius};
  background-color: ${({ theme }) => lighten(0.8, theme.colors.background)};
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  pointer-events: none;
  animation: ${slideUp} 0.3s ease-in-out;
  z-index: 3;
`;
