import Gscard from "@/components/gscard";
import { listCards } from "@/data/card.data";

export default async function Home() {
  const cards = await listCards();

  return (
    <div>
      <h1></h1>
      <div className="my-4 flex items-center gap-4 flex-wrap">
        {cards.map((card) => (
          <Gscard card={card} key={card.id} />
        ))}
      </div>
    </div>
  );
}
