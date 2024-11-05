import { isAxiosError } from "axios";

const returnErrorMessage = (error: unknown): string => {
  let errorMessage = "unknown error";

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  if (isAxiosError(error)) {
    errorMessage = error?.response?.data?.message
      ? error.response.data.message
      : errorMessage;
  }
  return errorMessage;
};

export default returnErrorMessage;
