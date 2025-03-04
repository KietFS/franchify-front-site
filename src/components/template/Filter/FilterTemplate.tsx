"use client"

import React from "react";
import FilterBar from "@/components/organisms/FilterBar/FilterBar";
import ProductFilterGrid from "@/components/organisms/ProductFilterGrid/ProductFilterGrid";


interface IFilterTemplateProps {
    keyword: string;
    category: string;
}

const FilterTemplate: React.FC<IFilterTemplateProps> = (props) => {
    const { keyword, category } = props;

    console.log('keyword', keyword);
    console.log('categories', category);

    return (
        <div>
            <div className="flex flex-col justify-center gap-x-[80px] gap-y-8 px-8 laptop:flex-row max-w-[1200px]">
                <div className="laptop:max-w-[340px] w-full max-w-auto">
                    <FilterBar />
                </div>
                <div className="laptop:max-w-[780px] w-full max-w-auto">
                    <ProductFilterGrid />
                </div>
            </div>
        </div>
    );
}

export default FilterTemplate;