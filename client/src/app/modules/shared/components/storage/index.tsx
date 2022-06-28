import React from 'react';
import { Container, Progress, Text, TextInfo } from './styles';

export interface StoraDetails {
  total: number;
  used: number;
}

const Storage: React.FC<StoraDetails> = (props) => {
  const getPercentage = (used: number, total: number) => {
    return ((used / total) * 100).toFixed(2) + '%';
  };

  return (
    <Container>
      <Text>Armazenamento ({getPercentage(props.used, props.total)})</Text>
      <Progress progress={getPercentage(props.used, props.total)} />
      <TextInfo>
        {props.used} de {props.total}
      </TextInfo>
    </Container>
  );
};

export { Storage };
