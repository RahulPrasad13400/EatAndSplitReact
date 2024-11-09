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

function Button({children,onClick}){
  return <button className="button" onClick={onClick}>{children}</button>
}

function App() {
  const [friends,setFriends] = useState(initialFriends)
  const [showAddFriend,setShowAddFriend] = useState(false)
  function handleShowAddFriend(){
    setShowAddFriend(show=>!show)
  }
  function handleFriends(friend){
    setFriends((friends)=>[...friends,friend])
    setShowAddFriend(false)
  }

  return <div className="app">
    <div className="sidebar">
      <FriendList friends={friends} />
      {showAddFriend && <FormAddFriend onAddFriends={handleFriends}/>}
      <Button onClick={handleShowAddFriend}>{showAddFriend?'Close':'Add Friend'}</Button>
    </div>
    <FormSplitBill />
  </div> 
}

function FriendList({friends}){
  return <ul>
    {friends.map(friend=><Friend friend={friend} key={friend.id}/>)}
  </ul>

}

function Friend({friend}){
  return <li>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    {friend.balance<0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)}</p>}
    {friend.balance>0 && <p className="green">{friend.name} owes you {friend.balance}</p>}
    {friend.balance === 0 && <p className="black">You and {friend.name} are even</p>}
    <Button>select</Button>
  </li>
}

function FormAddFriend({onAddFriends}){
  const [name,setName] = useState('')
  const [image,setImage] = useState("https://i.pravatar.cc/48")
  function handleSubmit(e){
    const id=crypto.randomUUID()
    e.preventDefault()
    if(!name || !image) return 
    const newFriend = {
      name,
      image : `{image}?=${id}`,
      balance : 0,
      id
    }
    onAddFriends(newFriend)
    setName('')
    setImage("https://i.pravatar.cc/48")

  }
  return <form action="" className="form-add-friend" onSubmit={handleSubmit}>
    <label htmlFor="">Friend Name</label>
    <input type="text" name="" id="" value={name} onChange={(e)=>setName(e.target.value)}/>
    <label htmlFor=""> Image Url</label>
    <input type="text" name="" id="" value={image} onChange={(e)=>setImage(e.target.value)}/>
    <Button>Add</Button>
  </form>
}

function FormSplitBill(){
  return <form action="" className="form-split-bill">
    <h2>Split a bill with X</h2>
    <label htmlFor="">Bill Value</label>
    <input type="text" name="" id="" />
    <label htmlFor="">Your Expense</label>
    <input type="text" name="" id="" />
    <label htmlFor="">X's Expense</label>
    <input type="text" disabled name="" id="" />
    <label htmlFor="">Who is paying</label>
    <select name="" id="">
      <option value="user">You</option>
      <option value="friend">X</option>
    </select>
    <Button>Split Bill</Button>
  </form>
}
export default App;
