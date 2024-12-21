/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchAllValues } from "@/services/api/swapi";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Page } from "./Page";

vi.mock("@/services/api/swapi");

describe("Page Component", () => {
  const mockConfig = {
    texts: {
      mainTitle: "Imperial Starship Registry",
      loadingMessage: "Scanning the galaxy for starships...",
      filterInputPlaceholder: "Search starships by Imperial decree...",
      filterMessage: "Deploying probe droids...",
    },
    fetchUrl: "/starships",
    sortOptions: [
      { label: "Name", value: "name" },
      { label: "Cargo capacity", value: "cargo_capacity" },
      { label: "Crew", value: "crew" },
      { label: "Hyperdrive rating", value: "hyperdrive_rating" },
    ],
    cardProperties: ["name"],
    name: "starships",
    getImage: vi.fn(),
    debounceTime: 0,
  };

  const mockData = [
    { result: { properties: { name: "Millennium Falcon" } } },
    { result: { properties: { name: "X-Wing" } } },
  ];

  beforeEach(() => {
    vi.mocked(fetchAllValues).mockResolvedValue(mockData);
  });

  it("should render the page correctly with loading state", async () => {
    render(<Page<any, any> config={mockConfig} />);

    expect(
      screen.getByText(mockConfig.texts.loadingMessage)
    ).toBeInTheDocument();

    await waitFor(() => screen.getByText(mockConfig.texts.mainTitle));
    expect(screen.getByText(mockConfig.texts.mainTitle)).toBeInTheDocument();
  });

  it("should handle error state", async () => {
    vi.mocked(fetchAllValues).mockRejectedValue(
      new Error("Failed to fetch data")
    );

    render(<Page<any, any> config={mockConfig} />);

    await waitFor(() => screen.getByText("Failed to fetch data"));
    expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
  });

  it("should handle pagination", async () => {
    const mockPaginationData = new Array(20).fill(null).map((_, i) => ({
      result: { properties: { name: `Starship ${i + 1}` } },
    }));

    vi.mocked(fetchAllValues).mockResolvedValue(mockPaginationData);

    render(<Page<any, any> config={mockConfig} />);

    await waitFor(() => !screen.queryByText("Starship 11"));

    screen.debug();

    expect(screen.getByText("Starship 1")).toBeInTheDocument();
    expect(screen.getByText("Starship 10")).toBeInTheDocument();
    expect(screen.queryByText("Starship 11")).toBeNull();

    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => screen.getByText("Starship 11"));

    expect(screen.getByText("Starship 11")).toBeInTheDocument();
    expect(screen.getByText("Starship 20")).toBeInTheDocument();
    expect(screen.queryByText("Starship 1")).toBeNull();
  });

  it("should filter items based on search term", async () => {
    render(<Page<any, any> config={mockConfig} />);

    await waitFor(() => screen.getByText(mockConfig.texts.mainTitle));

    expect(screen.getByText("Millennium Falcon")).toBeInTheDocument();
    expect(screen.getByText("X-Wing")).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(
      mockConfig.texts.filterInputPlaceholder
    );

    fireEvent.input(searchInput, {
      target: { value: "wing" },
    });

    await waitFor(() => screen.getByText("X-Wing"));

    expect(screen.queryByText("Millennium Falcon")).toBeNull();
    expect(screen.getByText("X-Wing")).toBeInTheDocument();
  });

  it("should sort items based on selected sort option", async () => {
    render(<Page<any, any> config={mockConfig} />);

    await waitFor(() => screen.getByText(mockConfig.texts.mainTitle));

    expect(screen.getByText("Millennium Falcon")).toBeInTheDocument();
    expect(screen.getByText("X-Wing")).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("filters-sort"), {
      target: { value: "name" },
    });

    await waitFor(() => screen.getByText("X-Wing"));
    expect(screen.getByText("X-Wing")).toBeInTheDocument();
    expect(screen.getByText("Millennium Falcon")).toBeInTheDocument();
  });

  it("should clear filters when the clear button is clicked", async () => {
    render(<Page<any, any> config={mockConfig} />);

    await waitFor(() => screen.getByText(mockConfig.texts.mainTitle));

    fireEvent.change(
      screen.getByPlaceholderText(mockConfig.texts.filterInputPlaceholder),
      {
        target: { value: "X-Wing" },
      }
    );

    await waitFor(() => screen.getByText("X-Wing"));

    fireEvent.click(screen.getByText("Clear Filters"));

    await waitFor(() => screen.getByText("Millennium Falcon"));
    expect(screen.getByText("X-Wing")).toBeInTheDocument();
  });
});
