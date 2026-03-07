import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  deleteItem,
  packItem,
  clearItems,
}) {
  const [sort, setSort] = useState("quantity");
  let itemsNew = [];
  if (sort === "quantity")
    itemsNew = items
      .slice()
      .sort((a, b) => Number(a.quantity) - Number(b.quantity));
  else if (sort === "description")
    itemsNew = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  else if (sort === "packed")
    itemsNew = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {itemsNew.map((item) => (
          <Item
            item={item}
            key={item.id}
            deleteItem={deleteItem}
            packItem={packItem}
          />
        ))}
      </ul>
      <div className="action">
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="quantity">Sort by quantity</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button onClick={clearItems}>Clear List</button>
      </div>
    </div>
  );
}
