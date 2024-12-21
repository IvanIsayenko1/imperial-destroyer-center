import { render, screen } from "@testing-library/react";
import { Title } from "./Title";

describe("Title component", () => {
  it("should render the title correctly", () => {
    render(<Title title="Test Title" />);
    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toBeInTheDocument();
  });

  it("should have the correct class for styling", () => {
    render(<Title title="Test Title" />);
    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toHaveClass("text-2xl", "font-bold");
  });

  it("should match the snapshot", () => {
    const { asFragment } = render(<Title title="Test Title" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
