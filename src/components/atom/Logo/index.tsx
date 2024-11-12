import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useConfig from "@/hooks/useConfig";

interface ILogo {
  variant?: "primary" | "secondary" | "error";
}

const Logo: React.FC<ILogo> = ({ variant = "primary" }) => {
  const { tenantConfigs, getTenantConfig } = useConfig();

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
      {/* <Image
        alt="/logo"
        width={200}
        height={100}
        src={tenantConfigs?.logoUrl}
        // style={{ width: 36, height: 36 }}
      /> */}
      <h1 className="text-secondary-500 text-xl  laptop:text-2xl font-bold w-full tablet:max-w-[300px]">
        {tenantConfigs?.name}
      </h1>
    </Box>
  );
};

export default Logo;
