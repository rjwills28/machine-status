import { AbsolutePosition, Webcam } from "@diamondlightsource/cs-web-lib";
import React from "react";
import "./webcams.css";

// URL and display name for single webcam
type SingleWebcamProps = {
  url: string;
  windowTitle: string;
  title?: string;
};

// Array of URLs and display names for 4 webcams
type FourWebcamProps = {
  urls: string[];
  windowTitle: string;
  titles?: string[];
};

// Load a single webcam with a header. Scale to fill screen while maintaining aspect ratio
export const LoadSingleWebcam = (props: SingleWebcamProps): JSX.Element => {
  // If no title specified, use webcam URL
  let header: string = props.url;
  document.title = props.windowTitle;
  if (props.title) header = props.title;
  return (
    <>
      <h2 id="header">{header}</h2>
      <Webcam
        url={props.url}
        name="webcam"
        position={new AbsolutePosition("0", "6%", "100%", "94%")}
      ></Webcam>
    </>
  );
};

// Load 4 webcams in a grid with 2 headers in the centre and one at the top.
// Scale webcams with window size while maintaining position and aspect ratio
export const LoadFourWebcams = (props: FourWebcamProps): JSX.Element => {
  // If no titles specified, leave a blank space
  let headers: string[] = ["", ""];
  document.title = props.windowTitle;
  if (props.titles) headers = props.titles;
  return (
    <>
      <h2 id="header">Status Display</h2>
      <Webcam
        url={props.urls[0]}
        name="webcam"
        position={new AbsolutePosition("7%", "6%", "40%", "40%")}
      ></Webcam>
      <h2 id="leftheader">{headers[0]}</h2>
      <Webcam
        url={props.urls[1]}
        name="webcam"
        position={new AbsolutePosition("7%", "50%", "40%", "40%")}
      ></Webcam>
      <Webcam
        url={props.urls[2]}
        name="webcam"
        position={new AbsolutePosition("53%", "6%", "40%", "40%")}
      ></Webcam>
      <h2 id="rightheader">{headers[1]}</h2>
      <Webcam
        url={props.urls[3]}
        name="webcam"
        position={new AbsolutePosition("53%", "50%", "40%", "40%")}
      ></Webcam>
    </>
  );
};
