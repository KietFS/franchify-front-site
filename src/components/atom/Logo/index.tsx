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
        width={200}
        height={100}
        src="https://res.cloudinary.com/dfnuzzpe3/image/upload/v1731048054/logo_xrm6cx.webp"
        // style={{ width: 36, height: 36 }}
      />
    </Box>
  );
};

export default Logo;
