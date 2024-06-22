import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  url: process.env.NEXT_PUBLIC_APPWRITE_URL,
};

export const client = new Client();

client.setEndpoint(String(appwriteConfig.url));
client.setProject(String(appwriteConfig.projectId));

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
