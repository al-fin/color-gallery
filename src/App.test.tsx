import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders color gallery page", () => {
  render(<App />);
  const linkElement = screen.getByText(/color gallery/i);
  expect(linkElement).toBeInTheDocument();
});
