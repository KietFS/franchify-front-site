"use client";

import Button from "@/components/atom/Button";
import Input from "@/components/atom/Input";
import { Typography, Box, Divider, CircularProgress } from "@mui/material";
import Image from "next/image";
import { set, useForm } from "react-hook-form";
import axios, {AxiosResponse} from "axios";
import React from "react";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "@/redux/slices/auth";
import { apiURL } from "@/constanst";

interface ILoginPageProps {}

const LoginPage: React.FC<ILoginPageProps> = (props) => {
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const handlePressLogin = async (values: IUserLoginPayload) => {
    try {
      setLoading(true);
      const response = await axios.post<any, AxiosResponse<any>, IUserLoginPayload>(`${apiURL}/auth/signin`, values);
      const { success, data, error } = response.data;
      if (success) {
        dispatch(setAccessToken(data?.accessToken));
        dispatch(setUser(data));
        router.push("/");
        setLoading(false);
        toast.sendToast("Success", "Login successfully");
      } else {
        setLoading(false);
        toast.sendToast("Error", "Login failed", data?.message);
      }
    } catch (error: any) {
      setLoading(false);
      if (error?.response?.status == 410) {
        router.push(
          `/verify-account?phoneNumber=${(
            values.phoneNumber as string
          ).substring(1)}`
        );
      }
      toast.sendToast(
        "Error",
        error?.response?.data?.message || "Login error",
        "error"
      );
    }
  };

  return (
    <div className="w-full h-auto flex justify-center items-center bg-white">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "24px",
          width: "500px",
          alignItems: "center",
          padding: "36px 36px",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <Box>
          <Typography
            className="text-primary-500"
            sx={{ fontWeight: "600" }}
            variant="h4"
          >
            Đăng nhập
          </Typography>
          <Typography
            sx={{ marginTop: "16px", fontSize: "14px", color: "GrayText" }}
          >
            Đăng nhập vào The Coffee House để trải nghiệm mua sắm tốt nhất
          </Typography>
        </Box>

        <Button variant="secondary">
          <span>Đăng nhập bằng Google</span>
          <Image
            alt="google-logo"
            src={require("../../../assets/icons/google.png")}
            width={20}
            height={20}
            style={{ marginLeft: "8px" }}
          />
        </Button>

        <Divider sx={{ height: 4, width: "100%", margin: "4px 0" }} />

        <form
          onSubmit={handleSubmit(handlePressLogin)}
          className="w-full flex gap-y-6 flex-col"
        >
          <Input
            name="phoneNumber"
            control={control}
            label="Số điện thoại"
            placeholder="Nhập số điện thoại của bạn"
            rules={{ required: "Số điện thoại không được để trống" }}
          />
          <Input
            control={control}
            name="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu của bạn"
            mode="password"
            rules={{ required: "Mật khẩu không được để trống" }}
          />
          <Button
            type="submit"
            variant="primary"
            className="mt-2"
            isLoading={loading}
          >
            Tiếp tục với số điện thoại
          </Button>

          <CircularProgress size={24} />
        </form>

        <Box>
          <Typography sx={{ fontSize: "14px", color: "GrayText" }}>
            Bằng cách tiếp tục, bạn đã đồng ý với The Coffee House về Điều khoản sử dụng và Chính sách bảo mật
          </Typography>
        </Box>
        <Divider sx={{ height: 4, width: "100%" }} />

        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              color: "GrayText",
              textAlign: "center",
              columnGap: "2px",
            }}
          >
              Chưa có tài khoản?
            <Link
              style={{ marginLeft: "4px", textDecoration: "underline" }}
              href="/create-account"
            >
              Tạo tài khoản
            </Link>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;
