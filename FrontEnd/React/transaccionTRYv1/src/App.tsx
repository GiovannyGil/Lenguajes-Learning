import TransaForm from "./components/TransaForm"
import TransList from "./components/TransList"

function App() {
  return (
    <div className="bg-gray-700 h-screen text-white flex items-center justify-center">
      <div className="bg-gray-950 p-4 w-2/5">
        <h1 className="text-3xl font-bold text-center block my-2">Transacciones!</h1>

        <TransaForm />
        <TransList />

      </div>
    </div>
  )
}

export default App