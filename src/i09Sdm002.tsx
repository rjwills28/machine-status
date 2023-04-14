import React from "react";
import {
  AbsolutePosition,
  EmbeddedDisplay,
  Webcam
} from "@dls-controls/cs-web-lib";

type PropsPath = {
  pathin: string;
};

// An example of a custom SDM involving webcams. This mimics the
// layout of the original bash script and .edl file
export const LoadI09SDM = (props: PropsPath): JSX.Element => {
  const path = String(props.pathin) + ".json";
  // 1 OPI screen and 3 webcam laid out in a grid
  return (
    <>
      <EmbeddedDisplay
        position={new AbsolutePosition("0", "0", "50%", "50%")}
        file={{
          path,
          defaultProtocol: "pva",
          macros: {}
        }}
      />
      <Webcam
        url="http://bl09j-di-serv-01.diamond.ac.uk:8080/SD3.mjpg.mjpg"
        name="1"
        position={new AbsolutePosition("50%", "0", "50%", "50%")}
      ></Webcam>
      <Webcam
        name="2"
        url="http://bl09i-di-serv-01.diamond.ac.uk:8080/XBPM.mjpg.mjpg"
        position={new AbsolutePosition("0", "50%", "50%", "50%")}
      ></Webcam>
      <Webcam
        name="3"
        url="http://bl09j-di-serv-01.diamond.ac.uk:8081/EAV.MJPG.mjpg"
        position={new AbsolutePosition("50%", "50%", "50%", "50%")}
      ></Webcam>
    </>
  );
};
