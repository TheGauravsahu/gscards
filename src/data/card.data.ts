"use server";

import { db } from "@/lib/db";
import { Card } from "@prisma/client";

export const listCards = async (): Promise<Card[]> => {
  try {
    return await db.card.findMany();
  } catch (error: any) {
    console.log("--Error listing cards.", error);
    return error.message;
  }
};
