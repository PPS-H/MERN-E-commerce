import { MessageResponse } from "../../types/ApiTypes";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";

type ResponseType =
  | {
      data: MessageResponse;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: ResponseType,
  navigate: NavigateFunction | null,
  url: string
) => {
  if ("data" in res) {
    toast.success(res.data.message);
    if (navigate) navigate(url);
  } else {
    const err = res.error as FetchBaseQueryError;
    const msg = (err.data as MessageResponse).message;
    toast.error(msg);
  }
};
