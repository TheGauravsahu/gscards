import Gscard from "@/components/gscard";
import { Spotlight } from "@/components/ui/spotlight-new";
import { listCards } from "@/data/card.data";

export default async function Home() {
  const cards = await listCards();

  return (
    <>
      <div className="fixed left-0 right-0 top-0 bottom-0 -z-10 h-full w-full">
        <Spotlight />
        <div className="relative h-full w-full">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
      </div>

      <div className="mt-5 max-w-2xl text-center mx-auto">
        <h1 className="block font-bold  text-4xl md:text-5xl lg:text-6xl">
          Turn Ideas into Cards, Share the Magic.
        </h1>
      </div>

      <div className="mt-5 max-w-3xl text-center mx-auto">
        <p className="text-lg text-foreground/40">
          Get inspired or inpire others.
        </p>
      </div>

      <div className="my-4 mt-16 flex items-center gap-4 flex-wrap max-w-4xl  mx-auto justify-center md:justify-normal">
        {cards.map((card) => (
          <Gscard card={card} key={card.id} />
        ))}
      </div>
    </>
  );
}
