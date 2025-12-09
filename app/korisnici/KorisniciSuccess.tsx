"use client";
import SuccessMessage from "../proizvodi/SuccessMessage";

export default function KorisniciSuccess({ message }: { message?: string }) {
  if (!message) return null;
  return <SuccessMessage message={message} />;
}
