 const express=require("express");
//-------------------------------------------------
//  --------- GET USER FORM CONTROLLER------------------------
//---------------------------------
const getusers=async(req,res)=>{
    const users=[];
    const get=await db.collection("user").find().forEach((element)=>{
     users.push(element)
    });
    res.json(users);
}

//-------------------------------------------------
//  --------- GET SINGLE USER FROM CONTROLLER------------------------
//---------------------------------
const getuser=async(req,res)=>{
   
}




//-------------------------------------------------
//  --------- ADD USER FROM CONTROLLER------------------------
//---------------------------------
const adduser=async(req,res)=>{

}




//-------------------------------------------------
//  ---------  UPDATING USER FROM CONTROLLER------------------------
//---------------------------------

const updatetuser=async(req,res)=>{

}



//-------------------------------------------------
//  --------- DELETE USER FROM CONTROLLER------------------------
//---------------------------------
const deletwuser=async(req,res)=>{

}




