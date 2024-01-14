import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className='w-full'>
      <ul className='flex items-center justify-end'>
        <Li className='p-2 m-2' text='Home' url="/"/>
        <Li className='p-2 m-2' text='Products' url="/products"/>
      </ul>
    </div>
  )
}

interface LiProps{
  className:string,
  text:string,
  url:string
}
const Li=({className,text,url}:LiProps)=>{
  return(
    <li className={className}>
      <Link to={url}>{text}</Link>
    </li>
  );
}

export default Navbar
