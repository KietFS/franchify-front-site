import useDebounce from "@/hooks/useDebounce";
import useSearch from "@/hooks/useSearch";
import { TextField, Box } from "@mui/material";
import React, { forwardRef, useEffect } from "react";

interface ISearchBarProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
}

//@ts-ignore
const SearchBar = forwardRef<HTMLInputElement, ISearchBarProps>(
  (props, ref) => {
    const { onChange, onBlur, onFocus, placeholder, autoFocus = false } = props;
    const [keyword, setKeyword] = React.useState<string>("");
    const debounceKeyword = useDebounce(keyword, 500);
    const { searchingByKeyword } = useSearch();

    useEffect(() => {
      if (debounceKeyword?.length > 0) {
        searchingByKeyword(debounceKeyword);
      }
    }, [debounceKeyword]);

    return (
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <TextField
          autoFocus={autoFocus}
          inputRef={ref}
          onBlur={() => onBlur?.()}
          onFocus={() => onFocus?.()}
          InputProps={{
            sx: { height: 40 },
            classes: {
              notchedOutline: "no-border",
            },
          }}
          placeholder={placeholder}
          fullWidth
          id="input"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          sx={{
            backgroundColor: "#f6f7f9",
            borderRadius: "20px",
            padding: "0px 16px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputLabel-root": {
              top: "-4px", // Adjust the label position if needed
            },
          }}
        />
      </Box>
    );
  }
);

export default SearchBar;
