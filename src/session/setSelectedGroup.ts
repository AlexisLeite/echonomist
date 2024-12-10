import { createSession, verifySession } from "./session";

export async function setSelectedGroup(current: number, selectedGroup: number) {
  const session = await verifySession();
  if (session.isAuth) {
    createSession({ ...session, selectedGroup });
    return selectedGroup;
  }
  return -1;
}
