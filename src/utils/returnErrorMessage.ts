import { isAxiosError } from "axios";

const returnErrorMessage = (error: unknown): string => {
  let errorMessage = "unknown error";

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  if (isAxiosError(error)) {
    const errorResponse = error.response
      ? error.response.data
      : null;
    if (errorResponse && errorResponse.message === "string")
      errorMessage = errorResponse.message;
  }
  return errorMessage;
};

export default returnErrorMessage;
