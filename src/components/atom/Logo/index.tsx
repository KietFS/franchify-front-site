import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ILogo {
  variant?: "primary" | "secondary" | "error";
}

const Logo: React.FC<ILogo> = ({ variant = "primary" }) => {
  const route = useRouter();
  return (
    <Box
      onClick={() => route.replace("/")}
      sx={{
        display: "flex",
        columnGap: "12px",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Image
        alt="/logo"
        src={require("@/assets/icons/logo.png")}
        style={{ width: 36, height: 36 }}
      />
      <Typography
        className={`${
          variant === "primary" ? "text-primary-500" : "text-white"
        }`}
        sx={{
          margin: 0,
          padding: 0,
          display: {
            xs: "none",
            md: "flex",
          },
        }}
        fontWeight="500"
        variant="h5"
        gutterBottom
      >
        The Coffee House
      </Typography>
    </Box>
  );
};

export default Logo;
