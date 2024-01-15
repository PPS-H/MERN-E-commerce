import { FaPlus  } from "react-icons/fa";

interface productProps {
  name: string;
  image: string;
  price: number;
  stock: number;
  id: string;
}
function ProductCard({ name, image, price, id, stock }: productProps) {
  return (
    <div className="w-[18rem] p-2 m-3 rounded shadow-lg relative">
        {/* <div className="absolute bg-slate-600 w-full h-full z-10 top-0 left-0 opacity-0 hover:opacity-30">
            
        </div> */}
        {/* <div className="absolute top-[50%] left-[50%] ml-[-25px] mt-[-25px] z-20">
        <FaPlus  className="text-3xl bg-white rounded-[100%]"/>
        </div> */}
        <div className="">
        <img src={image} alt="product-image" className=""/>
        <h5 className="text-xl text-center">{name}</h5>
        <p className="font-bold text-center text-lg">${price}</p>
    </div>
    </div>
  );
}

export default ProductCard;
