import { Card as CardType } from "@prisma/client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface GscardProps {
  card: CardType;
}

export default function Gscard({ card }: GscardProps) {
  return (
    <Card className="relative w-60 h-60 shadow-lg overflow-hidden cursor-pointer group flex items-center justify-center">
      <div className="absolute top-4 right-4  hover:text-red-500 transition-colors duration-300 cursor-pointer">
        <Heart size={16} />
      </div>

      <CardTitle className="absolute text-lg font-semibold transition-opacity duration-300 group-hover:opacity-0">
        {card.title}
      </CardTitle>

      <CardContent className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <p>{card.content}</p>
      </CardContent>
    </Card>
  );
}
