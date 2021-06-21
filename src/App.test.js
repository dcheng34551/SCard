import { render, screen } from "@testing-library/react";
import App from "./App";

xtest("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// test("renders learn async react link", async () => {
//   render(<App />);
//   const linkElement = await screen.findByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
