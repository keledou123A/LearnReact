export default function Stats({ items }) {
  const numItem = items.length;
  const numPacked = items.filter((r) => r.packed).length;
  const numPercent = Math.round((numPacked / numItem) * 100);
  return (
    <footer className="stats">
      <em>
        {numPercent === 100
          ? "You got everything! Ready to go ✈"
          : `💼 You have ${numItem} items on your list,and you already packed
        ${numPacked} (${numPercent}%)`}
      </em>
    </footer>
  );
}
