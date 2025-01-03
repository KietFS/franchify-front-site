import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { apiURL } from "@/constanst";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { storeId, upc } = req.query || {};

  console.log("req.query", req.body);
  console.log("storeId", storeId);
  console.log("upc", upc);

  try {
    const response = await fetch(
      `${apiURL}/products/detail?upc=${upc}&storeId=${storeId}`,
      {
        method: "GET",
        next: {
          revalidate: 60,
        },
      },
    );

    if (response) {
      console.log("api response", response);
    }
    return response?.json();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: "An error occurred" });
    }
  }
}
