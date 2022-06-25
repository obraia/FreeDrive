import React, { useEffect, useState } from "react";
import axios from "axios";
import { TbFile } from "react-icons/tb";

export interface Props {
  src: string;
}

const Preview: React.FC<Props> = (props) => {
  const [type, setType] = useState<string>("");

  const options = (type: string, src: string) =>
    ({
      image: <img src={src} alt="Preview" />,
      video: <video src={src} controls preload="none" />,
      audio: <audio src={src} controls />,
      pdf: <iframe src={src} title="pdf" />,
    }[type]);

  const handleFileType = (url: string) => {
    axios
      .get(url)
      .then((res) => {
        const contentType = res.headers["content-type"];

        if (contentType.includes("image")) {
          setType("image");
        } else if (contentType.includes("video")) {
          setType("video");
        } else if (contentType.includes("audio")) {
          setType("audio");
        } else if (contentType.includes("application/pdf")) {
          setType("pdf");
        }
      })
      .catch((err) => {
        setType("other");
      });
  };

  useEffect(() => {
    handleFileType(props.src);
  }, [props.src]);

  return options(type, props.src) || <TbFile size={36} />;
};

export { Preview };
