"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "next-auth";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/lib/schemas";
import { login } from "@/lib/actions/auth.action";


const LoginForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");


    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        startTransition(() => {
            login(values, callbackUrl)
                .then((data) => {
                    if (data && data?.error) {
                        form.reset();
                        setError(data?.error);
                    }

                })
                .catch((error) => {
                    if (error instanceof AuthError && error.type === "CredentialsSignin") {
                        setError("Invalid credentials!");
                    }
                    setError("Something went wrong!");
                });
        });
    };


    return (
        <div className="flex flex-col gap-4 rounded-lg px-10 py-4 shadow-[black] shadow-lg mt-4">
            <h2 className="text-xl font-semibold text-center">Login</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="text-sm font-medium">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="email"
                                            className="w-full h-8"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="text-sm font-medium">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="password"
                                            className="w-full h-8"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    {error && (<span className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                        {error}
                    </span>
                    )}
                    <Button
                        disabled={isPending}
                        type="submit"
                        size="lg"
                        className="bg-blue-600 text-white w-full font-semibold text-lg rounded-lg hover:bg-blue-500"
                    >
                        Login
                    </Button>
                </form>
            </Form>
            <Link href="/register" className="text-muted-foreground text-sm">
                {"Don't have an account?"} <span className="underline text-slate-700 font-medium">Register</span>
            </Link>
        </div>
    );
}

export default LoginForm;