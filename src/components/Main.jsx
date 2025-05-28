import Form from "./Form";
import Ticket from "./Ticket";


function Main() {
  return (
    <main className="p-4 flex gap-4 bg-gray-200">
      <Form />
      <Ticket
        type ="B"
      />
    </main>
  )
}

export default Main;