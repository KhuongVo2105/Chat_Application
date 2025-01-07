// src/utils/errorHandler.js
export const handleError = (error) => {
  let errorInfo = {
    code: null,
    message: 'An unexpected error occurred.',
    status: null,
    data: null,
    headers: null,
  };

  if (error.response) {
    // Server responded with a status code outside the range of 2xx
    const { status, data, headers } = error.response;
    errorInfo.status = status;
    errorInfo.data = data;
    errorInfo.headers = headers;

    if (data) {
      errorInfo.code = data.code;
      errorInfo.message = data.message || 'An error occurred.';
    }

    switch (status) {
      case 400:
        console.log(`[handleError] Bad Request: Code ${errorInfo.code}, Message: ${errorInfo.message}`);
        if (errorInfo.code === 1040) {
          console.log('[handleError] Specific error: Invalid input data.');
        } else {
          console.log('[handleError] General bad request. Please check the request parameters.');
        }
        break;

      case 401:
        console.log(`[handleError] Unauthorized: Code ${errorInfo.code}, Message: ${errorInfo.message}`);
        if (errorInfo.code === 1040) {
          console.log('[handleError] Specific error: Token expired or invalid.');
        } else {
          console.log('[handleError] General unauthorized access. Please log in again.');
        }
        break;

      case 403:
        console.log(`[handleError] Forbidden: Code ${errorInfo.code}, Message: ${errorInfo.message}`);
        console.log('[handleError] You do not have permission to access this resource.');
        break;

      case 404:
        console.log(`[handleError] Not Found: Code ${errorInfo.code}, Message: ${errorInfo.message}`);
        console.log('[handleError] The requested resource could not be found. Please check the URL.');
        break;

      case 409:
        console.log(`[handleError] Conflict: Code ${errorInfo.code}, Message: ${errorInfo.message}`);
        console.log('[handleError] There was a conflict with the current state of the resource.');
        break;

      case 500:
        console.log(`[handleError] Server Error: Code ${errorInfo.code}, Message: ${errorInfo.message}`);
        console.log('[handleError] An unexpected error occurred on the server. Please try again later.');
        break;

      case 502:
        console.log(`[handleError] Bad Gateway: Code ${errorInfo.code}, Message: ${errorInfo.message}`);
        console.log('[handleError] The server received an invalid response from the upstream server.');
        break;

      case 503:
        console.log(`[handleError] Service Unavailable: Code ${errorInfo.code}, Message: ${errorInfo.message}`);
        console.log('[handleError] The server is currently unable to handle the request due to temporary overload or maintenance.');
        break;

      case 504:
        console.log(`[handleError] Gateway Timeout: Code ${errorInfo.code}, Message: ${errorInfo.message}`);
        console.log('[handleError] The server did not receive a timely response from the upstream server.');
        break;

      default:
        console.error('[handleError] Error: Server responded with an error', errorInfo);
        break;
    }
  } else if (error.request) {
    // No response received from server
    console.error('[handleError] Network Error: No response received from server', {
      request: error.request,
    });

    errorInfo.message = 'No response received from the server. Please check your connection and try again.';
  } else {
    // Other errors
    console.error('[handleError] Error: An error occurred while setting up the request', {
      message: error.message,
    });

    errorInfo.message = `An unexpected error occurred:\n${error.message}`;
  }

  // Trả về thông tin lỗi
  return errorInfo;
};