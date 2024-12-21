import { render, screen } from "@testing-library/react";
import { List } from "./List";

describe("List component", () => {
  it("should render list items correctly", () => {
    const items = [1, 2, 3];
    const renderItem = (item: number) => <span>{item}</span>;

    render(<List items={items} renderItem={renderItem} />);

    items.forEach((item) => {
      expect(screen.getByText(item.toString())).toBeInTheDocument();
    });
  });

  it("should render no items when list is empty", () => {
    const renderItem = (item: number) => <span>{item}</span>;

    render(<List items={[]} renderItem={renderItem} />);

    // Expect not to find any item in the document
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });

  it("should render custom item content using renderItem function", () => {
    const items = ["apple", "banana", "cherry"];
    const renderItem = (item: string) => <strong>{item}</strong>;

    render(<List items={items} renderItem={renderItem} />);

    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
      expect(screen.getByText(item).tagName).toBe("STRONG");
    });
  });

  it("should match snapshot", () => {
    const items = [1, 2, 3];
    const renderItem = (item: number) => <span>{item}</span>;

    const { asFragment } = render(
      <List items={items} renderItem={renderItem} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
