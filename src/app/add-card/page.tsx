"use client";

import * as React from "react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import LoadingButton from "@/components/loading-button";
import { addCard } from "@/actions/card.actions";
import { useRouter } from "next/navigation";

// Validation Schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type CardData = z.infer<typeof formSchema>;

export default function AddCard() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<CardData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: CardData) => {
    try {
      setLoading(true);
      await addCard(data);
      toast.success("Card added successfully!");
      form.reset();
      router.push("/");
    } catch (error) {
      toast.error("Failed to add card. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md w-full mx-auto p-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">
          Add a New Card
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* title */}
            <div>
              <FormField
                control={form.control}
                name="title"
                render={({ field: fieldProps }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter card title" {...fieldProps} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field: fieldProps }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter card description..."
                        {...fieldProps}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <LoadingButton pending={loading}>Add Card</LoadingButton>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="text-center text-sm text-gray-500">
        Organize your ideas with ease!
      </CardFooter>
    </Card>
  );
}
