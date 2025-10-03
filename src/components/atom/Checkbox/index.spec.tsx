import { fireEvent, render, screen } from "@testing-library/react";
import Checkbox from "./index";

describe("Checkbox", () => {
  it("renders checkbox with label", () => {
    render(<Checkbox label="Test Label" />);

    const checkbox = screen.getByTestId("checkbox");
    const label = screen.getByText("Test Label");

    expect(checkbox).toBeDefined();
    expect(label).toBeDefined();
  });

  it("renders checkbox with label and sublabel", () => {
    render(<Checkbox label="Main Label" subLabel="Sub Label" />);

    const checkbox = screen.getByTestId("checkbox");
    const mainLabel = screen.getByText("Main Label");
    const subLabel = screen.getByText("Sub Label");

    expect(checkbox).toBeDefined();
    expect(mainLabel).toBeDefined();
    expect(subLabel).toBeDefined();
    expect(subLabel.classList.contains("ml-2")).toBe(true);
    expect(subLabel.classList.contains("text-sm")).toBe(true);
    expect(subLabel.classList.contains("text-gray-500")).toBe(true);
  });

  it("Check if disabled props is passed to MUI Checkbox correctly", () => {
    const checkboxProps = {
      disabled: true,
      inputProps: {
        disabled: true,
      },
    };

    render(<Checkbox label="Test" checkboxProps={checkboxProps} />);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox.getAttribute("aria-disabled")).toBe("true");
  });

  it("Check if checked props is passed to MUI Checkbox correctly", () => {
    const checkboxProps = {
      checked: true,
    };
    render(<Checkbox label="Test" checkboxProps={checkboxProps} />);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox.getAttribute("aria-checked")).toBe("true");
  });

  it("Check if onChange props is passed to MUI Checkbox correctly", () => {
    const onChange = jest.fn();
    const checkboxProps = {
      onChange,
    };
    render(<Checkbox label="Test" checkboxProps={checkboxProps} />);
    const checkbox = screen.getByTestId("checkbox");
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalled();
  });
});
