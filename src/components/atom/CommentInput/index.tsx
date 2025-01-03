"use client";

import { CircularProgress } from "@mui/material";
import React from "react";
import RichTextInput from "../RichTextInput";
import { useSelector } from "react-redux";

interface ICommentInputProps {
  name: string;
  control: any;
  label: string;
  onPostComment: () => void;
  isPosting?: boolean;
  isClosable?: boolean;
  onClose?: () => void;
}

const CommentInput: React.FC<ICommentInputProps> = (props) => {
  const [comment, setComment] = React.useState("");
  const { user } = useSelector((state: any) => state.auth);
  const {
    name,
    control,
    label,
    onPostComment,
    isPosting = false,
    isClosable = false,
    onClose,
  } = props;

  return (
    <div className="flex w-full gap-x-3">
      <div className="box-border flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-primary-600 text-center text-secondary-500">
        {(user?.username?.[0] as string)?.toUpperCase()}
      </div>
      <div className="w-full">
        <div>
          <RichTextInput
            name={name}
            control={control}
            label={label}
            placeholder="Nhập bình luận của bạn"
          />
        </div>
        <div className="flex justify-between">
          <div></div>
          <div className="flex items-center gap-x-3">
            {isClosable && (
              <button
                className="mt-2 min-w-[80px] rounded-md border border-primary-500 bg-white px-3 py-1 text-primary-500"
                onClick={() => onClose?.()}
              >
                Đóng
              </button>
            )}
            <button
              className="mt-2 min-w-[80px] rounded-md bg-primary-500 px-3 py-1 font-semibold text-white"
              onClick={() => onPostComment()}
            >
              {isPosting ? (
                <CircularProgress sx={{ color: "white" }} size={20} />
              ) : (
                "Đăng"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
