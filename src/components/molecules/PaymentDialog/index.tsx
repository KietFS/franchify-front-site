import React from "react";
import CustomDialog from "../CustomDialog";

interface IFormValue {
  province: any;
  district: any;
  ward: any;
  address: string;
  shippingFee: number;
}

interface IPaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmited?: (values: IFormValue) => void;
}

const PaymentDialog: React.FC<IPaymentDialogProps> = (props) => {
  const { open, onClose } = props;

  return (
    <>
      {open ? (
        <CustomDialog
          title="Phương thức thanh toán"
          open={open}
          onClose={onClose}
          children={<div className="flex flex-col gap-y-2"></div>}
        />
      ) : null}
    </>
  );
};

export default PaymentDialog;
