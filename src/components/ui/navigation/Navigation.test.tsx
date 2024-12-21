import { render, screen } from "@testing-library/react";
import { Navigation } from "./Navigation";
import { MemoryRouter } from "react-router-dom";

describe("Navigation component", () => {
  it("should render navigation links", () => {
    const items = [
      { label: "Planets", href: "/planets" },
      { label: "Starships", href: "/starships" },
      { label: "Vehicles", href: "/vehicles" },
    ];

    render(
      <MemoryRouter initialEntries={["/planets"]}>
        <Navigation items={items} />
      </MemoryRouter>
    );

    items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("should apply the active class to the correct link", () => {
    const items = [
      { label: "Planets", href: "/planets" },
      { label: "Starships", href: "/starships" },
      { label: "Vehicles", href: "/vehicles" },
    ];

    render(
      <MemoryRouter initialEntries={["/starships"]}>
        <Navigation items={items} />
      </MemoryRouter>
    );

    // Check if "Starships" link is active
    const starshipsLink = screen.getByText("Starships");
    expect(starshipsLink).toHaveClass("active");

    // Check if other links are not active
    const planetsLink = screen.getByText("Planets");
    expect(planetsLink).not.toHaveClass("active");

    const vehiclesLink = screen.getByText("Vehicles");
    expect(vehiclesLink).not.toHaveClass("active");
  });

  it("should render default navigation items when no items prop is passed", () => {
    render(
      <MemoryRouter initialEntries={["/planets"]}>
        <Navigation />
      </MemoryRouter>
    );

    const defaultItems = [
      { label: "Planets", href: "/planets" },
      { label: "Starships", href: "/starships" },
      { label: "Vehicles", href: "/vehicles" },
    ];

    defaultItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("should match snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={["/planets"]}>
        <Navigation />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
