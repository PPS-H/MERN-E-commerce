import { useState } from "react";
import Input from "../components/admin/Common/Input";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-hot-toast";
import { useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/ApiTypes";

function Login() {
  const [gender, setGender] = useState<string>("");
  const [dob, setDOB] = useState<string>("");
  const [login] = useLoginMutation();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      console.log(user);

      const res = await login({
        name: user.displayName!,
        email: user.email!,
        role: "user",
        photo: user.photoURL!,
        _id: user.uid,
        dob,
        gender,
      });

      if ("data" in res) {
        toast.success(res.data.message);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
    } catch (error) {
      toast.error("Sign in failed");
    }
  };
  return (
    <>
      <label htmlFor="gender">Gender: </label>
      <select
        name="gender"
        id="gender"
        className="border"
        onChange={(e) => {
          setGender(e.target.value);
        }}
      >
        <option value=""></option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <Input
        type="date"
        id="date"
        name="date"
        labelText="Date of birth:"
        classesForLabel="inline"
        classesForInput="p-1 border"
        handleChange={(e) => {
          setDOB(e.target.value);
        }}
      />

      <button
        className="bg-black text-white rounded p-2"
        onClick={handleGoogleSignIn}
      >
        Sign in with google
      </button>
    </>
  );
}

export default Login;
