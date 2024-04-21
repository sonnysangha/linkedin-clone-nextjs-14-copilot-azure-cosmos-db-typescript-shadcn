"use server";

import { AddPostRequestBody } from "@/app/api/posts/route";
import generateSASToken, { containerName } from "@/lib/generateSASToken";
import getURL from "@/lib/getUrl";
import { IUser } from "@/types/user";
import { BlobServiceClient } from "@azure/storage-blob";
import { currentUser } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { revalidateTag } from "next/cache";

export default async function createPostAction(formData: FormData) {
  const user = await currentUser();
  const postInput = formData.get("postInput") as string;
  const image = formData.get("image") as File;
  let image_url = undefined;

  if (!postInput) {
    throw new Error("Post input is required");
  }

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  if (image.size > 0) {
    console.log("Uploading image to Azure Blob Storage...", image);

    const accountName = process.env.AZURE_STORAGE_NAME;

    const sasToken = await generateSASToken();

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${sasToken}`
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);

    // generate current timestamp
    const timestamp = new Date().getTime();
    const file_name = `${randomUUID()}_${timestamp}.png`;

    const blockBlobClient = containerClient.getBlockBlobClient(file_name);

    try {
      const imageBuffer = await image.arrayBuffer();
      const res = await blockBlobClient.uploadData(imageBuffer);
      image_url = res._response.request.url;

      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  const body: AddPostRequestBody = {
    user: userDB,
    text: postInput,
    image: image_url,
  };

  const response = await fetch(getURL("/api/posts"), {
    method: "POST",
    body: JSON.stringify({ ...body }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  revalidateTag("posts");
}
