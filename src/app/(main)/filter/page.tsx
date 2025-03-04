"use client";

import Head from "next/head";
import { useSearchParams } from "next/navigation";
import FilterTemplate from "@/components/template/Filter/FilterTemplate";

const FilterPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const keyword = searchParams.get("keyword") || "";

  return (
      <>
          <Head>
              <title>Filter Page</title>
          </Head>
              <FilterTemplate keyword={keyword} category={category}/>
      </>

  );
};

export default FilterPage;