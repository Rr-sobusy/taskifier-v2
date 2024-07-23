"use server";

import { signOut } from "@/auth";

export async function authSignOut() {
  await signOut();
}
