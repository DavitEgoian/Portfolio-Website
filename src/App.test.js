import { render, screen } from "@testing-library/react";

jest.mock("./TextPressure", () => function MockTextPressure() {
  return <h1>Hello!</h1>;
});

jest.mock("./VariableProximity", () => function MockVariableProximity() {
  return <p>Tagline</p>;
});

jest.mock("@splidejs/react-splide", () => ({
  Splide: ({ children, "aria-label": ariaLabel }) => (
    <div role="region" aria-label={ariaLabel}>
      {children}
    </div>
  ),
  SplideSlide: ({ children }) => <div>{children}</div>,
}));

jest.mock("@splidejs/splide-extension-auto-scroll", () => ({
  AutoScroll: {},
}));

import App from "./App";

describe("App", () => {
  it("renders main sections", () => {
    render(<App />);

    expect(
      screen.getByRole("navigation", { name: /main navigation/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /about me/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /what i do/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /my tech stack/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /my projects/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /my education/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /my experience/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /licenses & certifications/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /connect with me/i })
    ).toBeInTheDocument();
  });

  it("renders contact email link", () => {
    render(<App />);
    expect(
      screen.getByRole("link", { name: /email logo/i })
    ).toHaveAttribute("href", "mailto:dato.egoyan@gmail.com");
  });

  it("renders project links", () => {
    render(<App />);
    expect(screen.getAllByRole("link", { name: /^github$/i }).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/Dynamic AI & Data Science Portfolio Website/i)
    ).toBeInTheDocument();
  });
});
