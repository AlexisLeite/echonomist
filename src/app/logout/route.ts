import { deleteSession } from "@/session/session";
import { redirect } from "next/navigation";

export const GET = async () => {
  await deleteSession();
  redirect("/");
};
