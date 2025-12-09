"use client";
import SuccessMessage from "../components/SuccessMessage";

export default function ProizvodiSuccess({ message }: { message?: string }) {
  if (!message) return null;
  return <SuccessMessage message={message} />;
}
