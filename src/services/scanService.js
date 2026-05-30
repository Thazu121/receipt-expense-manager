import axios from "axios";

const API_URL =
  "http://localhost:5000/api/scan";

export const uploadReceipt =
  async (file) => {

    const formData =
      new FormData();

    formData.append(
      "receipt",
      file
    );

    const response =
      await axios.post(
        API_URL,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };