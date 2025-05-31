function Form({changeType, setNumber, setName, setTotalPrice, setPayedSum}) {
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
          Numero :
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
          Nom :
        </label>
        <input
          onChange={(e) => setName(e.target.value)} 
          className="bg-white w-[35%] p-2 rounded border-grey-300 focus:outline-none
            focus:ring-2 focus:ring-blue-400"
          type="text" id="text"
        />
      </div>
      <div className="flex gap-4  items-center mt-4">
        <label htmlFor="totalPrice">
          Prix Total :
        </label>
        <select  
          onChange = {(e) => setTotalPrice(e.target.value)}
          id="totalPrice"
          className="bg-white p-2">
            <option value="2500">2500</option>
            <option value="2000">2000</option>
            <option value="1500">1500</option>
            <option value="1000">1000</option>
        </select>
      </div>
      <div className="flex gap-4 items-center mt-4">
        <label htmlFor="payedSum">
          Prix payée :
        </label>
        <input
          onChange={(e) => setPayedSum(e.target.value)} 
          className="bg-white w-[35%] p-2 rounded border-grey-300 focus:outline-none
            focus:ring-2 focus:ring-blue-400"
          type="number" id="payedSum"
        />
      </div>
    </form>
  )
}

export default Form;