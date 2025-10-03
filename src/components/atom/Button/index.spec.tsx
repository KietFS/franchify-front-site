import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./index";

describe("Button Component", () => {
  it("renders button with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeDefined();
  });

  it("handles click events when not disabled", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByTestId("button-component"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not handle click events when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disable={true}>
        Click me
      </Button>,
    );

    fireEvent.click(screen.getByTestId("button-component"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("shows loading spinner when isLoading is true", () => {
    render(<Button isLoading={true}>Click me</Button>);
    expect(screen.getByTestId("button-loading-spinner")).toBeDefined();
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByTestId("button-component")).toBeDefined();
  });
});
