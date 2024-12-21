import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer component", () => {
  it("should render footer content with the current year", () => {
    render(<Footer />);
    const footerContent = screen.getByText(/Imperial Fleet Database/i);
    const currentYear = new Date().getFullYear();
    expect(footerContent).toHaveTextContent(
      `© ${currentYear} Imperial Fleet Database`
    );
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
