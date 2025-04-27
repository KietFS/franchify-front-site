import {
  CheckboxProps,
  FormControlLabel,
  Checkbox as MuiCheckBox,
} from "@mui/material";
import React from "react";

interface ICheckboxProps {
  label?: string;
  subLabel?: string;
  checkboxProps?: CheckboxProps;
}

const Checkbox: React.FC<ICheckboxProps> = (props) => {
  const { label, checkboxProps, subLabel, ...rest } = props;
  return (
    <FormControlLabel
      control={
        <MuiCheckBox {...checkboxProps} inputProps={{ "aria-label": label }} />
      }
      label={
        <>
          <span>{label}</span>
          {subLabel && (
            <span className="ml-2 text-sm text-gray-500">{subLabel}</span>
          )}
        </>
      }
    />
  );
};

export default Checkbox;
