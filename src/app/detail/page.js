import React from "react";
import ReactMarkdown from "react-markdown";
import { getCurrentSession } from "@/services/auth";
import { redirect } from "next/navigation";
import { getDeckById } from "@/services/deck";
import PDFViewer from "./PDFViewer";
import Link from "next/link";
import ViewDetail from "./ViewDetail";

const page = async () => {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login");
  }

  const deck = await getDeckById(
    "cmcyiq3hd0005xqtwvuf8v7ai",
    "cmct87hch0000qpoz4as12ynq"
  );

  // console.log(deck.filePath);

  return <ViewDetail deck={deck} />;
};

export default page;
