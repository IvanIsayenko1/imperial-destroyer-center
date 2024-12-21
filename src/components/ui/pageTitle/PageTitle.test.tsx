import { render, screen } from "@testing-library/react";
import { PageTitle } from "./PageTitle";

describe("PageTitle component", () => {
  it("should render the title", () => {
    const title = "Test Page Title";
    render(<PageTitle title={title} />);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it("should render the subtitle when provided", () => {
    const title = "Test Page Title";
    const subtitle = "Test Page Subtitle";
    render(<PageTitle title={title} subtitle={subtitle} />);

    const subtitleElement = screen.getByText(subtitle);
    expect(subtitleElement).toBeInTheDocument();
  });

  it("should not render the subtitle when not provided", () => {
    const title = "Test Page Title";
    render(<PageTitle title={title} />);

    const subtitleElement = screen.queryByText("Test Page Subtitle");
    expect(subtitleElement).toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(
      <PageTitle title="Test Title" subtitle="Test Subtitle" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
