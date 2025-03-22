import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "ecom-website" });

export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };
    await connectDB()
    await User.create(userData);
  }
);

export const syncUserUpdate = inngest.createFunction(
  {
    id: "update-user-from-clerk",
  },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,  
      email: email_addresses[0].email,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };
    await connectDB()
    await User.findOneAndUpdate(id, userData);
  }
);

export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
  },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await connectDB()
    await User.findByIdAndDelete(id);
  }
);
