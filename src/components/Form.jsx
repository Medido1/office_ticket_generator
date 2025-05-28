function Form() {
  return (
    <form className="w-[40%] bg-blue-200 p-4">
      <div className="flex gap-4">
        <label htmlFor="type">
          Type d'analyses:
        </label>
        <select id="type" required
          className="bg-white">
          <option value="anapath">Anapath</option>
          <option value="Cytoponction">Cytoponction</option>
          <option value="fcv">FCV</option>
        </select>
      </div>
    </form>
  )
}

export default Form;