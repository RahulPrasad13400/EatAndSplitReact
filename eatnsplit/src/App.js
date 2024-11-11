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
  const [selectedFriend,setSelectedFriend] = useState(null)

  function handleShowAddFriend(){
    setShowAddFriend(show=>!show)
  }
  function handleFriends(friend){
    setFriends((friends)=>[...friends,friend])
    setShowAddFriend(false)
  }

  function handleSelection(friend){
    setSelectedFriend(selected=>selected?.id===friend.id?null:friend)
    setShowAddFriend(false)
    
  }

  function handleSplitBill(value){
    setFriends(friends=>friends.map(friend=>friend.id === selectedFriend.id ? {...friend,balance:friend.balance+value} : friend))
    setSelectedFriend(null)
  }

  return <div className="app">
    <div className="sidebar">
      <FriendList friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend}/>
      {showAddFriend && <FormAddFriend onAddFriends={handleFriends}/>}
      <Button onClick={handleShowAddFriend}>{showAddFriend?'Close':'Add Friend'}</Button>
    </div>
    {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill}/>}
  </div> 
}

function FriendList({friends,onSelection, selectedFriend}){
  return <ul>
    {friends.map(friend=><Friend friend={friend} onSelection={onSelection} selectedFriend={selectedFriend} key={friend.id}/>)}
  </ul>

}

function Friend({friend,onSelection, selectedFriend}){
  const isSelected = selectedFriend && selectedFriend.id === friend.id
  return <li className={isSelected?'selected':''}>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    {friend.balance<0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)}</p>}
    {friend.balance>0 && <p className="green">{friend.name} owes you {friend.balance}</p>}
    {friend.balance === 0 && <p className="black">You and {friend.name} are even</p>}
    <Button onClick={()=>onSelection(friend)}>{isSelected?'close':'select'}</Button>
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

function FormSplitBill({selectedFriend, onSplitBill}){
  const [bill, setBill] = useState("")
  const [paidByUser,setPaidByUSer] = useState('')
  const [whoIsPaying, setWhoIsPaying] = useState("user")
  const paidByFriend = bill ? bill-paidByUser : '' 
  function handleSubmit(e){
    e.preventDefault()
    if(!bill || !paidByUser) return

    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
    
  }
  return <form action="" className="form-split-bill" onSubmit={handleSubmit }>
    <h2>Split a bill with {selectedFriend.name}</h2>
    <label htmlFor="">Bill Value</label>
    <input type="text" name="" id="" value={bill} onChange={(e)=>setBill(e.target.value)} />
    <label htmlFor="">Your Expense</label>
    <input type="text" name="" id="" value={paidByUser} onChange={(e)=>setPaidByUSer(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))} />
    <label htmlFor="">{selectedFriend.name}'s Expense</label>
    <input type="text" disabled name="" id="" value={paidByFriend} />
    <label htmlFor="">Who is paying</label>
    <select name="" id="" value={whoIsPaying} onChange={(e)=>setWhoIsPaying(e.target.valuev)}>
      <option value="user">You</option>
      <option value="friend">{selectedFriend.name}</option>
    </select>
    <Button>Split Bill</Button>
  </form>
}
export default App;
