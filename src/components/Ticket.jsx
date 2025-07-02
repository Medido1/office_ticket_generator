import { forwardRef } from "react";
import phoneIcon from "/telephone.png";
import {GlobalContext} from "../context/GlobalContext";
import { useContext } from "react";

const Ticket = forwardRef(({type, number, name, UnitPrice, payedSum}, ref) => {
  const currentDay = new Date().toLocaleDateString(`fr-FR`, {
    year: `numeric`,
    month: `long`,
    day: `numeric`
  })

  const {isMulti, numberOfTests, totalPrice} = useContext(GlobalContext);

  return (
    <div 
      ref={ref}
      className="print-ticket bg-white p-4 py-8 flex 
      flex-col gap-2 items-center rounded-md shadow-md">
      <h1 className="text-center">
        Laboratoire D'analyse Médical Dr Gherib
      </h1>
      <p>
      د. غريب اسماعيل 
      </p>
      <p>
      طبيب اخصائي
      </p>
      <div className="flex items-center gap-4 mb-2">
        <img src={phoneIcon} className="w-5" alt="phone icon" />
        <p>06.96.10.02.00</p>
      </div>
      <div className="flex justify-between self-stretch">
        <p className="text-lg">
          {currentDay}
        </p>
        {!isMulti &&
          <p className="text-xl">
          {type}
          </p>
        }
        {!isMulti && 
          <p className="text-lg font-bold">
          {number}
          </p>
        }
        {isMulti &&
          <p>{numberOfTests} {type}</p>
        }
      </div>
      <p className="text-2xl text-center my-4 font-bold ">
          {name}
      </p>
      <div className="self-start flex gap-4">
        <p>
          Prix Total:
        </p>
        <p>
          {isMulti ? totalPrice ? totalPrice: "" : UnitPrice}DA
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
          {isMulti ? totalPrice ? (totalPrice - payedSum): "" : UnitPrice - payedSum}DA
        </p>
      </div>
      <p className="text-sm text-center">
        وراء محكمة الوئام مقابل مسجد عبدالله بن عمر ـ الأغواط ـ
      </p>
    </div>
  )
})

export default Ticket;