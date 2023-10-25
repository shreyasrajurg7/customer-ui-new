import axios from "axios";

const API_BASE_URL =
  "https://customer-ui-api-dot-vaulted-bivouac-311707.wl.r.appspot.com";
const BASIC_AUTH_HEADER = "Basic ZmlyZXN0b3JlLXVzZXI6SVpzOEAwNCVwIzIxSA==";




async function makeRequest(
  endpoint,
  queryParams = {},
  method = "get",
  data = null
) {
  // Manually construct the query parameter string
  const queryString = Object.keys(queryParams)
    .map((key) => {
      if (Array.isArray(queryParams[key])) {
        // If the value is an array, join its elements using commas
        return `${key}=${queryParams[key].join(",")}`;
      } else {
        return `${key}=${encodeURIComponent(queryParams[key])}`;
      }
    })
    .join("&");

  const url = `${API_BASE_URL}/${endpoint}?${queryString}`;

  try {
    const response = await axios.request({
      method,
      url,
      headers: {
        Authorization: BASIC_AUTH_HEADER,
        "Content-Type": "application/json",
      },
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}



// API functions with named exports
export const getDistinctPatientsData = async (
  search_key,
  search_value,
  batchRequestDocumentId,
  emailId,
  currentSessionId
) => {
  try {
    return await makeRequest("get_distinct_patients_data", {
      search_key,
      search_value,
      batchRequestDocumentId,
      emailId,
      currentSessionId,
    });
  } catch (error) {
    // Handle error as needed
    console.error("Error in getDistinctPatientsData:", error);
    throw error; // Re-throw the error to be handled at a higher level
  }
};

export const getPatientsCallData = async (memberId, emailId, currentSessionId, batchRequestDocumentId) => {
  try {
    // Manually construct the filter_columns parameter as a single string
    const filter_columns = "['call_id','call_start_time','call_end_time','caller_handler.caller_handler_type','member_id','payload']";

    // Create the request parameters object
    const requestParams = {
      filter_columns,
      emailId,
      currentSessionId,
    };

    // Conditionally add batchRequestDocumentId to the request parameters
    if (memberId) {
      requestParams.memberId = memberId;
    }
    if (batchRequestDocumentId) {
      requestParams.batchRequestDocumentId = batchRequestDocumentId;
    }

    return await makeRequest("get_patients_metadata", requestParams);
  } catch (error) {
    console.error("Error in getPatientsCallData:", error);
    throw error;
  }
};


export const getCallHistory = (
  call_id,
  emailId,
  currentSessionId
) => {
  try {
    const call_columns = "['call_duration', 'white_sheet','call_transcription_fragment','call_start_time','call_end_time','call_id','batch_request_document_id','call_audio_url', 'overall_call_metadata']"
    return makeRequest("get_call_history", {
      call_columns,
      call_id,
      emailId,
      currentSessionId,
    });
  } catch (error) {
    console.error("Error in getCallHistory:", error);
    throw error;
  }
};

export const getCallAndProcessData = async (emailId, currentSessionId, batch_request_id) => {
  try {
    return await makeRequest("get_call_and_process_data", {
      emailId,
      currentSessionId,
      batch_request_id
    });
  } catch (error) {
    console.error("Error in getCallAndProcessData:", error);
    throw error;
  }
};

export const getErrorData = async (batch_request_id, emailId, currentSessionId) => {
  try {
    return await makeRequest("get_error_data", {
      batch_request_id,
      emailId,
      currentSessionId,
    });
  } catch (error) {
    console.error("Error in getErrorData:", error);
    throw error;
  }
};

export const getProviderData = async (emailId, currentSessionId) => {
  try {
    return await makeRequest("get_provider_metadata", {
      emailId,
      currentSessionId,
    });
  } catch (error) {
    console.error("Error in getProviderData:", error);
    throw error;
  }
};

export const getBatchData = async (providerId, emailId, currentSessionId) => {
  try {
    return await makeRequest("get_batch_data", {
      providerId,
      emailId,
      currentSessionId,
    });
  } catch (error) {
    console.error("Error in getCustomerData:", error);
    throw error;
  }
};

export const insertUserActivity = async (
  emailId,
  activityType,
  forceFlag,
  sessionId
) => {
  try {
    return await makeRequest(
      "insert_user_activity",
      { emailId, activityType, forceFlag, sessionId },
      "post"
    );
  } catch (error) {
    console.error("Error in insertUserActivity:", error);
    throw error;
  }
};

export const pushProviderPayorData = async (
  requestData,
  emailId,
  currentSessionId
) => {
  try {
    return await makeRequest(
      "push_provider_payor_data",
      { emailId, currentSessionId },
      "post",
      JSON.stringify(requestData)
    );
  } catch (error) {
    console.error("Error in pushProviderPayorData:", error);
    throw error;
  }
};

export const pushProviderPatientData = async (
  requestData,
  emailId,
  currentSessionId,
  batch_request_id
) => {
  try {
    return await makeRequest(
      "push_provider_patient_data",
      { emailId, currentSessionId, batch_request_id },
      "post",
      JSON.stringify(requestData)
    );
  } catch (error) {
    console.error("Error in pushProviderPayorData:", error);
    throw error;
  }
};

export const pushDataToFileBucket = async (requestData, emailId, currentSessionId, batch_request_id) => {
  const data = {
    "data": requestData
  }
  try {
    const response = await axios({
      method: "POST",
      url: `${API_BASE_URL}/push_file_to_bucket`,
      data,
      params: { emailId, currentSessionId, batch_request_id },
      headers: {
        "Content-Type": "application/json",
        Authorization: BASIC_AUTH_HEADER,
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getCustomerUiRbca = async (role, emailId, currentSessionId) => {
  try {
    return await makeRequest("get_customer_ui_rbca", {
      role,
      emailId,
      currentSessionId,
    });
  } catch (error) {
    console.error("Error in getCustomerUiRbca:", error);
    throw error;
  }
};

export const getAllCustomerUiRbca = async (emailId, currentSessionId) => {
  try {
    return await makeRequest("get_customer_ui_rbca", {
      emailId,
      currentSessionId,
    });
  } catch (error) {
    console.error("Error in getCustomerUiRbca:", error);
    throw error;
  }
};

export const addUserRole = async (requestData, emailId, currentSessionId) => {
  debugger
  try {
    const response = await axios({
      method: "POST",
      url: `${API_BASE_URL}/post_customer_ui_rbca`,
      data: requestData,
      params: { emailId, currentSessionId },
      headers: {
        "Content-Type": "application/json",
        Authorization: BASIC_AUTH_HEADER,
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateUserRole = async (requestData, emailId, currentSessionId) => {
  try {
    const response = await axios({
      method: "PUT",
      url: `${API_BASE_URL}/update_customer_ui_rbca`,
      data: requestData,
      params: { emailId, currentSessionId },
      headers: {
        "Content-Type": "application/json",
        Authorization: BASIC_AUTH_HEADER,
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteUserRole = async (requestData, emailId, currentSessionId) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `${API_BASE_URL}/delete_customer_ui_rbca`,
      data: requestData,
      params: { emailId, currentSessionId },
      headers: {
        "Content-Type": "application/json",
        Authorization: BASIC_AUTH_HEADER,
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};


export const getCallAUDIO = (audio_url, emailId, currentSessionId) => {
  if(audio_url) {
    try {
      const response = axios({
        method: "GET",
        url: `${API_BASE_URL}/get_audio_response`,
        params: { audio_url, emailId, currentSessionId },
      });
      return response;
    } catch (error) {
      return error;
    }
  }
};

export const getCustomerUiUser = async (emailId, currentSessionId, email) => {
  const requestParams =  {
    emailId,
    currentSessionId
  }
  if(email) {
    requestParams.email = email;
  }
  try {
    return await makeRequest("get_customer_ui_user", requestParams);
  } catch (error) {
    console.error("Error in getCustomerUiRbca:", error);
    throw error;
  }
};

export const addCustomerUiUser = async (requestData, emailId, currentSessionId) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_BASE_URL}/post_customer_ui_user`,
      data: requestData,
      params: { emailId, currentSessionId },
      headers: {
        "Content-Type": "application/json",
        Authorization: BASIC_AUTH_HEADER,
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};


export const updateCustomerUiUser = async (requestData, emailId, currentSessionId) => {
  try {
    const response = await axios({
      method: "PUT",
      url: `${API_BASE_URL}/update_customer_ui_user`,
      data: requestData,
      params: { emailId, currentSessionId },
      headers: {
        "Content-Type": "application/json",
        Authorization: BASIC_AUTH_HEADER,
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteCustomerUiUser = async (email, emailId, currentSessionId) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `${API_BASE_URL}/delete_customer_ui_user`,
      params: { emailId, currentSessionId, email },
      headers: {
        "Content-Type": "application/json",
        Authorization: BASIC_AUTH_HEADER,
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};