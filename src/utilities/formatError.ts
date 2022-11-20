// Function that allow us to send the Error in the catch block in the response
const formatError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  } else {
    return error;
  }
};

export default formatError;
