import prisma from "@/lib/prisma";

import { hashPassword } from "./auth";

export async function createUser(name, email, password) {
  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export async function updateUser(id, updateData) {
  const { id: _, ...safeUpdateData } = updateData;

  // Remove undefined, null, and empty string values
  const cleanData = Object.fromEntries(
    Object.entries(safeUpdateData).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );

  const user = await prisma.user.update({
    where: { id },
    data: cleanData,
    select: {
      id: true,
      name: true,
      email: true,
      updatedAt: true,
    },
  });

  return user;
}

export async function checkEmailExists(email, excludeUserId) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
    },
  });

  if (!user) {
    return false;
  }

  if (excludeUserId && user.id === excludeUserId) {
    return false;
  }

  return true;
}

export async function getUserByEmail(email, withPassword = false) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: withPassword,
    },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: withPassword ? user.password : undefined,
  };
}

export async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
