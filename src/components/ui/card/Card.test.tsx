import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card component", () => {
  const testProps = {
    imageSrc: "https://example.com/image.jpg",
    name: "Test Card",
    properties: {
      property1: "value1",
      property2: "value2",
    },
  };

  it("shour render the card correctly", () => {
    render(<Card {...testProps} />);
    expect(screen.getByAltText("Test Card")).toHaveAttribute(
      "src",
      testProps.imageSrc
    );
    expect(screen.getByText("Test Card")).toBeInTheDocument();
    Object.entries(testProps.properties).forEach(([key, value]) => {
      expect(screen.getByText(`${key}: ${value}`)).toBeInTheDocument();
    });
  });

  it("should render the correct number of properties", () => {
    render(<Card {...testProps} />);
    expect(screen.getAllByRole("paragraph")).toHaveLength(
      Object.entries(testProps.properties).length
    );
  });

  it("should render correctly with no properties", () => {
    render(<Card {...{ ...testProps, properties: {} }} />);
    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.queryAllByRole("paragraph")).toHaveLength(0);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Card {...testProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
