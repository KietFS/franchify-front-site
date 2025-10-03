import { setGlobalLoading } from "@/redux/slices/common";
import { useDispatch } from "react-redux";

const useGlobalLoading = () => {
  const dispatch = useDispatch();

  const showLoading = dispatch(setGlobalLoading(true));
  const hideLoading = dispatch(setGlobalLoading(false));

  return {
    showLoading,
    hideLoading,
  };
};

export default useGlobalLoading;
