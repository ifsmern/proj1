import React, { useState } from 'react';

const AddUser = () => {


    const [userDetail,setUserDetail] = useState({
        name:"",email:""
    });


    const onChange = (e) => {
        setUserDetail( {...userDetail, [e.target.id]:e.target.value});
    };

    const onClickhandler = async (e) => {
        console.log("button clicked");
        e.preventDefault();
        console.log(userDetail);
        let {name,email} = userDetail;
        //store in db
        //connect to server by opening fetch -post
        let result = await fetch('http://localhost:5000/adduser',{
                                method:"post",
                                body: JSON.stringify({name,email}),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept':'application/json'
                                    }
                                }
                                );
        result =  await result.json();
        console.warn(result);
        if(result){
            alert("User has been added! check db!")
        }


    }



    return (
        <div>
            <h1> Add new user</h1>
            Name <input type="text" name="txt_name" id="name" onChange={onChange} value={userDetail.name}/>
            Email <input type="text" name="txt_name" id="email" onChange={onChange} value={userDetail.email}/>
            <button type="submit" value="AddUser" onClick={onClickhandler}> Add User </button>
        </div>
    );
};

export default AddUser;