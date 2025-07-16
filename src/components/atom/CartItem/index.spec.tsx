import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "./index";

const mockNavigateToProductDetail = jest.fn();
jest.mock("@/hooks/useNavigation", () => ({
  __esModule: true,
  default: () => ({
    navigateToProductDetail: mockNavigateToProductDetail,
  }),
}));

const mockHandleIncreaseQuantity = jest.fn();
const mockHandleDecreaseQuantity = jest.fn();
const mockHandleRemoveProduct = jest.fn();
jest.mock("@/hooks/useCart", () => ({
  __esModule: true,
  default: () => ({
    currentQuantity: 2,
    handleIncreaseQuantity: mockHandleIncreaseQuantity,
    handleDecreaseQuantity: mockHandleDecreaseQuantity,
    handleRemoveProduct: mockHandleRemoveProduct,
    loading: false,
  }),
}));

describe("CartItem Component", () => {
  const mockCartItem = {
    name: "Test Product",
    price: "$99.99",
    product: {
      name: "Test Product",
      thumbnail:
        "https://res.cloudinary.com/dfnuzzpe3/image/upload/v1733239160/sua-dinh-duong-vinamilk-socola-6-goi-x-220ml-1731925933_hbmtno.jpg",
      price: {
        price: 99.99,
      },
      quantity: 1,
    },
  };

  it("renders cart item with product details", () => {
    render(<CartItem cartItem={mockCartItem} />);

    expect(screen.getAllByText("Test Product")).toBeDefined();
    expect(screen.getByTestId("cart-item-price").textContent).toBeDefined();
  });

  it("navigates to product detail when clicked", () => {
    render(<CartItem cartItem={mockCartItem} />);

    fireEvent.click(screen.getByText("Test Product"));
    expect(mockNavigateToProductDetail).toHaveBeenCalledWith(
      mockCartItem.product,
    );
  });

  it("handles increase quantity", () => {
    render(<CartItem cartItem={mockCartItem} />);

    const increaseButton = screen.getByTestId(
      "cart-item-increase-quantity",
    ) as HTMLButtonElement;
    fireEvent.click(increaseButton);

    expect(mockHandleIncreaseQuantity).toHaveBeenCalled();
  });

  it("handles decrease quantity when quantity > 1", () => {
    render(<CartItem cartItem={mockCartItem} />);

    const decreaseButton = screen.getByTestId(
      "cart-item-decrease-quantity",
    ) as HTMLButtonElement;
    fireEvent.click(decreaseButton);

    expect(mockHandleDecreaseQuantity).toHaveBeenCalled();
  });

  it("handles remove product when quantity is 1", () => {
    jest
      .spyOn(require("@/hooks/useCart"), "default")
      .mockImplementation(() => ({
        currentQuantity: 1,
        handleIncreaseQuantity: mockHandleIncreaseQuantity,
        handleDecreaseQuantity: mockHandleDecreaseQuantity,
        handleRemoveProduct: mockHandleRemoveProduct,
        loading: false,
      }));
    render(<CartItem cartItem={mockCartItem} />);

    const removeButton = screen.getByTestId("cart-item-remove-product");
    fireEvent.click(removeButton);

    expect(mockHandleRemoveProduct).toHaveBeenCalled();
  });

  it("shows remove button when quantity is 1", () => {
    jest
      .spyOn(require("@/hooks/useCart"), "default")
      .mockImplementation(() => ({
        currentQuantity: 1,
        handleIncreaseQuantity: mockHandleIncreaseQuantity,
        handleDecreaseQuantity: mockHandleDecreaseQuantity,
        handleRemoveProduct: mockHandleRemoveProduct,
        loading: false,
      }));

    render(<CartItem cartItem={mockCartItem} />);

    expect(screen.getByTestId("cart-item-remove-product")).toBeDefined();
  });

  it("shows loading spinner when loading is true", () => {
    jest
      .spyOn(require("@/hooks/useCart"), "default")
      .mockImplementation(() => ({
        currentQuantity: 1,
        handleIncreaseQuantity: mockHandleIncreaseQuantity,
        handleDecreaseQuantity: mockHandleDecreaseQuantity,
        handleRemoveProduct: mockHandleRemoveProduct,
        loading: true,
      }));

    render(<CartItem cartItem={mockCartItem} />);

    expect(screen.getByTestId("cart-item-loading")).toBeDefined();
  });
});
