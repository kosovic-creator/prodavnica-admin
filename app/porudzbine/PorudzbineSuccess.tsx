"use client";
import { useEffect, useState } from "react";

export default function PorudzbineSuccess({ message }: { message?: string }) {
  const [show, setShow] = useState(!!message);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!show || !message) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded shadow">
      {message}
    </div>
  );
}
