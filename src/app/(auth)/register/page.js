import React from "react";
import { registerAction } from "../action";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form action={registerAction}>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Register
        </button>
      </form>
    </div>
  );
}
