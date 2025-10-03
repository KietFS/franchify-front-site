import useCategory from "@/hooks/useCategories";
import Link from "next/link";
import React, { useEffect } from "react";

interface MiddleBarProps {}

const MiddleBar: React.FC<MiddleBarProps> = (props) => {
  const { listCategory, getCategories } = useCategory();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="border-seconday-500 hidden h-[50px] w-full items-center justify-center gap-x-4 border-b bg-primary-600 shadow-lg laptop:flex laptop:pb-0">
      {listCategory?.map((category: any, categoryIndex: number) => {
        if (categoryIndex < 4) {
          return (
            <Link
              key={`link-${category}`}
              href={`/filter?categories=${category?.id}`}
            >
              <p className="text-md font-semibold text-secondary-500">
                {category?.name}
              </p>
            </Link>
          );
        }
      })}
    </div>
  );
};

export default MiddleBar;
