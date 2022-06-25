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

  const convertMBtoGB = (mb: number) => {
    return (mb / 1024).toFixed(2) + ' GB';
  };

  return (
    <Container>
      <Text>Armazenamento ({getPercentage(props.used, props.total)})</Text>
      <Progress progress={getPercentage(props.used, props.total)} />
      <TextInfo>
        {convertMBtoGB(props.used)} de {convertMBtoGB(props.total)}
      </TextInfo>
    </Container>
  );
};

export { Storage };
