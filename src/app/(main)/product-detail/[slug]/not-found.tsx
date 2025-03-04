"use client";
import Button from "@/components/atom/Button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  const handleClick = () => router.push("/");
  return (
    <div className="mt-[100px] flex flex-col items-center justify-center gap-y-10">
      <div className="flex flex-col items-center gap-y-4">
        <h3 className="text-center text-2xl font-bold text-secondary-700">
          404 | Coop Mart Cannot Find this Page
        </h3>
        <p className="text-center text-sm text-secondary-600">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
      </div>
      <div className="max-w-[250px]">
        <Button onClick={handleClick} className="w-fit">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
