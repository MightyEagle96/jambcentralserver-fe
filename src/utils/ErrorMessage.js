export const getErrorMessage = (errObj) => {
  const errResponse = errObj.response || null;

  const errorMessage =
    errResponse === null
      ? "Error Encountered: Contact Admin for resolution"
      : errResponse &&
        errResponse.data &&
        errResponse.data.message &&
        errResponse.data.message.message
      ? errResponse.data.message.message
      : errResponse.data.message
      ? errResponse.data.message
      : "Error Encountered: Contact Admin for resolution";

  return errorMessage;
};
