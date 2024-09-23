import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AppScreen, { AppPublic } from "./app";
import { vi } from "vitest";

interface GlobalFetch extends NodeJS.Global {
  fetch: any;
}
const globalWithFetch = global as GlobalFetch;

beforeEach((): void => {
  // Ensure the fetch() function mock is always cleared.
  vi.spyOn(globalWithFetch, "fetch").mockClear();
});

it("screen app renders without crashing", async () => {
  const div = document.createElement("div");
  const jsonObj = JSON.parse(`
  {
    "screens" : [
      {
        "redirect_url" : "/json/ms_day",
        "display_url" : "/day",
        "display_title" : "Day View",
        "delay_seconds": 5
      }
    ]
  }`);
  const mockSuccessResponse = "{}";
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    text: (): Promise<unknown> => mockJsonPromise
  });
  const mockFetch = (): Promise<unknown> => mockFetchPromise;
  vi.spyOn(globalWithFetch, "fetch").mockImplementation(mockFetch);

  ReactDOM.render(
    <Router>
      <AppScreen jsonObj={jsonObj} />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("public app renders without crashing", (): void => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <AppPublic />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
