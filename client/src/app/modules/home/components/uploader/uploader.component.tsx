import React from "react";
import { TbUpload } from "react-icons/tb";
import { Container } from "./styles";

const Uploader: React.FC = () => {
  return (
    <Container>
      <TbUpload size={48} />
      Solte o arquivo ou pasta para fazer o upload
    </Container>
  );
};

export { Uploader };
