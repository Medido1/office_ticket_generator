function Form({changeType, setNumber, setName}) {
  return (
    <form className="w-[40%] bg-blue-200 p-4">
      <div className="flex gap-4 mb-4">
        <label htmlFor="type">
          Type d'analyses:
        </label>
        <select 
          onChange = {(e) => changeType(e.target.value)}
          id="type"
          className="bg-white">
          <option value="anapath">Anapath</option>
          <option value="Cytoponction">Cytoponction</option>
          <option value="fcv">FCV</option>
        </select>
      </div>
      <div className="flex gap-4 items-center mb-4">
        <label htmlFor="number">
          Numero
        </label>
        <input 
          onChange={(e) => setNumber(e.target.value)}
          className="bg-white w-[25%] p-2 rounded border-grey-300 focus:outline-none
            focus:ring-2 focus:ring-blue-400"
          type="number" 
          id="number" />
      </div>
      <div className="flex gap-4 items-center">
        <label htmlFor="name">
          Nom
        </label>
        <input
          onChange={(e) => setName(e.target.value)} 
          className="bg-white w-[35%] p-2 rounded border-grey-300 focus:outline-none
            focus:ring-2 focus:ring-blue-400"
          type="text" id="text"
        />
      </div>
    </form>
  )
}

export default Form;