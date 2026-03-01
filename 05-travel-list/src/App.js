import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  function handelItems(item) {
    setItems((items) => [...items, item]);
  }
  return (
    <div className="app">
      <Logo />
      <Form addItems={handelItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 💼</h1>;
}

function Form({ addItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handelSubmit(e) {
    e.preventDefault();
    if (!description) return;
    addItems({
      id: new Date(),
      description: description,
      quantity: quantity,
      packed: false,
    });
    //setDescription("");
    //setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handelSubmit}>
      <h3>what do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((r) => (
          <option value={r} key={r}>
            {r}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="test"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>add</button>
    </form>
  );
}

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list,and you already packed X (X%)</em>
    </footer>
  );
}
