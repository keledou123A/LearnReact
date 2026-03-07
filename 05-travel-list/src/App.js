import { useState } from "react";
import Stats from "./Stats";
import PackingList from "./PackingList";
import Form from "./Form";
import Logo from "./Logo";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  function handelItems(item) {
    setItems((items) => [...items, item]);
  }
  function handelRemoveItems(id) {
    setItems((items) => items.filter((r) => r.id !== id));
  }
  function handelPackItems(id) {
    setItems((items) =>
      items.map((r) => (r.id === id ? { ...r, packed: !r.packed } : r)),
    );
  }
  function handelClearItems() {
    const confirmed = window.confirm("Are you sure to clear the list?");
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form addItems={handelItems} />
      <PackingList
        items={items}
        deleteItem={handelRemoveItems}
        packItem={handelPackItems}
        clearItems={handelClearItems}
      />
      <Stats items={items} />
    </div>
  );
}
