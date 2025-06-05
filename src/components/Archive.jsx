import { Link } from "react-router-dom";
import { FaFolderOpen } from "react-icons/fa";

function Archive() {
  const buttonStyle = `mt-4 px-8 py-2 rounded-full cursor-pointer border-black border-2
            bg-blue-200 font-bold hover:bg-blue-100 hover:scale-125 transition duration-100`
  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-white p-2 shadow-md
      rounded-lg w-[25%]">
      <h2 className="text-center text-xl font-bold">
        Archive d'analyses
      </h2>
      <Link to='/anapath'>
        <button
          className={buttonStyle}>
          <FaFolderOpen className="inline-block mr-2 mb-1" />Anapath
        </button>
      </Link>
      <Link to="/cytoponction">
        <button
          className={buttonStyle}>
          <FaFolderOpen className="inline-block mr-2 mb-1" />Cytoponction
        </button>
      </Link>
      <Link to="/fcv">
        <button
          className={buttonStyle}>
          <FaFolderOpen className="inline-block mr-2 mb-1" />F.C.V
        </button>
      </Link>
    </div>
  )
}

export default Archive;