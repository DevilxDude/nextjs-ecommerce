import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add Product - Flowmazon",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageURL = formData.get("imageURL")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageURL || !price) {
    throw new Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageURL,
      price,
    },
  });

  redirect("/");
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          name="name"
          placeholder="Name"
          required
          type="text"
          className="input input-bordered mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          name="imageURL"
          placeholder="Image URL"
          required
          type="url"
          className="input input-bordered mb-3 w-full"
        />
        <input
          name="price"
          placeholder="Price"
          required
          type="number"
          className="input input-bordered mb-3 w-full"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
