import { uploadFile } from "@/lib/uploadFile";
import { prisma } from "@/utils/prisma";
import { nanoid } from "nanoid";

export async function POST(req) {
  // bisa menerima file
  const formData = await req.formData();
  const files = formData.getAll("file");
  const author = formData.get("author");

  files.forEach(async (file) => {
    const id = nanoid();

    // Upload
    await uploadFile({ key: file.name, folder: id, body: file });

    // Insert to DB
    await prisma.file.create({
      data: {
        id,
        key: file.name,
        author,
      },
    });
  });

  return Response.json({ message: "Good!" });
}
