import React, { useState } from "react";
import "./App.css";
import { PlusCircle, Edit, Trash2 } from "react-feather";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

function App() {
  const blanckUser = {
    name: "",
    email: "",
    role: "",
    address: "",
  };

  const [Open, setOpen] = useState(false);
  const [User, setUser] = useState(blanckUser);
  const [userdata, setuserdata] = useState([]);
  const [action, setaction] = useState('Add');
  const [actionindex, setactionindex] = useState(null);
  const [EditIndex,setEditIndex]=useState(null)

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setaction("Add");
  };
  const adduser = () => {
    setuserdata([...userdata, User]);
    setUser(blanckUser);
    onCloseModal();
  };
   const edituser=(index)=>{
    setaction('Edit')

    const selectUser=userdata.find((x,i)=> i === index );
    setUser(selectUser)
    setEditIndex(index)
    onOpenModal()
   }

   const Updateuser=()=>{

    const newUsers=userdata.map((x,i)=>{
      if(i === EditIndex){
        x=User;

      }
      return x
    })
    setuserdata(newUsers)
    setUser(blanckUser)
    setEditIndex(null)
    onCloseModal()
}

   const DeleteUser=(index)=>{
    const newUsers=userdata.filter((x,i)=>{return i!= index})
    setuserdata(newUsers)
   }
return (
  <div className="container">
    <div className="d-flex">
      <h1>CRUD-APP</h1>
    </div>
    <div className="toolbar">
      <button className="btn" onClick={onOpenModal}>
        <PlusCircle size={16}></PlusCircle>
        <span>Add</span>
      </button>
    </div>
    <hr />
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {userdata.length > 0 &&
          userdata.map((User, index) => {
            return (
              <tr>
                <td>{User.name}</td>
                <td>{User.email}</td>
                <td>{User.role}</td>
                <td>{User.address}</td>
                <td>
                  <button className="btn ml2" onClick={() => edituser(index)}>
                    <Edit size={16}></Edit>
                    <span>Edit</span>
                  </button>
                  <button className="btn ml2" onClick={()=>DeleteUser(index)}>
                    <Trash2 size={16}></Trash2>
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
    <Modal open={Open} onClose={onCloseModal} center>
      <h2>{action} User</h2>
      <p>{JSON.stringify(User)}</p>
      <div className="form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={User.name}
          onChange={(e) => setUser({ ...User, name: e.target.value })}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={User.email}
          onChange={(e) => setUser({ ...User, email: e.target.value })}
        />
        <label htmlFor="role">Role</label>
        <input
          type="text"
          value={User.role}
          onChange={(e) => setUser({ ...User, role: e.target.value })}
        />
        <label htmlFor="adrees">Address</label>
        <textarea
          name="address"
          value={User.address}
          id=""
          onChange={(e) => setUser({ ...User, address: e.target.value })}
        ></textarea>
        { action === 'Add' &&<button className="btn" onClick={() => adduser()}>submit</button>}
        { action === 'Edit' &&<button className="btn" onClick={() => Updateuser()}>Update</button>}
        
      </div>
    </Modal>
  </div>
);
}
export default App;
