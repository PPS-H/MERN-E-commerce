import { MdError } from "react-icons/md";

function NotFound() {
  return (
    <div className="text-center text-6xl mx-auto h-[50vh] flex flex-col justify-center">
      <MdError className="text-4xl mx-auto" size={80} />
      <h1>Page Not Found</h1>
    </div>
  );
}

export default NotFound;
