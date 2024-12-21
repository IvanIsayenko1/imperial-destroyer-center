import { render, screen } from "@testing-library/react";
import { Loading } from "./Loading";

describe("Loading component", () => {
  it("should render the loading spinner", () => {
    render(<Loading />);
    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("should render the default loading text when no text prop is provided", () => {
    render(<Loading />);
    const text = screen.getByText("Loading...");
    expect(text).toBeInTheDocument();
  });

  it("should render custom text when the text prop is provided", () => {
    const customText = "Please wait...";
    render(<Loading text={customText} />);
    const text = screen.getByText(customText);
    expect(text).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });
});
