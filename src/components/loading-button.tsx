import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps {
  pending: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function LoadingButton({
  children,
  pending,
  onClick,
}: LoadingButtonProps) {
  return (
    <Button
      onClick={onClick}
      type="submit"
      disabled={pending}
    >
      {pending && <Loader2 className="animate-spin w-5 h-5" />}
      {children}
    </Button>
  );
}
