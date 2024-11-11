"use client";

import { useForm } from "react-hook-form";
import CustomDialog from "../CustomDialog";
import Input from "@/components/atom/Input";
import Button from "@/components/atom/Button";
import { Divider } from "@mui/material";

interface IPersonalInformationDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
  defaultValues?: any;
}

const PersonalInformationDialog: React.FC<IPersonalInformationDialogProps> = (
  props,
) => {
  const { open, onClose, onSave } = props;
  const { control, getValues, handleSubmit } = useForm();
  return (
    <CustomDialog
      title="Thông tin người nhận"
      onClose={onClose}
      open={open}
      children={
        <div className="flex w-full flex-col gap-y-4 mb-10">
          <div className="w-full grid grid-cols-2 gap-x-6 gap-y-8">
            <Input control={control} name="phoneNumber" label="Số điện thoại" />
            <Input control={control} name="email" label="Địa chỉ email" />
          </div>
          <Divider />
          <div className="w-full grid grid-cols-1 gap-x-6 gap-y-6 mt-4">
            <Input control={control} name="firstName" label="Họ người nhận" />
            <Input control={control} name="lastName" label="Tên người nhận" />
          </div>

          <div className="w-full flex flex-row-reverse mt-10">
            <div className="w-fit flex  gap-x-2">
              <Button onClick={() => onClose()} variant="secondary">
                Đóng
              </Button>
              <Button>Xác nhận</Button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default PersonalInformationDialog;
