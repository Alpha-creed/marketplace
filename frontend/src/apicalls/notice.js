import { axiosInstance } from "./axiosInstance";

//add a notification
export const AddNotification = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/notifications/notify",
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//get all notification by user
export const GetAllNotice = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/notifications/get-all-notice"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//delete a notification
export const DeleteNotice = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/notifications/delete-notice/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//read all notification by user
export const ReadAllNotice = async () => {
  try {
    const response = await axiosInstance.put(
      "/api/notifications/read-all-notice"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
