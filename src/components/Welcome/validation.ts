import { z } from "zod";

export const step1Schema = z
  .object({
    fname: z
      .string()
      .min(2, { message: "First name is required" })
      .max(25, { message: "First name cannot exceed 25 characters" }),
    lname: z
      .string()
      .min(2, { message: "Last name is required" })
      .max(25, { message: "Last name cannot exceed 25 characters" }),
    username: z
      .string()
      .min(4, { message: "Username has to exceed 4 characters" })
      .max(20, { message: "Username cannot exceed 20 characters" })
      .regex(/^[a-z0-9\\-\\_]+$/, {
        message: "Username can only have letters, numbers, - or _",
      }),

    email: z.string().email({ message: "Please enter a valid email address" }),
    birthdate: z.string().refine((dateString) => {
      const birthDate = new Date(dateString);
      if (isNaN(birthDate.getTime())) return false;

      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      const hasBirthdayOccurred =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() >= birthDate.getDate());

      return hasBirthdayOccurred ? age >= 18 : age - 1 >= 18;
    }, "You must be at least 18 years old"),
    gender: z
      .string()
      .regex(/^[M,F]/, { message: "Gender has to be either M or F" }),
    password: z
      .string()
      .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character (!@#$%^&*)",
      }),
    password_confirm: z.string(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords do not match",
  });

export const step2Schema = z.object({
  countrycode: z
    .string()
    .regex(/^[a-z]{2}$/, { message: "Country code is required" }),
  address: z
    .string()
    .min(1, { message: "Address is required" })
    .max(50, { message: "Address cannot exceed 50 characters" })
    .optional(),
  city: z
    .string()
    .min(1, { message: "City is required" })
    .max(50, { message: "City cannot exceed 50 characters" })
    .optional(),

  phone: z
    .string()
    .min(1, { message: "Phone has to exceed 8 characters" })
    .max(26, { message: "Phone cannot exceed 26 characters" })
    .regex(/^\+?[0-9]+$/, {
      message: "Phone number must contain only numbers and may start with +",
    })
    .min(7, { message: "Phone number is too short" })
    .max(20, { message: "Phone number is too long" }),
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
