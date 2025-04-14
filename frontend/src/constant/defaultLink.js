export const defaultLink =
  "https://docs.google.com/forms/d/e/1FAIpQLSfKs1AfpUNM591y2wKODacMoENNU2QHJFu16zMQs6IDmCp-jQ/alreadyresponded";

const storageUrlToDownloadUrl = (url) => {
  if (!url) return url;
  const base = "https://zavodshow.ru/storage/uploads/rental/";
  const apiBase = "https://zavodshow.ru/api/rental/download/";

  if (url.startsWith(base)) {
    return url.replace(base, apiBase);
  }
  return url;
};

// In defaultLink.js
export const handleDownload = async (fileUrl, filename) => {
  fileUrl = storageUrlToDownloadUrl(fileUrl);
  if (!fileUrl) {
    console.error("No file URL provided");
    return;
  }

  const url =
    typeof fileUrl === "string" ? fileUrl : fileUrl.url || fileUrl.path || "";

  if (!url) {
    console.error("Could not determine file URL");
    return;
  }

  try {
    // Extract filename from URL if not provided
    const downloadFilename = filename || url.split("/").pop();

    // Fetch the file
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the blob data
    const blob = await response.blob();

    // Create a blob URL
    const blobUrl = window.URL.createObjectURL(blob);

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", downloadFilename);

    // Append to body, click and remove
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);

    console.log(`Download initiated for: ${downloadFilename}`);
  } catch (error) {
    console.error("Download failed:", error);
    // Fallback to normal download if blob fails
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename || "download");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
