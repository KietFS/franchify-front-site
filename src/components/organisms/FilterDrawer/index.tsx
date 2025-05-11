import { Box, Drawer } from "@mui/material";
import React from "react";
import FilterBar from "../FilterBar";
import Button from "@/components/atom/Button";

interface IFilterDrawerProps {
  open: boolean;
  onClose: () => void;
}

const FilterDrawer: React.FC<IFilterDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: "fit-content",
          maxHeight: "80vh",
          padding: "24px ",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      }}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="h-fit">
          <FilterBar />
        </div>

        <Button variant="primary" className="w-full" onClick={onClose}>
          View results
        </Button>
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
