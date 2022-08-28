import React from 'react';
import ReactTooltip from 'react-tooltip';

import { Container } from './styles';

interface Props {
  children: React.ReactNode;
  descricao: string;
  cor: string;
  onClick: () => void;
}

const BotaoAcao: React.FC<Props> = (props) => {
  return (
    <Container onClick={props.onClick} cor={props.cor} data-tip data-for={props.descricao}>
      {props.children}
      <ReactTooltip id={props.descricao} effect='solid'>
        <span>{props.descricao}</span>
      </ReactTooltip>
    </Container>
  );
};

export { BotaoAcao };
