import React from "react";
import {
  AbsolutePosition,
  EmbeddedDisplay,
  Webcam
} from "@dls-controls/cs-web-lib";
import "./sdm.css";

type PropsPath = {
  pathin: string;
};

// An example of a custom SDM involving webcams. This mimics the
// layout of the original bash script and .edl file
export const LoadI09SDM002 = (props: PropsPath): JSX.Element => {
  const path = String(props.pathin) + ".json";
  // 1 OPI screen and 3 webcam laid out in a grid
  return (
    <>
      <EmbeddedDisplay
        position={new AbsolutePosition("0px", "0px", "800px", "520px")}
        file={{
          path,
          defaultProtocol: "pva",
          macros: {}
        }}
      />
      <h3 id="SD3header">
        http://bl09j-di-serv-01.diamond.ac.uk:8080/SD3.mjpg.mjpg (T)
      </h3>
      <Webcam
        url="http://bl09j-di-serv-01.diamond.ac.uk:8080/SD3.mjpg.mjpg"
        name="SD3"
        position={new AbsolutePosition("1180px", "0px", "740px", "550px")}
      ></Webcam>
      <h3 id="XBPMheader">
        http://bl09i-di-serv-01.diamond.ac.uk:8080/XBPM.mjpg.mjpg (B)
      </h3>
      <Webcam
        name="XBPM"
        url="http://bl09i-di-serv-01.diamond.ac.uk:8080/XBPM.mjpg.mjpg"
        position={new AbsolutePosition("1180px", "600px", "740px", "550px")}
      ></Webcam>
      <h3 id="EAVheader">
        http://bl09j-di-serv-01.diamond.ac.uk:8081/EAV.MJPG.mjpg
      </h3>
      <Webcam
        name="EAV"
        url="http://bl09j-di-serv-01.diamond.ac.uk:8081/EAV.MJPG.mjpg"
        position={new AbsolutePosition("0px", "600px", "740px", "550px")}
      ></Webcam>
    </>
  );
};

// An example of a custom SDM involving webcams. This mimics the
// layout of the original bash script and .edl file
export const LoadI09SDM005 = (props: PropsPath): JSX.Element => {
  const path = String(props.pathin) + ".json";
  // 1 OPI screen and 4 webcam laid out in a grid
  return (
    <>
      <EmbeddedDisplay
        position={new AbsolutePosition("0px", "0px", "800px", "520px")}
        file={{
          path,
          defaultProtocol: "pva",
          macros: {}
        }}
      />
      <h3 id="ES2-4header">
        http://bl09I-di-serv-01.diamond.ac.uk:8080/ES2-4.mjpg.mjpg (T)
      </h3>
      <Webcam
        url="http://bl09I-di-serv-01.diamond.ac.uk:8080/ES2-4.mjpg.mjpg"
        name="ES2-2"
        position={new AbsolutePosition("1280px", "0px", "620px", "500px")}
      ></Webcam>
      <h3 id="ES2-5header">
        http://bl09I-di-serv-01.diamond.ac.uk:8080/ES2-5.mjpg.mjpg (B)
      </h3>
      <Webcam
        name="ES2-5"
        url="http://bl09I-di-serv-01.diamond.ac.uk:8080/ES2-5.mjpg.mjpg"
        position={new AbsolutePosition("1280px", "580px", "620px", "500px")}
      ></Webcam>
      <h3 id="ES2-6header">
        http://bl09I-di-serv-01.diamond.ac.uk:8080/ES2-6.mjpg.mjpg
      </h3>
      <Webcam
        name="ES2-6"
        url="http://bl09I-di-serv-01.diamond.ac.uk:8080/ES2-6.mjpg.mjpg"
        position={new AbsolutePosition("0px", "580px", "620px", "500px")}
      ></Webcam>
      <h3 id="ES2-7header">
        http://bl09I-di-serv-01.diamond.ac.uk:8080/ES2-7.mjpg.mjpg
      </h3>
      <Webcam
        name="ES2-7"
        url="http://bl09I-di-serv-01.diamond.ac.uk:8080/ES2-7.mjpg.mjpg"
        position={new AbsolutePosition("640px", "580px", "620px", "500px")}
      ></Webcam>
    </>
  );
};
