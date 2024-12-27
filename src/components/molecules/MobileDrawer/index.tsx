"use client";

import useAuth from "@/hooks/useAuth";
import useCategory from "@/hooks/useCategories";
import { ICategory } from "@/types/models";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
} from "@mui/material";
import Link from "next/link";

interface IMobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MobileDrawer: React.FC<IMobileDrawerProps> = (props) => {
  const { open, onClose } = props;
  const { logOut, user } = useAuth();
  const { listCategory } = useCategory();

  const toggleDrawer =
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      if (inOpen) {
        onClose();
      }
    };

  const userRoutes = user
    ? [
        { name: "Quản lý tài khoản", to: "/accont" },
        { name: "Giỏ hàng", to: "cart" },
        { name: "Đăng xuất", to: "/", onClick: logOut },
      ]
    : [
        { name: "Đăng nhập", to: "/login" },
        { name: "Đăng ký", to: "/register" },
      ];

  return (
    <Drawer open={open} onClose={() => onClose()}>
      <Box
        sx={{ width: "300px" }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListSubheader sx={{ fontSize: 20, color: "black" }}>
            Tài khoản
          </ListSubheader>
          {userRoutes?.map((item) => (
            <ListItem key={item?.to}>
              {item?.to !== "/" ? (
                <Link href={item?.to} onClick={() => onClose()}>
                  <ListItemButton>{item?.name}</ListItemButton>
                </Link>
              ) : (
                <Link
                  href={item?.to}
                  onClick={() => {
                    onClose();
                    item?.onClick && item.onClick();
                  }}
                >
                  <ListItemButton>{item?.name}</ListItemButton>
                </Link>
              )}
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListSubheader sx={{ fontSize: 20, color: "black" }}>
            Các danh mục
          </ListSubheader>
          {listCategory.map((item: ICategory) => (
            <ListItem key={item?.id}>
              <ListItemButton onClick={() => {}}>{item?.name}</ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
