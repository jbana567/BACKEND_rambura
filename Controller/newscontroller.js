 const express=require("express");
//-------------------------------------------------
//  --------- GET USER FORM CONTROLLER------------------------
//---------------------------------
const get_news=async(req,res)=>{
    const department=[];
    const get=await db.collection("department").find().forEach((element)=>{
     users.push(element)
    });
    res.json(users);
}

//-------------------------------------------------
//  --------- GET SINGLE USER FROM CONTROLLER------------------------
//---------------------------------
const get_new=async(req,res)=>{
   
}




//-------------------------------------------------
//  --------- ADD USER FROM CONTROLLER------------------------
//---------------------------------
const add_news=async(req,res)=>{

}




//-------------------------------------------------
//  ---------  UPDATING USER FROM CONTROLLER------------------------
//---------------------------------

const update_news=async(req,res)=>{

}



//-------------------------------------------------
//  --------- DELETE USER FROM CONTROLLER------------------------
//---------------------------------
const delet_news=async(req,res)=>{

}




