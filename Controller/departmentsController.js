const { ObjectId } = require('mongodb');

//-------------------------------------------------
//  --------- GET DEPARTMENT FORM CONTROLLER------------------------
//---------------------------------
const getdepartments = (db) => async (req, res) => {
   try {
      const departments = await db.collection("department").find().toArray();
      res.status(200).json(departments);
   }
   catch (error) {
      res.status(500).json({
        message: "failed to load",
        error: error.message
      });
   }
};
//-------------------------------------------------
//  --------- GET SINGLE DEPARTMENT FROM CONTROLLER------------------------
//---------------------------------
const getdepartment= (db) => async(req,res)=>{
   try{
    const {id}=req.params;
    if(!ObjectId.isvalid(id)){
        return res.statur(400).json({
            message:"Invalid department_id"
        })
    }
    const department=await db.collection("department").findOne({_id:new ObjectId(id)})

    if(!department){
        return res.status(400).json({
            message:"invalid department"
        })
    }
     res.status(500).json(department);   
   }
   catch(error){
      return res.status(500).json({
        message:"failed to load",
        error:error.message
      })
   }
}




//-------------------------------------------------
//  --------- ADD DEPARTMENT  FROM CONTROLLER------------------------
//---------------------------------
const adddepartment=(db) => async(req,res)=>{
 try{
  const department=req.body;

   if(!Array.isArray(department)){
    return res.status(500).json({
        message:"request body has to be department"
    }) 
}

    const add=await db.collection("department").insertMany(department);
    res.status(201).json(add)
  
 }
 catch(error){
  return res.status(500).json({
    message:"failed to add department"
  })
 }
}




//-------------------------------------------------
//  ---------  UPDATING DEPARTMENT FROM CONTROLLER------------------------
//---------------------------------

const updatedepartment=(db)=>async(req,res)=>{
    try{
    const {id}=req.params;

    if(!ObjectId.isValid(id)){
        return res.status(400).json({
            message:"invlaid id"
        }) }
        const update=await db.collection("department").updateOne(
            {
                _id:new ObjectId(id)
            },
            {
                $set:req.body
            }
        )
        if(update.matchedCount===0){
            return res.status(404).json({
                message:"department not found"
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
//  --------- DELETE DEAPRTMENT FROM CONTROLLER------------------------
//---------------------------------
const deletdepartment=(db)=> async(req,res)=>{
    try{
    const {id}=req.params

    if(!ObjectId.isvalid(id)){
        return res.status(401).json({
            message:"invalid department_id"
        })

    }
    const del= await db.collection("department").deleteOne({_id:new ObjectId(id)});

    if(del.deletedCount===0){
        return res.status(401).json({
            message:"student not found"
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
    getdepartments,
    getdepartment,
    adddepartment,
    updatedepartment,
    deletdepartment
};



