import {
  render,
  screen,
  fireEvent,
  getByText,
  act,
} from "@testing-library/react";
import ProductComments from "./index";
import useSearch from "../../../hooks/useSearch";
import { useToast } from "../../../hooks/useToast";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import RichTextInput from "@/components/atom/RichTextInput";
import useComments from "../../../hooks/useComments";

/*Detect things need to test
 UI: 
 * Check UI, divider and UI if product doesn't have comments
 * Has comments: Check if list commends and the CommendCard is being rendered correctly 
 * Send comments: If user type comment and submit, axios.post is being called correctly
 * If axios.post comment successfully, getListComments is being called correctly
 * Check use effect, check if getListComments is called when product detail is changed.
 */

// Mock the useSearch hook
jest.mock("../../../hooks/useSearch", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("axios");

// Mock react redux
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

// Mock useToast hooks
jest.mock("../../../hooks/useToast", () => ({
  __esModule: true,
  useToast: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  __esModule: true,
  useForm: jest.fn(() => ({
    register: jest.fn(),
    handleSubmit: (fn: any) => (e: any) => fn(e),
    watch: jest.fn(),
    setValue: jest.fn(),
    reset: jest.fn(),
    formState: {
      errors: {},
    },
  })),
}));

describe("Commens", () => {
  it("renders with mocked accessToken", async () => {
    (useSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({ auth: { accessToken: null } }),
    );

    const productDetail = { id: 1, name: "Test Product" };

    await act(async () => {
      render(<ProductComments productDetail={productDetail as any} />);
    });
    expect(screen.getByText("Sản phẩm chưa có bình luận nào")).toBeDefined();
  });

  // it("Existed comment input when user existed", async () => {
  //   const productDetail = { id: 1, name: "Test Product" };
  //   (useSelector as jest.Mock).mockImplementation((selectorFn) =>
  //     selectorFn({ auth: { accessToken: "mock-token" } }),
  //   );
  //   await act(async () => {
  //     render(<ProductComments productDetail={productDetail as any} />);
  //   });

  //   expect(screen.getByTestId("comment-input")).toBeDefined();
  // });
});
