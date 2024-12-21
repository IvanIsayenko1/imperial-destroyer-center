import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "./Header";

vi.mock("../navigation/Navigation", () => ({
  Navigation: () => <div>Navigation</div>,
}));

vi.mock("../title/Title", () => ({
  Title: ({ title }: { title: string }) => <div>{title}</div>,
}));

describe("Header component", () => {
  it("should render the title with default value", () => {
    render(<Header />);
    expect(screen.getByText("Imperial Destroyer Center")).toBeInTheDocument();
  });

  it("should render the title with provided title prop", () => {
    const customTitle = "Custom Title";
    render(<Header title={customTitle} />);
    expect(screen.getByText(customTitle)).toBeInTheDocument();
  });

  it("should toggle the menu on button click", () => {
    render(<Header />);
    const menuButton = screen.getByLabelText("Toggle navigation");
    const navigationContainer = screen.getByText("Navigation").parentElement;

    expect(navigationContainer).not.toHaveClass("open");

    fireEvent.click(menuButton);

    expect(navigationContainer).toHaveClass("open");

    fireEvent.click(menuButton);

    expect(navigationContainer).not.toHaveClass("open");
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
