import { handleError, apiClient } from "../utils";

export const getContactInfo = async () => {
  try {
    const response = await apiClient.get("/contact");
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error fetching team data:", err);
  }
};

export const updateContactInfo = async (formdata) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await apiClient.post("/contact", formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200)
      throw new Error(`Unexpected response status: ${response.status}`);
    return response.data;
  } catch (err) {
    handleError("Error updating team:", err);
  }
};
