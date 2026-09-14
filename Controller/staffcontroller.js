const { ObjectId } = require('mongodb');

//-------------------------------------------------
//  --------- GET NEWS FORM CONTROLLER------------------------
//---------------------------------
const getstaffs=(db)=> async(req,res)=>{
   try{
 
    const staff=[];
    const get=await db.collection("staff").find().forEach((element)=>{
     staff.push(element)
    });
    res.status(500).json(staff);
   }
   catch(error){
      res.status(500).json({
        message:"failed to get_staffs",
        error:error.message
      })
   }
}

//-------------------------------------------------
//  --------- GET SINGLE NEWS FROM CONTROLLER------------------------
//---------------------------------
const getstaff = (db) => async (req, res) => {
   try{
    const {id}=req.params;
    if(!ObjectId.isvalid(id)){
        return res.status(400).json({
            message:"Invalid staff_id"
        })
    }
    const staff=await db.collection("staff").findOne({_id:new ObjectId(id)})

    if(!staff){
        return res.status(400).json({
            message:"invalid staff"
        })
    }
     res.status(500).json(get_staff);   
   }
   catch(error){
      return res.status(500).json({
        message:"failed to get_staff",
        error:error.message
      })
   }
}




//-------------------------------------------------
//  --------- ADD NEWS FROM CONTROLLER------------------------
//---------------------------------
const addstaff=(db) => async(req,res)=>{
 try{
  const staff=req.body;

   if(!Array.isArray(staff)){
    return res.status(500).json({
        message:"request body has to be staff"
    }) 
}

    const add=await db.collection("staff").insertMany(staff);
    res.status(201).json(add)
  
 }
 catch(error){
  return res.status(500).json({
    message:"failed to add staff"
  })
 }
}




//-------------------------------------------------
//  ---------  UPDATING NEWS FROM CONTROLLER------------------------
//---------------------------------

const updatestaff=(db)=>async(req,res)=>{
    try{
    const {id}=req.params;

    if(!ObjectId.isValid(id)){
        return res.status(400).json({
            message:"invlaid id"
        }) }
        const update=await db.collection("staff").updateOne(
            {
                _id:new ObjectId(id)
            },
            {
                $set:req.body
            }
        )
        if(update.matchedCount===0){
            return res.status(404).json({
                message:"staff not found"
            })
        }
      res.status(200).json(update)
    }
    catch(error){
        return res.status(500).json({
            message:"failed to update",
            error:error.message
        })

    }
}



//-------------------------------------------------
//  --------- DELETE NEWS FROM CONTROLLER------------------------
//---------------------------------
const deletstaff=(db)=> async(req,res)=>{
    try{
    const {id}=req.params

    if(!ObjectId.isvalid(id)){
        return res.status(401).json({
            message:"invalid staff_id"
        })

    }
    const del= await db.collection("staff").deleteOne({_id:new ObjectId(id)});

    if(del.deletedCount===0){
        return res.status(401).json({
            message:"staff not found"
        })
    }
    res.status(500).json(del)
    }
    catch(error){
return res.status(500).json({
    message:"failed to delete",
    error:error.message
})
    }

}

module.exports={
    getstaffs,
    getstaff,
    addstaff,
    updatestaff,
    deletstaff
};



