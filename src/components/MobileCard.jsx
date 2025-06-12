function MobileCard({client}) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg flex flex-col 
      gap-2 mb-2 w-[250px]">
      <div className="flex justify-between">
        <p>{client.date}</p>
        <p>N: {client.number}</p>
      </div>
      <p className="text-lg text-center">{client.name}</p>
      <div className="flex flex-col items-center">
        <p>Prix Total: {client.UnitPrice}DA</p>
        <p>Reste a payé: {client.toPay}DA</p>
      </div>
      <p className="text-center">{client.phoneNumber}</p>
    </div>
  )
}

export default MobileCard;