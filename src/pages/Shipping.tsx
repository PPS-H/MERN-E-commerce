import { useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/ReducerTypes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Input from "../components/admin/Common/Input";
import { IoArrowBackSharp } from "react-icons/io5";


function Shipping() {
    const navigate = useNavigate();
  //   const { cartItems } = useSelector(
  //     (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  //   );
  //   useEffect(() => {
  //     if (cartItems.length <= 0) return navigate("/cart");
  //   }, [cartItems]);
  return (
      <div>
        <div className="text-white bg-black rounded-[100%] absolute p-3 top-5 left-5 text-lg" onClick={()=>{
            navigate("/cart")
        }}><IoArrowBackSharp/></div>
      <h2 className="heading text-2xl">Shipping Adderess</h2>
      <div className="flex flex-col space-y-4 w-[24rem] justify-center mx-auto my-8">
        <Input
          type="text"
          id="address"
          name="address"
          value=""
          classesForInput="border p-1 border-black rounded"
          placeholder="Address"
          isRequired={true}
          handleChange={() => {}}
        />
        <Input
          type="text"
          id="city"
          name="city"
          value=""
          classesForInput="border p-1 border-black rounded"
          placeholder="City"
          isRequired={true}
          handleChange={() => {}}
        />

        <select
          name="country"
          id="country"
          className="border p-1 border-black rounded"
        >
          <option value="">Select Country</option>
          <option value="india">India</option>
        </select>
        <Input
          type="text"
          id="state"
          name="state"
          value=""
          classesForInput="border p-1 border-black rounded"
          placeholder="State"
          isRequired={true}
          handleChange={() => {}}
        />
        <Input
          type="text"
          id="pincode"
          name="pincode"
          value=""
          classesForInput="border p-1 border-black rounded"
          placeholder="Pin Code"
          isRequired={true}
          handleChange={() => {}}
        />
        <button className="text-white bg-black rounded py-2 text-md">Proceed</button>
      </div>
    </div>
  );
}

export default Shipping;
