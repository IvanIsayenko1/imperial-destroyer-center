import { render, screen, fireEvent } from "@testing-library/react";
import { NoResults } from "./NoResults";

describe("NoResults component", () => {
  it("should render the correct message with the search term", () => {
    const searchTerm = "Tatooine";
    render(<NoResults searchTerm={searchTerm} onClearFilters={() => {}} />);

    const message = screen.getByText(
      `No planets found matching "${searchTerm}"`
    );
    expect(message).toBeInTheDocument();
  });

  it("should call onClearFilters when the button is clicked", () => {
    const onClearFilters = vi.fn();
    render(<NoResults searchTerm="Tatooine" onClearFilters={onClearFilters} />);

    const button = screen.getByText("Clear Filters");
    fireEvent.click(button);

    expect(onClearFilters).toHaveBeenCalledTimes(1);
  });

  it("should match snapshot", () => {
    const { asFragment } = render(
      <NoResults searchTerm="Tatooine" onClearFilters={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
