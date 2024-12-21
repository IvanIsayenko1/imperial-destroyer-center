import { render, screen, fireEvent } from "@testing-library/react";
import { Paginator } from "./Paginator";

describe("Paginator component", () => {
  it("should render page numbers correctly", () => {
    render(
      <Paginator
        currentPage={1}
        totalElements={50}
        elementsPerPage={10}
        onPageChange={() => {}}
      />
    );
    const pageNumbers = screen.getAllByRole("button", { name: /[0-9]/ });
    expect(pageNumbers).toHaveLength(5); // 50 elements, 10 per page, so 5 pages in total
  });

  it("should highlight the current page as active", () => {
    render(
      <Paginator
        currentPage={2}
        totalElements={50}
        elementsPerPage={10}
        onPageChange={() => {}}
      />
    );
    const currentPageButton = screen.getByRole("button", { name: "2" });
    expect(currentPageButton).toHaveClass("active");
  });

  it('should disable "Previous" button on the first page', () => {
    render(
      <Paginator
        currentPage={1}
        totalElements={50}
        elementsPerPage={10}
        onPageChange={() => {}}
      />
    );
    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled();
  });

  it('should disable "Next" button on the last page', () => {
    render(
      <Paginator
        currentPage={5}
        totalElements={50}
        elementsPerPage={10}
        onPageChange={() => {}}
      />
    );
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("should call onPageChange when a page number is clicked", () => {
    const onPageChange = vi.fn();
    render(
      <Paginator
        currentPage={1}
        totalElements={50}
        elementsPerPage={10}
        onPageChange={onPageChange}
      />
    );

    const pageNumberButton = screen.getByRole("button", { name: "3" });
    fireEvent.click(pageNumberButton);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('should call onPageChange when the "Previous" button is clicked', () => {
    const onPageChange = vi.fn();
    render(
      <Paginator
        currentPage={2}
        totalElements={50}
        elementsPerPage={10}
        onPageChange={onPageChange}
      />
    );

    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('should call onPageChange when the "Next" button is clicked', () => {
    const onPageChange = vi.fn();
    render(
      <Paginator
        currentPage={2}
        totalElements={50}
        elementsPerPage={10}
        onPageChange={onPageChange}
      />
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("should match snapshot", () => {
    const { asFragment } = render(
      <Paginator
        currentPage={1}
        totalElements={50}
        elementsPerPage={10}
        onPageChange={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
