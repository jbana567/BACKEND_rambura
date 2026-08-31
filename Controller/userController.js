 const express=require("express");
//-------------------------------------------------
//  --------- GET USER FORM CONTROLLER------------------------
//---------------------------------
const get_users=async(req,res)=>{
    const department=[];
    const get=await db.collection("department").find().forEach((element)=>{
     users.push(element)
    });
    res.json(users);
}

//-------------------------------------------------
//  --------- GET SINGLE USER FROM CONTROLLER------------------------
//---------------------------------
const get_user=async(req,res)=>{
   
}




//-------------------------------------------------
//  --------- ADD USER FROM CONTROLLER------------------------
//---------------------------------
const add_user=async(req,res)=>{

}




//-------------------------------------------------
//  ---------  UPDATING USER FROM CONTROLLER------------------------
//---------------------------------

const update_user=async(req,res)=>{

}



//-------------------------------------------------
//  --------- DELETE USER FROM CONTROLLER------------------------
//---------------------------------
const delet_user=async(req,res)=>{

}




