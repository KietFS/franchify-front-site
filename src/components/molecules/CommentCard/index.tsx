"use client";

import { Avatar } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import CommentInput from "@/components/atom/CommentInput";
import { useForm } from "react-hook-form";

import { useToast } from "@/hooks/useToast";
import { useSelector } from "react-redux";
import ConfirmDialog from "@/components/molecules/ConfirmDialog";

interface IProductCommentCardProps {
  productDetail: any;
  onReplyingSuccess?: () => void;
}

type ICommentMode = "view" | "edit";

const CommentCard: React.FC<any> = (props) => {
  const {
    content,
    parentId,
    replies,
    user: commentUser,
    onReplyingSuccess,
    id,
  } = props;
  const { productDetail } = props;

  const { register, control, handleSubmit, watch, setValue } = useForm();
  const [isReplying, setIsReplying] = React.useState<boolean>(false);
  const [isTurningOnReply, setIsTurningOnReply] =
    React.useState<boolean>(false);
  const { accessToken, user } = useSelector((state: any) => state.auth);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [commentMode, setCommentMode] = useState<ICommentMode>("view");
  const toast = useToast();

  if (replies?.length > 0) {
    console.log("replies", replies);
  }

  const handlePostReply = async () => {
    try {
      setIsReplying(true);
      if (watch("reply")?.length > 0) {
        const response = await axios.post(
          `http://localhost:4000/products/comments`,
          {
            content: watch("reply") || "",
            parentComment: id || null,
            productId: productDetail.id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response?.data?.success) {
          setIsTurningOnReply(false);
          onReplyingSuccess?.();
          toast?.sendToast("success", "Trả lời bình luận thành công");
        }
      }
    } catch (error: any) {
      if (error?.response?.status == 401) {
        toast.sendToast(
          "error",
          "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại"
        );
      }
    } finally {
      setIsReplying(false);
    }
  };

  const handleDeleteComment = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `http://localhost:4000/products/${productDetail?.id}/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response?.data?.success) {
        setIsDeleting(false);
        onReplyingSuccess?.();
        toast.sendToast("success", "Xóa bình luận thành công");
      }
    } catch (error) {
      setIsDeleting(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTurnOnEdit = () => {
    setCommentMode("edit");
    setValue("edit", content);
  };

  const handleSubmitEdit = async () => {
    try {
      setIsCommenting(true);
      const response = await axios.put(
        `http://localhost:4000/products/${productDetail?.id}/comments/${id}`,
        {
          comment: watch("edit") || "",
          parentId: parentId,
          productId: productDetail?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response?.data?.success) {
        setIsCommenting(false);
        onReplyingSuccess?.();
        toast?.sendToast("success", "Chỉnh sửa bình luận thành công");
      }
    } catch (error: any) {
      setIsCommenting(false);
      if (error?.response?.status == 401) {
        toast.sendToast(
          "error",
          "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại"
        );
      }
    } finally {
      setIsCommenting(false);
    }
  };

  const handleTurnOnReply = () => {
    setIsTurningOnReply(true);
  };

  return (
    <>
      {openConfirmDialog && (
        <ConfirmDialog
          title="Bạn xác nhận sẽ xóa bình luận"
          description="Hành động này không thể được hoàn tác"
          open={openConfirmDialog}
          onClose={() => setOpenConfirmDialog(false)}
          onConfirm={handleDeleteComment}
          isConfirmLoadingButton={isDeleting}
        />
      )}
      <div className="my-2 py-3 pl-4 rounded-xl bg-gray-50 h-fit">
        <>
          {commentMode == "view" ? (
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-x-2">
                <Avatar sx={{ bgcolor: "gray" }}>
                  {commentUser?.username?.[0]}
                </Avatar>
                <div>
                  <div className="flex flex-col tablet:flex-row tablet:items-center">
                    <p className="text-sm tablet:text-lg font-semibold text-gray-800">
                      {commentUser?.username}
                    </p>
                    {props?.createdAt && (
                      <p className="text-gray-500 text-[10px] tablet:text-xs text-sm tablet:ml-1">
                        vào ngày{" "}
                        {props.createdAt?.toString()?.prettyDateTime() || ""}
                      </p>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm">{content}</p>
                  <div className="items-center flex mt-1">
                    {!!accessToken && (
                      <button
                        className="text-gray-500 hover:text-gray-500 font-regular text-xs"
                        onClick={handleTurnOnReply}
                      >
                        Trả lời
                      </button>
                    )}
                    {props.userName == user?.username && (
                      <button
                        className="text-gray-500 hover:text-red-500 font-regular text-xs ml-2"
                        onClick={() => setOpenConfirmDialog(true)}
                      >
                        Xóa bình luận
                      </button>
                    )}
                    {props.userName == user?.username && (
                      <button
                        className="text-gray-500 hover:text-red-500 font-regular text-xs ml-2"
                        onClick={handleTurnOnEdit}
                      >
                        Chỉnh sửa
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <CommentInput
              key={id}
              {...register("edit", {
                required: {
                  value: true,
                  message: "Không được để trống phần trả lời",
                },
              })}
              control={control}
              label="Chinh sửa bình luận"
              onPostComment={handleSubmit(handleSubmitEdit)}
              isPosting={isCommenting}
              isClosable
              onClose={() => setCommentMode("view")}
            />
          )}
        </>

        {isTurningOnReply && commentMode == "view" ? (
          <div className="ml-12 mt-4 ease-in duration-300">
            <CommentInput
              key={id}
              {...register("reply", {
                required: {
                  value: true,
                  message: "Không được để trống phần trả lời",
                },
              })}
              control={control}
              label="Bình luận của bạn"
              onPostComment={handleSubmit(handlePostReply)}
              isPosting={isReplying}
              isClosable
              onClose={() => setIsTurningOnReply(false)}
            />
          </div>
        ) : null}

        <div>
          {replies?.map((reply: any, replyIndex: number) => {
            return (
              <div className="relative ml-2">
                <svg
                  className="absolute left-0 top-0 h-full"
                  width="40"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0 v50 M10 50 h30"
                    stroke="#cbd5e0"
                    strokeWidth="0.5"
                  />
                </svg>
                <div className="ml-8 mt-2 border-t border-gray-200 pl-4">
                  <CommentCard
                    key={replyIndex}
                    productDetail={productDetail}
                    {...reply}
                    onReplyingSuccess={() => onReplyingSuccess?.()}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CommentCard;
