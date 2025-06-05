import { Link } from "react-router-dom";

function Archive() {
  const buttonStyle = `mt-4 px-8 py-2 rounded-full cursor-pointer border-black border-2
            bg-blue-200 font-bold hover:bg-blue-100 hover:scale-125 transition duration-100`
  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-white p-2 shadow-md
      rounded-lg w-[25%]">
      <Link to='/anapath'>
        <button
          className={buttonStyle}>
          Anapath
        </button>
      </Link>
      <Link to="/cytoponction">
        <button
          className={buttonStyle}>
          Cytoponction
        </button>
      </Link>
      <Link to="/fcv">
        <button
          className={buttonStyle}>
          F.C.V
        </button>
      </Link>
    </div>
  )
}

export default Archive;