import useStore from "../../../hooks/useStore";
import FulfillmentManagemnt from "./";
import { render, screen, fireEvent } from "@testing-library/react";
import { getStoreByLocation } from "../../../utils/locator";

// Mock the useSearch hook
jest.mock("../../../hooks/useStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../utils/locator", () => ({
  __esModule: true,
  getStoreByLocation: jest.fn(),
}));

describe("FulfillmentManagemnt", () => {
  const mockUseStore = {
    currentStore: {
      id: 1,
      name: "Store 1",
      address: "123 Main St",
      phone: "1234567890",
      email: "store1@example.com",
      isOpen: true,
    },
    dispatchSetCurrentStore: jest.fn(),
    getListStore: jest.fn(),
    listStore: [
      {
        id: 1,
        name: "Store 1",
        address: "123 Main St",
        phone: "1234567890",
        email: "store1@example.com",
        isOpen: true,
      },
      {
        id: 2,
        name: "Store 2",
        address: "456 Main St",
        phone: "1234567890",
        email: "store2@example.com",
        isOpen: false,
      },
    ],
    dispatchSetListStore: jest.fn(),
    isStoreOpen: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue(mockUseStore);
  });

  it("renders the current store correct", () => {
    render(<FulfillmentManagemnt />);
    expect(getStoreByLocation).toHaveBeenCalled();
    expect(screen.getByText("Cửa hàng 1")).toBeDefined();
  });

  it("renders the empty list correctly", () => {
    const mockListStoreEmpty = {
      ...mockUseStore,
      listStore: [],
      currentStore: null,
    };
    (useStore as jest.Mock).mockReturnValue(mockListStoreEmpty);
    render(<FulfillmentManagemnt />);
    expect(
      screen.getByText("Vui lòng chọn cửa hàng để tiếp tục"),
    ).toBeDefined();
  });

  it("open the store list selector when click on the current store", () => {
    render(<FulfillmentManagemnt />);
    fireEvent.click(screen.getByText("Cửa hàng 1"));
    expect(screen.getByText("Bạn đang mua sắm ở")).toBeDefined();
  });
});
