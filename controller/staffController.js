 const express=require("express");
//-------------------------------------------------
//  --------- GET USER FORM CONTROLLER------------------------
//---------------------------------
const get_staffs=async(req,res)=>{
    const staff=[];
    const get=await db.collection("staff").find().forEach((element)=>{
     users.push(element)
    });
    res.json(users);
}

//-------------------------------------------------
//  --------- GET SINGLE USER FROM CONTROLLER------------------------
//---------------------------------
const get_staff=async(req,res)=>{
   
}




//-------------------------------------------------
//  --------- ADD USER FROM CONTROLLER------------------------
//---------------------------------
const add_staff=async(req,res)=>{

}




//-------------------------------------------------
//  ---------  UPDATING USER FROM CONTROLLER------------------------
//---------------------------------

const update_staff=async(req,res)=>{

}



//-------------------------------------------------
//  --------- DELETE USER FROM CONTROLLER------------------------
//---------------------------------
const delet_staff=async(req,res)=>{

}




