import { render, screen } from "@testing-library/react";
import { Layout } from "./Layout";
import { BrowserRouter } from "react-router-dom";

vi.mock("../header/Header", () => ({
  Header: () => <div>Header</div>,
}));

vi.mock("../footer/Footer", () => ({
  Footer: () => <div>Footer</div>,
}));

describe("Layout component", () => {
  it("should render Header", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(screen.getByText("Header")).toBeInTheDocument();
  });

  it("should render Footer", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("should render Outlet for nested routes", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    const outlet = screen.getByRole("main"); // The <main> tag contains the Outlet
    expect(outlet).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
