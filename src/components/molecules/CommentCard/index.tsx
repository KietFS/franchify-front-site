"use client";

import React, { useState } from "react";
import axios from "axios";
import CommentInput from "@/components/atom/CommentInput";
import { useForm } from "react-hook-form";

import { useToast } from "@/hooks/useToast";
import { useSelector } from "react-redux";
import ConfirmDialog from "@/components/molecules/ConfirmDialog";
import { apiURL } from "@/constanst";
import useAuth from "@/hooks/useAuth";
import {TrashIcon} from "@heroicons/react/24/outline";
import {PencilSquareIcon} from "@heroicons/react/16/solid";

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
  const { isAuthenticated } = useAuth();
  const [showMore, setShowMore] = React.useState(false);

  const handlePostReply = async () => {
    try {
      setIsReplying(true);
      if (watch("reply")?.length > 0) {
        const response = await axios.post(
          `${apiURL}/products/comments`,
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
        `${apiURL}/products/${productDetail?.id}/comments/${id}`,
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
        `${apiURL}/products/${productDetail?.id}/comments/${id}`,
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
      <div className="my-2 h-fit rounded-xl bg-secondary-100 py-3 pl-4">
        <>
          {commentMode == "view" ? (
            <div className="flex w-full ">
              <div className="flex items-center gap-x-2 w-full">
                <div className="box-border flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-primary-600 text-center text-secondary-500">
                  {commentUser?.username?.[0]}
                </div>
                <div className="bg-gray-100 w-full rounded-lg pl-6 py-3 min-h-[115px]">
                  <div className="flex flex-col  gap-y-4 tablet:flex-row tablet:items-center">
                    <p className="text-sm font-semibold text-secondary-900 tablet:text-lg">
                      {commentUser?.username}
                    </p>
                    {props?.createdAt && (
                      <p className="text-[10px] text-sm text-secondary-800 tablet:ml-1 tablet:text-xs">
                        vào ngày{" "}
                        {props.createdAt?.toString()?.prettyDateTime() || ""}
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-secondary-900">{content}</p>
                  <div className="mt-4 flex items-center gap-x-1">
                    {isAuthenticated && (
                      <button
                          className="font-regular hover:font-semibold hover:text-primary-500 text-xs flex items-center"
                        onClick={handleTurnOnReply}
                      >
                        Trả lời
                      </button>
                    )}
                    {props?.user.username == user?.username && (
                      <button
                        className="font-regular hover:font-bold hover:text-red-600 ml-2 text-xs text-secondary-900 flex gap-x-1 items-center"
                        onClick={() => setOpenConfirmDialog(true)}
                      >
                        Xóa bình luận
                        <TrashIcon className="w-3 h-3 text-secondary-900 font-bold group-hover:text-red-600 text-inherit"  />
                      </button>
                    )}
                    {props?.user?.username == user?.username && (
                      <button
                        className="font-regular hover:font-semibold hover:text-primary-500 ml-2 text-xs flex gap-x-1 items-center"
                        onClick={handleTurnOnEdit}
                      >
                        Chỉnh sửa
                        <PencilSquareIcon className="w-3 h-3 text-secondary-900 font-semibold group-hover:text-primary-500 text-inherit" />
                      </button>
                    )}
                  </div>
                  {replies.length > 0 && (
                    <button
                      onClick={() => setShowMore(!showMore)}
                      className="bold border-none hover:opacity-50 bg-none text-sm text-gray-600 mt-2"
                    >
                      {showMore ? "Ẩn" : "Xem"} {replies?.length} trả lời
                    </button>
                  )}
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
          <div className="ml-12 mt-4 duration-300 ease-in">
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

        {showMore && (
          <div>
            {replies?.map((reply: any, replyIndex: number) => {
              return (
                <div className="relative ml-2" key={`reply-${replyIndex}`}>
                  <svg
                    className="absolute left-0 top-0 h-full"
                    width="40"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0 v70 M10 70 h30"
                      stroke="#374151"
                      strokeWidth="0.3"
                    />
                  </svg>
                  <div className="ml-8 mt-2 border-t border-secondary-200 pl-4">
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
        )}
      </div>
    </>
  );
};

export default CommentCard;
