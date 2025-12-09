"use client";
import PorudzbineSuccess from "./PorudzbineSuccess";

export default function PorudzbineSuccessWrapper({ message }: { message?: string }) {
  return <PorudzbineSuccess message={message} />;
}
