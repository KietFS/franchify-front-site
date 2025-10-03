import useDebounce from "@/hooks/useDebounce";
import useSearch from "@/hooks/useSearch";
import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { TextField, Box } from "@mui/material";
import { useRouter } from "next/navigation";
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
    const { getSearchPredictions, dispatchSetKeyword } = useSearch();
    const router = useRouter();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        dispatchSetKeyword(keyword);
        onBlur?.();
        router.push(`/filter?keyword=${keyword}`);
      }
    };

    const handleClearKeyword = () => {
      setKeyword("");
      dispatchSetKeyword("");
      if (window.location.pathname.includes("/filter")) {
        router.push("/filter?keyword=");
      } else {
        router.refresh();
      }
    };

    useEffect(() => {
      if (debounceKeyword?.length > 0) {
        getSearchPredictions(debounceKeyword);
      }
    }, [debounceKeyword]);

    useEffect(() => {
      const keywordParams = new URLSearchParams(window.location.search).get(
        "keyword",
      );
      if (keywordParams) {
        setKeyword(keywordParams);
        dispatchSetKeyword(keywordParams);
      }
    }, []);

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          backgroundColor: "white",
          paddingRight: "16px",
          borderRadius: "20px",
        }}
      >
        <TextField
          onKeyDown={handleKeyDown}
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
          value={keyword}
          id="input"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          sx={{
            backgroundColor: "white",
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

        {keyword?.length > 0 ? (
          <button
            className="cursor-pointer border-none bg-none"
            onClick={handleClearKeyword}
          >
            <XMarkIcon className="h-6 w-6 text-secondary-900" />
          </button>
        ) : (
          <MagnifyingGlassIcon className="h-6 w-6 text-secondary-900" />
        )}
      </Box>
    );
  },
);

export default SearchBar;
