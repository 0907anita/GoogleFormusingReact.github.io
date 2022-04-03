import React from 'react'
import { useState } from 'react'

const ReactContact = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
    });

    let name, value
    const getUserData = (event) => {
        name = event.target.name;
        value = event.target.value;

        setUser({...user, [name]: value})
    }

    const postData = async (e) =>{
        e.preventDefault();

        const {name, email, phone, address,  message} = user;

        if(name && email && phone && address &&  message){
            const res = await fetch(
                "https://reactform-e0d9d-default-rtdb.firebaseio.com/reactform.json",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               name,
               email,
               phone,
               address,
               message,
            }),
            }
            );
            if(res){
               setUser({
                   name: "",
                   email: "",
                   phone: "",
                   address: "",
                   message: "",
               });
               alert("Form Successfully Submitted");
            }
          
        } else{
            alert("Please fill all the details");
        }
    };
     

  return (
      <>
    <div className="container">
      <br/>
        <h1>Google</h1>
      <br/>
      <div id="form">
        <form required method='POST'>
          <div className="form-group">
            <label htmlFor="Name">Name</label>
            <input onChange={getUserData} value={user.name} placeholder='Enter your name...' name='name' type="text" className="form-control form-data" id="Name" />
          </div>
          <div className="form-group">
            <label htmlFor="Email">Email</label>
            <input onChange={getUserData} value={user.email} placeholder='Enter your email...' name='email' type="text" className="form-control form-data" id="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="Mob">Mob</label>
            <input onChange={getUserData} value={user.phone} placeholder='Enter your phone no...' name='phone' type="text" className="form-control form-data" id="Mob" />
          </div>
          <div className="form-group">
            <label htmlFor="Address">Address</label>
            <textarea onChange={getUserData} value={user.address} placeholder='Enter your address...' name='address' type="text" className="form-control form-data" id="Address" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea onChange={getUserData} value={user.message} placeholder='Enter your message...' name='message' type="text" className="form-control form-data" id="Message" />
          </div>
          <br/>
          <button type="button" className="btn btn-primary" onClick={postData} >Submit</button>
          {/* onClick={send_data()} */}
        </form>
      </div>
      </div>
      </>
  )
}

export default ReactContact