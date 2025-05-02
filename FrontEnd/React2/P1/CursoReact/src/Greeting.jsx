export function Greeting({ title }) {
  return <h1>{title}</h1>; // props son parametros de cada componente que los diferencia
}

export function UserCard({ name, amount, married, address }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>${amount}</p>
      <p>{married ? "Married" : "single"}</p>{" "}
      {/* condicional if/else simplificado */}
      <ul>
        <li>City: {address.city}</li>
        <li>Address: {address.street}</li>
      </ul>
    </div>
  );
}
