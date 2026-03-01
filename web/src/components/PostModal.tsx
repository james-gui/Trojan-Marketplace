"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Code, MapPin, DollarSign, Clock, Layers } from "lucide-react";
import { useSession } from "next-auth/react";
import { createListing } from "@/app/actions";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Form Schema
const formSchema = z.object({
    type: z.enum(["Offer", "Request"]),
    title: z.string().min(5, "Title must be at least 5 characters.").max(60, "Title is too long"),
    description: z.string().min(10, "Description must be at least 10 characters.").max(300, "Description is too long"),
    price: z.string().min(1, "Price is required"),
    location: z.string().min(2, "Location is required"),
    time: z.string().min(2, "Time constraint is required"),
    category: z.string().min(2, "Category is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function PostModal({
    children,
    onSubmitCallback
}: {
    children: React.ReactNode;
    onSubmitCallback?: (data: any) => void;
}) {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "Request",
            title: "",
            description: "",
            price: "",
            location: "",
            time: "",
            category: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        if (!session?.user?.email) {
            alert("You must be signed in to post a request.");
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                ...data,
                price: parseFloat(data.price),
                posterName: session.user.name || "Anonymous USC Student",
                posterEmail: session.user.email,
                posterImage: session.user.image || undefined,
            };

            const result = await createListing(payload as any);

            if (result.success) {
                if (onSubmitCallback) {
                    // Pass back the augmented payload so the UI updates immediately
                    onSubmitCallback({
                        ...payload,
                        id: result.id,
                        status: "Open"
                    });
                }
                setOpen(false);
                form.reset();
            } else {
                console.error(result.error);
                alert("Failed to create the listing.");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    const currentType = form.watch("type");

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-slate-950 border-slate-800 p-0 overflow-hidden text-slate-200">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        Create a Listing
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 pt-2 overflow-y-auto max-h-[80vh] space-y-6">

                        {/* Type Toggle */}
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex p-1 bg-slate-900 rounded-lg border border-slate-800">
                                            {(["Request", "Offer"] as const).map((type) => {
                                                const isActive = field.value === type;
                                                return (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        onClick={() => field.onChange(type)}
                                                        className={`flex-1 relative py-2 text-sm font-semibold rounded-md transition-colors ${isActive ? "text-slate-950" : "text-slate-400 hover:text-slate-200"
                                                            }`}
                                                    >
                                                        {isActive && (
                                                            <motion.div
                                                                layoutId="modal-type-bg"
                                                                className="absolute inset-0 bg-white shadow-sm rounded-md"
                                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                            />
                                                        )}
                                                        <span className="relative z-10">{type}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="space-y-4">
                            {/* Title */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">Listing Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={currentType === "Request" ? "e.g., Need someone to fix my bike" : "e.g., I'll clean your room"}
                                                className="bg-slate-900 border-slate-800 focus-visible:ring-emerald-500/50"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-xs" />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">Details</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Provide some details about what you need or what you are offering..."
                                                className="resize-none h-24 bg-slate-900 border-slate-800 focus-visible:ring-emerald-500/50"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-xs" />
                                    </FormItem>
                                )}
                            />

                            {/* Grid for smaller inputs */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Price */}
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-300">Price ($)</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                                                    <Input type="number" step="0.50" placeholder="0.00" className="pl-9 bg-slate-900 border-slate-800 focus-visible:ring-emerald-500/50" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-400 text-xs" />
                                        </FormItem>
                                    )}
                                />

                                {/* Location */}
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-300">Location</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                                                    <Input placeholder="e.g., USC Village" className="pl-9 bg-slate-900 border-slate-800 focus-visible:ring-emerald-500/50" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-400 text-xs" />
                                        </FormItem>
                                    )}
                                />

                                {/* Time */}
                                <FormField
                                    control={form.control}
                                    name="time"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-300">Time / Deadline</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                                                    <Input placeholder="e.g., ASAP or Tonight" className="pl-9 bg-slate-900 border-slate-800 focus-visible:ring-emerald-500/50" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-400 text-xs" />
                                        </FormItem>
                                    )}
                                />

                                {/* Category */}
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-300">Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="bg-slate-900 border-slate-800 focus:ring-emerald-500/50">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                                                    <SelectItem value="Food Delivery">Food Delivery</SelectItem>
                                                    <SelectItem value="Tutoring">Tutoring</SelectItem>
                                                    <SelectItem value="Transportation">Transportation</SelectItem>
                                                    <SelectItem value="Rentals">Rentals</SelectItem>
                                                    <SelectItem value="Errands">Errands</SelectItem>
                                                    <SelectItem value="Labor">Labor</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-red-400 text-xs" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Button disabled={isSubmitting} type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-6 rounded-xl shadow-lg shadow-emerald-500/20">
                            {isSubmitting ? "Posting..." : (currentType === "Offer" ? "Post Offer" : "Submit Request")}
                        </Button>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
