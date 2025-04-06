// "use client";

// import Link from "next/link";
// import React, { useRef } from "react";
// import { Button, InputBox } from "../components";
// import { Backend_URL } from "@/lib/Constants";

// type FormInputs = {
//   username: string;
//   email: string;
//   password: string;
// };

// const SignupPage = () => {
//   const register = async () => {
//     const res = await fetch(Backend_URL + "/auth/register", {
//       method: "POST",
//       body: JSON.stringify({
//         username: data.current.username,
//         email: data.current.email,
//         password: data.current.password,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (!res.ok) {
//       alert(res.statusText);
//       return;
//     }
//     const response = await res.json();
//     alert("User Registered!");
//     console.log({ response });
//   };
//   const data = useRef<FormInputs>({
//     username: "",
//     email: "",
//     password: "",
//   });

//   return (
//     <div className="m-2 border rounded overflow-hidden shadow">
//       <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">Sign up</div>
//       <div className="p-2 flex flex-col gap-6">
//         <InputBox
//           autoComplete="off"
//           name="username"
//           labelText="Username"
//           required
//           onChange={(e) => (data.current.username = e.target.value)}
//         />
//         <InputBox
//           name="email"
//           labelText="Email"
//           required
//           onChange={(e) => (data.current.email = e.target.value)}
//         />
//         <InputBox
//           name="password"
//           labelText="password"
//           type="password"
//           required
//           onChange={(e) => (data.current.password = e.target.value)}
//         />
//         <div className="flex justify-center items-center gap-2">
//           <Button onClick={register}>Submit</Button>
//           <Link className="" href={"/"}>
//             Cancel
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

"use client";

import Link from "next/link";
import React, { FormEvent, useRef } from "react";
import { Button, InputBox } from "../components";
import { Backend_URL } from "@/lib/Constants";
import { publicRequest } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

type FormInputs = {
  username: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const { toast } = useToast();

  const data = useRef<FormInputs>({
    username: "",
    email: "",
    password: "",
  });

  // Handle form submission
  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setLoading(true);
    try {
      const res = await publicRequest.post("/users", data.current);

      if (res.status === 201) {
        toast({
          title: "Registration Successful",
          description: "Your Registration was created successfully!",
        });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      // setLoading(false);
    }
  };

  return (
    <div className="m-2 border rounded overflow-hidden shadow">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">Sign up</div>
      <form className="p-2 flex flex-col gap-6" onSubmit={register}>
        <InputBox
          autoComplete="off"
          name="username"
          labelText="Username"
          required
          onChange={(e) => (data.current.username = e.target.value)}
        />
        <InputBox
          name="email"
          labelText="Email"
          required
          onChange={(e) => (data.current.email = e.target.value)}
        />
        <InputBox
          name="password"
          labelText="password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />

        <div className="flex justify-center items-center gap-2">
          <Button type="submit">Submit</Button>
          <Link className="" href={"/"}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
