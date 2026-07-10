import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const registerSchema = Yup.object({
  name: Yup.string().min(2, "Too short").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

export const contactSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().min(10, "Please write a bit more").required("Message is required"),
});

export const applySchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  coverLetter: Yup.string()
    .min(40, "Please share a short cover letter")
    .required("Cover letter is required"),
  resume: Yup.mixed().required("Resume is required"),
});

export const jobSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  jobId: Yup.string().required("Job ID is required"),
  slug: Yup.string().required("Slug is required"),
  department: Yup.string().required("Department is required"),
  location: Yup.string().required("Location is required"),
  type: Yup.string()
    .oneOf(["FULL_TIME", "CONTRACT", "REMOTE"])
    .required("Type is required"),
  description: Yup.string().required("Description is required"),
  responsibilities: Yup.string().required("Responsibilities are required"),
  qualifications: Yup.string().required("Qualifications are required"),
  isActive: Yup.boolean(),
});
