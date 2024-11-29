import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { apiURL } from "@/constanst";

//@ts-ignore
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { currentStoreId,categoryId, page } = req.query;
    try {
    let url = `${apiURL}/products/by-store?storeId=${currentStoreId}&pageSize=8`;

    if (page) {
        url += `&page=${page}`;
      }
      if (categoryId) {
        url += `&category=${categoryId}`;
      }

      const response = await axios.get(
        url
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ message: "An error occurred" });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
