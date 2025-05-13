import Link from "next/link";
import * as Yup from "yup";
import SigninWithPassword from "../SigninWithPassword";

// Initial form values
const initialValues = {
  email: "",
  password: "",
};

// Yup validation schema
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

// Handle form submit
const handleSubmit = (values: typeof initialValues) => {
  console.log("Form submitted:", values);
  // TODO: Call login API here
};

export default function Signin() {
  return (
    <>
      <div className="my-6 text-center">
        <h1 className="text-4xl font-bold text-black dark:text-white">
          Sign in with Email
        </h1>
      </div>

      <div>
        <SigninWithPassword
          handleSubmit={handleSubmit}
          validationSchema={validationSchema}
          loading={false} // Optional: You can toggle based on request status
          initialValues={{
            email: "",
            password: "",
            remember: false
          }}        />
      </div>

      <div className="mt-6 text-center">
        <p>
          Don’t have any account?{" "}
          <Link href="/" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}
