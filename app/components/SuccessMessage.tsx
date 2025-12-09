"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

export default function SuccessMessage({ message }: { message: string }) {
  const [show, setShow] = React.useState(true);
  const router = useRouter();
  const pathname = usePathname();
  React.useEffect(() => {
    if (!message) return;
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      router.replace(pathname);
    }, 2000);
    return () => clearTimeout(timer);
  }, [message, router, pathname]);

  if (!show || !message) return null;
  return (
    <div className="text-green-600 bg-green-50 border border-green-200 rounded-lg p-4 text-center mb-4">
      {message}
    </div>
  );
}
