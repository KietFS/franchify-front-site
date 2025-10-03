import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import Input from "./index";

const TestComponent = ({ rules }: { rules?: any }) => {
  const { control } = useForm({
    defaultValues: {
      test: "",
    },
  });

  return (
    <Input control={control} name="test" label="Test Label" rules={rules} />
  );
};

describe("Input", () => {
  it("renders input with label", () => {
    render(<TestComponent />);

    const input = screen.getByLabelText("Test Label");
    expect(input).toBeDefined();
  });

  //   it("shows error message when validation fails", async () => {
  //     render(
  //       <TestComponent
  //         rules={{
  //           required: "This field is required",
  //         }}
  //       />
  //     );

  //     const input = screen.getByLabelText("Test Label");
  //     fireEvent.change(input, { target: { value: "" } });
  //     fireEvent.blur(input);

  //     const errorMessage = await screen.findByText("This field is required");
  //     expect(errorMessage).toBeInTheDocument();
  //   });

  //   it("updates value on change", () => {
  //     render(<TestComponent />);

  //     const input = screen.getByLabelText("Test Label");
  //     fireEvent.change(input, { target: { value: "test value" } });

  //     expect(input).toHaveValue("test value");
  //   });

  //   it("renders with placeholder", () => {
  //     const { control } = useForm({
  //       defaultValues: {
  //         test: "",
  //       },
  //     });

  //     render(
  //       <Input
  //         control={control}
  //         name="test"
  //         label="Test Label"
  //         placeholder="Test Placeholder"
  //       />
  //     );

  //     const input = screen.getByPlaceholderText("Test Placeholder");
  //     expect(input).toBeInTheDocument();
  //   });

  //   it("renders with different input mode", () => {
  //     const { control } = useForm({
  //       defaultValues: {
  //         test: "",
  //       },
  //     });

  //     render(
  //       <Input
  //         control={control}
  //         name="test"
  //         label="Test Label"
  //         mode="password"
  //       />
  //     );

  //     const input = screen.getByLabelText("Test Label");
  //     expect(input).toHaveAttribute("type", "password");
  //   });
});
