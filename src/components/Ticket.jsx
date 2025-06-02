import { forwardRef } from "react";

const Ticket = forwardRef(({type, number, name, totalPrice, payedSum}, ref) => {
  const currentDay = new Date().toLocaleDateString(`fr-FR`, {
    year: `numeric`,
    month: `long`,
    day: `numeric`
  })

  return (
    <div 
      ref={ref}
      className="print-ticket bg-white p-4 flex flex-col gap-2 items-center rounded-md shadow-md">
      <h1>
        Laboratoire D'analyse Médical Dr Gherib
      </h1>
      <p>
      د. غريب اسماعيل 
      </p>
      <p>
      طبيب اخصائي
      </p>
      <div className="flex justify-between self-stretch">
        <p className="text-lg">
          {currentDay}
        </p>
        <p className="text-xl">
          {type}
        </p>
        <p className="text-lg font-bold">
          {number}
        </p>
      </div>
      <p className="text-2xl text-center my-4 font-bold ">
          {name}
      </p>
      <div className="self-start flex gap-4">
        <p>
          Prix Total:
        </p>
        <p>
          {totalPrice}
        </p>
      </div>
      <div className="self-start flex gap-4">
        <p>
          Prix Payée:
        </p>
        <p>
          {payedSum}DA
        </p>
      </div>
      <div className="self-start flex items-center gap-4">
        <p>
          Reste a payer:
        </p>
        <p className="font-bold text-xl">
          {totalPrice - payedSum}DA
        </p>
      </div>
    </div>
  )
})

export default Ticket;