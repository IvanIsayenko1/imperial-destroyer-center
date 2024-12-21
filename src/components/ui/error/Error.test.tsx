import { render, screen, fireEvent } from "@testing-library/react";
import { Error } from "./Error";

describe("Error component", () => {
  it("should render default message", () => {
    render(<Error />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should render custom message", () => {
    const message = "Custom error message";
    render(<Error message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("should render the retry button if onRetry is provided", () => {
    const onRetry = vi.fn();
    render(<Error onRetry={onRetry} />);
    const button = screen.getByText("Try Again");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("should not render the retry button if onRetry is not provided", () => {
    render(<Error />);
    const button = screen.queryByText("Try Again");
    expect(button).toBeNull();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Error />);
    expect(asFragment()).toMatchSnapshot();
  });
});
