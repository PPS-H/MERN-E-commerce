import { useState } from "react";
import Input from "../components/admin/Common/Input";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-hot-toast";
import { getUser, useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse, UserResponse } from "../types/ApiTypes";
import { FaGoogle } from "react-icons/fa";

function Login() {
  const [gender, setGender] = useState<string>("");
  const [dob, setDOB] = useState<string>("");
  const [login] = useLoginMutation();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      console.log(user);
      let data;
      try {
        data = await getUser(user.uid);
      } catch (error) {}
      if (!data) {
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
      }
    } catch (error) {
      toast.error("Sign in failed");
    }
  };
  return (
    <>
      <div className=" h-[90vh] w-full">
        <div className="flex justify-center items-center">
          <div className="w-[30%] py-3 px-5">
            <h4 className="heading text-black text-3xl font-semibold">Login</h4>
            <div className="my-5">
              <div className=""></div>
              <label htmlFor="gender" className="block">
                Gender:{" "}
              </label>
              <select
                name="gender"
                id="gender"
                className="border border-black rounded py-1 px-2 w-full mt-2"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="my-5">
              <Input
                type="date"
                id="date"
                name="date"
                labelText="Date of birth:"
                classesForLabel="block"
                classesForInput="py-1 px-2 border border-black rounded w-full mt-2"
                handleChange={(e) => {
                  setDOB(e.target.value);
                }}
              />
            </div>

            <button
              className="bg-black text-white rounded p-2 flex items-center justify-center mt-5 w-full"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle />
              <span className="ml-2">Sign in with google</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;