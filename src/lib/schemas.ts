import * as z from "zod";
import { addDays, format } from "date-fns";

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required." })
        .email({ message: "Please enter a valid email." }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});

export const RegisterSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    email: z
        .string()
        .min(1, { message: "Email is required." })
        .email({ message: "Please enter a valid email." }),
    password: z.string().min(1, {
        message: "Password is required.",
    }).min(6, {
        message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(1, {
        message: "Confirm password is requred.",
    }),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
});

// Images
const MAX_IMAGE_SIZE = 5242880; // 5 MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];
const imageFile = z.object({
    file: z
        .custom<FileList>()
        .refine((fileList) => fileList.length === 1, 'Expected file')
        .transform((file) => file[0] as File)
        .refine((file) => {
            return file.size <= MAX_IMAGE_SIZE;
        }, `File size should be less than 1gb.`)
        .refine(
            (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
            'Only these types are allowed .jpg, .jpeg, .png, .webp and mp4',
        ),
});
export const HotelSchema = z.object({
    name: z.string(),
    description: z.string(),
    type: z.string(),
    city: z.string(),
    country: z.string(),
    pricePerNight: z.number(),
    starRating: z.number(),
    adultCount: z.number(),
    childCount: z.number(),
    facilities: z.array(z.string()),
    imageFiles: z.array(imageFile),
    imageUrls: z.array(z.string()).optional(),
});

export const SearchSchema = z.object({
    destination: z.string(),
    adultCount: z.number().min(1, {
        message: "Atleast minimum 1 adult."
    }),
    childCount: z.number(),
    checkIn: z.date({
        required_error: "Check in date is required",
        invalid_type_error: "It's not a date!",
      }),
    checkOut: z.date({
        required_error: "Check out date is required",
        invalid_type_error: "It's not a date!",
      })
});


