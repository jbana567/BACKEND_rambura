 const express=require("express");
//-------------------------------------------------
//  --------- GET USER FORM CONTROLLER------------------------
//---------------------------------
const get_departments=async(req,res)=>{
    const department=[];
    const get=await db.collection("department").find().forEach((element)=>{
     users.push(element)
    });
    res.json(users);
}

//-------------------------------------------------
//  --------- GET SINGLE USER FROM CONTROLLER------------------------
//---------------------------------
const get_department=async(req,res)=>{
   
}




//-------------------------------------------------
//  --------- ADD USER FROM CONTROLLER------------------------
//---------------------------------
const add_department=async(req,res)=>{

}




//-------------------------------------------------
//  ---------  UPDATING USER FROM CONTROLLER------------------------
//---------------------------------

const update_department=async(req,res)=>{

}



//-------------------------------------------------
//  --------- DELETE USER FROM CONTROLLER------------------------
//---------------------------------
const delet_department=async(req,res)=>{

}




