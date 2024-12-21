import { render, screen, fireEvent } from "@testing-library/react";
import { Filters } from "./Filters";
import { SORT_DIRECTIONS } from "@constants/constants";

describe("Filters component", () => {
  const mockOnSearchChange = vi.fn();
  const mockOnSortChange = vi.fn();
  const mockOnSortDirectionChange = vi.fn();
  const mockOnClearFilters = vi.fn();

  const sortOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ];

  const defaultProps = {
    state: {
      searchTerm: "",
      sortBy: "",
      sortDirection: SORT_DIRECTIONS.ASC,
    },
    callbacks: {
      onSearchChange: mockOnSearchChange,
      onSortChange: mockOnSortChange,
      onSortDirectionChange: mockOnSortDirectionChange,
      onClearFilters: mockOnClearFilters,
    },
    config: {
      inputPlaceholder: "Search...",
      sortOptions,
    },
  };

  it("should render input field with correct placeholder", () => {
    render(<Filters {...defaultProps} />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("should handle search term change", () => {
    render(<Filters {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "New search" } });
    expect(mockOnSearchChange).toHaveBeenCalledWith("New search");
  });

  it("should render sort options", () => {
    render(<Filters {...defaultProps} />);
    const sortBySelect = screen.getByTestId("filters-sort");
    fireEvent.change(sortBySelect, { target: { value: "option1" } });
    expect(mockOnSortChange).toHaveBeenCalledWith("option1");
  });

  it("should render direction select when sortBy is selected", () => {
    render(
      <Filters
        {...defaultProps}
        state={{ ...defaultProps.state, sortBy: "option1" }}
      />
    );
    const directionSelect = screen.getByTestId("filters-direction");
    expect(directionSelect).toBeInTheDocument();
  });

  it("should not render direction select when sortBy is empty", () => {
    render(<Filters {...defaultProps} />);
    const directionSelect = screen.queryByTestId("filters-direction");
    expect(directionSelect).not.toBeInTheDocument();
  });

  it("should handle sort direction change", () => {
    render(
      <Filters
        {...defaultProps}
        state={{ ...defaultProps.state, sortBy: "option1" }}
      />
    );
    const directionSelect = screen.getByTestId("filters-direction");

    fireEvent.change(directionSelect, {
      target: { value: SORT_DIRECTIONS.DESC },
    });

    expect(mockOnSortDirectionChange).toHaveBeenCalledWith(
      SORT_DIRECTIONS.DESC
    );
  });

  it("should render clear filters button when there are active filters", () => {
    render(
      <Filters
        {...defaultProps}
        state={{ ...defaultProps.state, searchTerm: "test" }}
      />
    );
    const clearButton = screen.getByText("Clear Filters");
    expect(clearButton).toBeInTheDocument();
  });

  it("should call onClearFilters when the clear button is clicked", () => {
    render(
      <Filters
        {...defaultProps}
        state={{ ...defaultProps.state, searchTerm: "test" }}
      />
    );
    const clearButton = screen.getByText("Clear Filters");
    fireEvent.click(clearButton);
    expect(mockOnClearFilters).toHaveBeenCalled();
  });

  it("should not render clear filters button when there are no active filters", () => {
    render(<Filters {...defaultProps} />);
    const clearButton = screen.queryByText("Clear Filters");
    expect(clearButton).toBeNull();
  });

  it("should clear filters on Escape key press", () => {
    render(<Filters {...defaultProps} />);

    const filtersContainer = screen.getByTestId("filters-container");
    fireEvent.keyDown(filtersContainer, { key: "Escape" });
    expect(mockOnClearFilters).toHaveBeenCalled();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<Filters {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
