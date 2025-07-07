"use server";

import {
  createSession,
  deleteSession,
  getCurrentSession,
  verifyPassword,
} from "@/services/auth";
import { createUser, getUserByEmail } from "@/services/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { google } from "@/lib/arctic";
import * as arctic from "arctic";

export async function loginAction(_, formData) {
  const cookieStore = await cookies();

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email dan password dibutuhkan" };
  }

  const getWithPassword = true;
  const user = await getUserByEmail(email, getWithPassword);

  if (!user) {
    return { error: "User tidak ditemukan" };
  }

  const isPasswordValid = await verifyPassword(password, user.password);

  if (!isPasswordValid) {
    return { error: "Password tidak valid" };
  }

  const session = await createSession(user.id);
  cookieStore.set("session", session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  redirect("/dashboard");
}

export async function registerAction(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return { error: "Nama, email, dan password dibutuhkan" };
  }

  if (password.length < 8) {
    return { error: "Password harus minimal 8 karakter" };
  }

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User sudah terdaftar" };
  }

  const user = await createUser(name, email, password);
  return { success: "User berhasil terdaftar", user };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const session = await getCurrentSession();

  if (session) {
    // delete session dari database
    await deleteSession(session.id);
  }

  // clear cookie
  cookieStore.delete("session");

  // pindah ke login
  redirect("/login");
}

export async function googleLoginAction() {
  const cookieStore = await cookies();

  const state = arctic.generateState();
  const codeVerifier = arctic.generateCodeVerifier();
  const scopes = ["openid", "profile", "email"];
  const url = google.createAuthorizationURL(state, codeVerifier, scopes);

  cookieStore.set("codeVerifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 5,
    path: "/",
  });

  redirect(url);
}
