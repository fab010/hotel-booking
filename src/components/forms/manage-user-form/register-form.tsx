"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { toast } from "sonner";
import { RegisterSchema } from "@/lib/schemas";
import { register } from "@/lib/actions/user.action";


const RegisterForm = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");


    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        startTransition(() => {
            register(values)
                .then((data) => {
                    if (data?.success) {
                        form.reset();
                        toast.success(data.success);
                        router.push("/login");
                    }

                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }



                })
                .catch(() => setError("Something went wrong"));
        });
    };


    return (
        <div className="flex flex-col gap-3 rounded-lg px-10 py-4 shadow-[black] shadow-lg">
            <h2 className="text-xl font-semibold text-center">Register</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="flex flex-col text-sm font-medium">
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="text"
                                            className="w-full h-8"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="flex flex-col text-sm font-medium">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="text"
                                            className="w-full h-8"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex flex-col text-sm font-medium">
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
                                <FormItem className="flex flex-col text-sm font-medium">
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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="flex flex-col text-sm font-medium">
                                    <FormLabel>Confirm Password</FormLabel>
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
                        Create Account
                    </Button>
                </form>
            </Form>
            <Link href="/login" className="text-muted-foreground text-sm">
                Have an account? <span className="underline text-slate-700 font-medium">Login</span>
            </Link>
        </div>
    );
}

export default RegisterForm;