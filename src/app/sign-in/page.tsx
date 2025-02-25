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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import LoadingButton from "@/components/loading-button";

// Singup Schema
const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SigninData = z.infer<typeof formSchema>;

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SigninData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: SigninData) => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          setLoading(false);
          toast.success("Signin successfull.");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setLoading(false);
        },
      }
    );
  };

  return (
    <Card className="max-w-md w-full mx-auto p-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">
          Login to your Account
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {["email", "password"].map((field, index) => (
              <div key={index}>
                <FormField
                  control={form.control}
                  name={field as keyof SigninData}
                  render={({ field: fieldProps }) => (
                    <FormItem>
                      <FormLabel>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`Enter your ${field}`}
                          {...fieldProps}
                          type={
                            field === "password"
                              ? "password"
                              : field === "email"
                              ? "email"
                              : "text"
                          }
                          autoComplete={
                            field === "password" ? "current-password" : "email"
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <LoadingButton pending={loading}>Signin</LoadingButton>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="text-center">
        <p className="text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
