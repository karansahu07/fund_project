// "use client";
// import { EmailIcon, PasswordIcon } from "@/assets/icons";
// import Link from "next/link";
// import React, { useState } from "react";
// import InputGroup from "../FormElements/InputGroup";
// import { Checkbox } from "../FormElements/checkbox";
// import { useRouter } from "next/navigation";
// // import { Formik, Form } from "formik";
// // import * as from "yup";


// export default function SigninWithPassword({handleSubmit}) {

//   return (
//     <form onSubmit={handleSubmit}>
//       <InputGroup
//         type="email"
//         label="Email"
//         className="mb-4 [&_input]:py-[15px]"
//         placeholder="Enter your email"
//         name="email"
//         handleChange={handleChange}
//         value={data.email}
//         icon={<EmailIcon />}
//       />

//       <InputGroup
//         type="password"
//         label="Password"
//         className="mb-5 [&_input]:py-[15px]"
//         placeholder="Enter your password"
//         name="password"
//         handleChange={handleChange}
//         value={data.password}
//         icon={<PasswordIcon />}
//       />

//       <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
//         <Checkbox
//           label="Remember me"
//           name="remember"
//           withIcon="check"
//           minimal
//           radius="md"
//           onChange={(e) =>
//             setData({
//               ...data,
//               remember: e.target.checked,
//             })
//           }
//         />

//         <Link
//           href="/auth/forgot-password"
//           className="hover:text-primary dark:text-white dark:hover:text-primary"
//         >
//           Forgot Password?
//         </Link>
//       </div>

//       {error && (
//         <div className="mb-4 text-red-600 dark:text-red-400">{error}</div>
//       )}

//       <div className="mb-4.5">
//         <button
//           type="submit"
//           className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
//         >
//           Sign In
//           {loading && (
//             <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
//           )}
//         </button>
//       </div>
//     </form>
//   );
// }

"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputGroup from "@/components/FormikFields/formikinputgroup";
import { Checkbox } from "../FormElements/checkbox";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import Link from "next/link";

type Props = {
  handleSubmit: (values: any) => void;
  initialValues: {
    email: string;
    password: string;
    remember: boolean;
  };
  validationSchema: Yup.ObjectSchema<any>;
  error?: string;
  loading?: boolean;
};

export default function SigninWithPassword({
  handleSubmit,
  initialValues,
  validationSchema,
  error,
  loading,
}: Props) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <InputGroup
            type="email"
            label="Email"
            className="mb-4 [&_input]:py-[15px]"
            placeholder="Enter your email"
            name="email"
            icon={<EmailIcon />}
          />

          <InputGroup
            type="password"
            label="Password"
            className="mb-5 [&_input]:py-[15px]"
            placeholder="Enter your password"
            name="password"
            icon={<PasswordIcon />}
          />

          <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
            <Checkbox
              label="Remember me"
              name="remember"
              withIcon="check"
              minimal
              radius="md"
              // checked={values.remember}
              onChange={(e) => setFieldValue("remember", e.target.checked)}
            />

            <Link
              href="/auth/forgot-password"
              className="hover:text-primary dark:text-white dark:hover:text-primary"
            >
              Forgot Password?
            </Link>
          </div>

          {error && (
            <div className="mb-4 text-red-600 dark:text-red-400">{error}</div>
          )}

          <div className="mb-4.5">
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
            >
              Sign In
              {loading && (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

