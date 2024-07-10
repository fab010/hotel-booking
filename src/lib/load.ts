import cloudinary from "@/config/cloudinary";

export async function uploadImages(imageFiles: File[]) {
    const uploadPromises = imageFiles.map(async (image: File) => {
      const b64 = Buffer.from(new Uint8Array(await image.arrayBuffer())).toString("base64");
      let dataURI = "data:" + image.type + ";base64," + b64;
      const res = await cloudinary.uploader.upload(dataURI);
      return res.url;
    });
  
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  }
