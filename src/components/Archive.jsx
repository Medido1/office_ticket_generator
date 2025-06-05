import { Link } from "react-router-dom";

function Archive() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-white p-2 shadow-md
      rounded-lg w-[25%]">
      <Link to='/anapath'>
        <button
          className="mt-4 px-8 py-2 rounded-full cursor-pointer border-black border-2
            bg-blue-200 font-bold hover:bg-blue-100 hover:scale-125 transition duration-100">
          Anapath
        </button>
      </Link>
      <Link to="/cytoponction">
        <button
          className="mt-4 px-8 py-2 rounded-full cursor-pointer border-black border-2
            bg-blue-200 font-bold hover:bg-blue-100 hover:scale-125 transition duration-100">
          Cytoponction
        </button>
      </Link>
      <Link to="/fcv">
        <button
          className="mt-4 px-8 py-2 rounded-full cursor-pointer border-black border-2
            bg-blue-200 font-bold hover:bg-blue-100 hover:scale-125 transition duration-100">
          F.C.V
        </button>
      </Link>
      <button>

      </button>
    </div>
  )
}

export default Archive;