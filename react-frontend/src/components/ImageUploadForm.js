// src/components/ImageUploadForm.js

import React, { useState } from "react";
import axios from "axios";

const ImageUploadForm = () => {
  const [file, setFile] = useState(null);
  const [compressedImageURL, setCompressedImageURL] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    const apiUrl = process.env.REACT_APP_API_URL;
    formData.append("image", file);

    try {
      const response = await axios.post(
        apiUrl,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API Response:", response.data);
      setCompressedImageURL(response.data.download_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <h2>Image Compression</h2>
      <input type="file" accept=".jpg" onChange={handleFileChange} />
      <button onClick={handleUpload}>Compress Image</button>
      {compressedImageURL && (
        <div>
          <p>Compressed Image:</p>
          {/* <img src={compressedImageURL} alt="Compressed" /> */}
          <a href={compressedImageURL} download>
            Download Compressed Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
