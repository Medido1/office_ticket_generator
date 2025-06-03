import { Link } from "react-router-dom";

function Archive() {
  const labels = ['Anapath', 'Cytoponction', 'F.C.V'];
  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-white p-2 shadow-md
      rounded-lg w-[25%]">
      <Link to='/Anapath'>
        <button
          className="mt-4 px-8 py-2 rounded-full cursor-pointer border-black border-2
            bg-blue-200 font-bold hover:bg-blue-100 hover:scale-125 transition duration-100">
          Anapath
        </button>
      </Link>
      <Link to="/Cytoponction">
        <button
          className="mt-4 px-8 py-2 rounded-full cursor-pointer border-black border-2
            bg-blue-200 font-bold hover:bg-blue-100 hover:scale-125 transition duration-100">
          Cytoponction
        </button>
      </Link>
      <Link to="/FCV">
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