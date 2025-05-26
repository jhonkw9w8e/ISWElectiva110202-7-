import { describe, it, expect } from "vitest";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import { BrowserRouter } from "react-router-dom";

describe("Main entry renders App Correctly", () => {
  it("renders App inside BrowserRouter without crashing", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    const root = ReactDOM.createRoot(div);

    expect(() => {
      root.render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    }).not.toThrow();
  });
});
