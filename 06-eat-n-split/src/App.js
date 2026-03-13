import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friendList, setFriendList] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [currentFriend, setCurrentFriend] = useState(null);
  function handleAddFriend(friend) {
    setFriendList((r) => [...r, friend]);
    setShowAddFriend(false);
  }

  function onSelectFriend(friend) {
    setCurrentFriend((r) => (r?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(fee) {
    setFriendList((r) =>
      r.map((f) =>
        f.id === currentFriend.id ? { ...f, balance: f.balance + fee } : f,
      ),
    );
    setCurrentFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friendList={friendList}
          currentFriend={currentFriend}
          onSelectFriend={onSelectFriend}
        />
        {showAddFriend && <AddFriend addFriend={handleAddFriend} />}
        <Button click={() => setShowAddFriend(!showAddFriend)}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {currentFriend && (
        <SplitBill
          selectedFriend={currentFriend}
          handleSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendList({ friendList, currentFriend, onSelectFriend }) {
  return (
    <ul>
      {friendList.map((r) => (
        <Friend
          friend={r}
          currentFriend={currentFriend}
          onSelectFriend={onSelectFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, currentFriend, onSelectFriend }) {
  const selected = friend.id === currentFriend?.id;
  return (
    <li className={selected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}${" "}
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}${" "}
        </p>
      )}
      {friend.balance === 0 && <p> You and {friend.name} are even </p>}
      <Button click={() => onSelectFriend(friend)}>
        {selected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function AddFriend({ addFriend }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48");
  function handleAddFriend(e) {
    e.preventDefault();
    if (!name || !imageUrl) return;
    const id = crypto.randomUUID;
    const friend = {
      id: id,
      name: name,
      image: `${imageUrl}` + `${id}`,
      balance: 0,
    };
    addFriend(friend);
    setName("");
    setImageUrl("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>🌄 Image URL</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function SplitBill({ selectedFriend, handleSplitBill }) {
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const friendExpense = bill ? bill - yourExpense : "";
  const [whoPay, setWhoPay] = useState("user");
  function onSplitBill(e) {
    e.preventDefault();
    if (!bill || !yourExpense) return;
    handleSplitBill(whoPay === "user" ? friendExpense : -yourExpense);
  }
  return (
    <form className="form-split-bill" onSubmit={onSplitBill}>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>
      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) =>
          setYourExpense((y) =>
            Number(e.target.value) > bill ? y : Number(e.target.value),
          )
        }
      ></input>
      <label>👫 {selectedFriend.name}'s expense</label>
      <input type="text" value={friendExpense} disabled></input>
      <label>🤑 Who is paying the bill</label>
      <select value={whoPay} onChange={(e) => setWhoPay(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>split</Button>
    </form>
  );
}
function Button({ children, click }) {
  return (
    <button className="button" onClick={click}>
      {children}
    </button>
  );
}
