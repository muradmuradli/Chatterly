import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable Next.js default body parsing
export const config = { api: { bodyParser: false } };

export async function POST(req: Request) {
  // Parse form data
  const formData = await req.formData();
  const file = formData.get("file") as Blob;

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  // Convert file to buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    // Upload the file to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }).end(buffer);
    });

    // Return the uploaded image URL
    return new Response(JSON.stringify(uploadResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Upload to Cloudinary failed", { status: 500 });
  }
}
