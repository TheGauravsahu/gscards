"use server";

import { CardData } from "@/app/add-card/page";
import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addCard = async (values: CardData) => {
  try {
    const user = await getUser();

    const card = await db.card.create({
      data: {
        title: values.title,
        content: values.description,
        userId: user?.id as string,
      },
    });
    revalidatePath("/");
    return card;
  } catch (error: any) {
    console.log("--Error creating a card.", error);
    return error.message;
  }
};
