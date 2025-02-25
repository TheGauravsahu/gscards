import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps {
  pending: boolean;
  children: React.ReactNode;
}

export default function LoadingButton({
  children,
  pending,
}: LoadingButtonProps) {
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="animate-spin w-5 h-5" />}
      {children}
    </Button>
  );
}
