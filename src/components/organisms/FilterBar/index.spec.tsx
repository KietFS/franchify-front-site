import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "./";
import useSearch from "../../../hooks/useSearch";

// Mock the useSearch hook
jest.mock("../../../hooks/useSearch", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("FilterBar", () => {
  const mockGetProductsByParams = jest.fn();
  const mockDispatchSetCategories = jest.fn();
  const mockDispatchSetOnSale = jest.fn();
  const mockResetFilter = jest.fn();

  const mockUseSearch = {
    getProductsByParams: mockGetProductsByParams,
    categories: ["1", "2"],
    dispatchSetCategories: mockDispatchSetCategories,
    keyword: "",
    products: [
      { id: 1, isOnSale: true },
      { id: 2, isOnSale: false },
      { id: 3, isOnSale: true },
    ],
    categoryFacets: [
      { id: "1", name: "Category 1", count: 5 },
      { id: "2", name: "Category 2", count: 3 },
    ],
    dispatchSetOnSale: mockDispatchSetOnSale,
    onSale: false,
    resetFilter: mockResetFilter,
  };

  beforeEach(() => {
    (useSearch as jest.Mock).mockReturnValue(mockUseSearch);
    // Mock URL methods
    window.history.pushState = jest.fn();
    const mockUrl = new URL("http://localhost");
    // @ts-ignore
    global.URL = jest.fn(() => mockUrl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders filter sections correctly", () => {
    render(<FilterBar />);

    expect(screen.getByText("Lọc bởi")).toBeDefined();
    expect(screen.getByText("Danh mục")).toBeDefined();
    expect(screen.getByText("Đang giảm giá")).toBeDefined();
  });

  it("shows clear filter button when filters are active", () => {
    render(<FilterBar />);

    const clearButton = screen.getByLabelText("Reset bộ lọc");
    expect(clearButton).toBeDefined();

    fireEvent.click(clearButton);
    expect(mockResetFilter).toHaveBeenCalled();
    expect(mockGetProductsByParams).toHaveBeenCalledWith(
      {
        onSale: false,
        categories: [],
      },
      true,
    );
  });

  it("handles category changes correctly", () => {
    render(<FilterBar />);

    // Simulate category change through FilterFacets
    const categoryFacet = screen.getByText("Category 1");
    fireEvent.click(categoryFacet);

    expect(mockDispatchSetCategories).toHaveBeenCalled();
    expect(mockGetProductsByParams).toHaveBeenCalled();
    expect(window.history.pushState).toHaveBeenCalled();
  });

  it("handles onSale filter changes correctly", () => {
    render(<FilterBar />);

    // Simulate onSale change through FilterFacets
    const onSaleFacet = screen.getByText("Đang giảm giá");
    fireEvent.click(onSaleFacet);

    expect(mockDispatchSetOnSale).toHaveBeenCalled();
    expect(mockGetProductsByParams).toHaveBeenCalled();
    expect(window.history.pushState).toHaveBeenCalled();
  });
});
