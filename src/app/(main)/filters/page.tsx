"use client";

import Head from "next/head";
import { useParams } from "next/navigation";

const FilterPage = () => {
  const params = useParams();
  console.log("params is", params);
  return (
    <Head>
      <title>Filter Page</title>
      <div>
        <h1>Filter Page</h1>
      </div>
    </Head>
  );
};

export default FilterPage;
