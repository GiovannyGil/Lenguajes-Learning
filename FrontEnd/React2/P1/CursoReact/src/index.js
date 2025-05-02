import React from "react"; // usar react
import ReactDOM from "react-dom/client"; // usar react para interfaces WEB


// import { Greeting, UserCard } from "./Greeting";
// import Product, { Navbar } from "./Product";
// import { Button } from "./boton";
// import { TaskCard } from "./Task";
// import { Saludar } from "./Saludar";
// import { Posts } from "./Posts";
import { Counter } from "./Counter";
const root = ReactDOM.createRoot(document.getElementById("root")); // crear un elemento root

// arreglos/arrays
// arreglos de usuarios

// const user = [
//   {
//     id: 1,
//     name: "Gio",
//     image: "https://robohash.org/User1",
//   },
//   {
//     id: 2,
//     name: "Ryan",
//     image: "https://robohash.org/User2",
//   },
//   {
//     id: 3,
//     name: "Joe",
//     image: "https://robohash.org/User3",
//   },
// ];



root.render(
  <>

    <Counter/>
  
    {/* {user.map((user, i) => {
      return (
      <div key={i}>
        <h1>{user.name}</h1>
        <img src={user.image} />
      </div>);
    })} */}

    {/* <Posts /> */}

    {/* <TaskCard ready={true}/> */}
    {/* <Saludar/> */}
    {/* <Button text='Botón Uno'/> */}

    {/* <UserCard
        name="Gio"
        amount={3000}
        married={true}
        points={[99, 33.3, 22.2]}
        address={{ street: "123 Main street", city: "Medellín" }}
      /> */}
  </>
);
