import { isAxiosError } from "axios";

const catchAsyncError = (error) => {
  let errorMessage = error.message;
  if (isAxiosError(error)) {
    const errorResponse = error.response
      ? error.response.data
      : null;
    if (errorResponse && errorResponse.message)
      errorMessage = errorResponse.message;
  }
  return errorMessage;
};

export default catchAsyncError;
