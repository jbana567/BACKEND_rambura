const { ObjectId } = require('mongodb');

//-------------------------------------------------
//  --------- GET NEWS FORM CONTROLLER------------------------
//---------------------------------
const getnews=(db)=> async(req,res)=>{
   try{
 
    const news=[];
    const get=await db.collection("news").find().forEach((element)=>{
     news.push(element)
    });
    res.status(500).json(news);
   }
   catch(error){
      res.status(500).json({
        message:"failed to get_news",
        error:error.message
      })
   }
}

//-------------------------------------------------
//  --------- GET SINGLE NEWS FROM CONTROLLER------------------------
//---------------------------------
const getnew=(db)=> async(req,res)=>{
   try{
    const {id}=req.params;
    if(!ObjectId.isvalid(id)){
        return res.status(400).json({
            message:"Invalid new_id"
        })
    }
    const news=await db.collection("news").findOne({_id:new ObjectId(id)})

    if(!news){
        return res.status(400).json({
            message:"invalid news"
        })
    }
     res.status(500).json(news);   
   }
   catch(error){
      return res.status(500).json({
        message:"failed to get_new",
        error:error.message
      })
   }
}




//-------------------------------------------------
//  --------- ADD NEWS FROM CONTROLLER------------------------
//---------------------------------
const addnews=(db) => async(req,res)=>{
 try{
  const news=req.body;

   if(!Array.isArray(news)){
    return res.status(500).json({
        message:"request body has to be news"
    }) 
}

    const add=await db.collection("news").insertMany(news);
    res.status(201).json(add)
  
 }
 catch(error){
  return res.status(500).json({
    message:"failed to add news"
  })
 }
}




//-------------------------------------------------
//  ---------  UPDATING NEWS FROM CONTROLLER------------------------
//---------------------------------

const updatenews=(db)=>async(req,res)=>{
    try{
    const {id}=req.params;

    if(!ObjectId.isValid(id)){
        return res.status(400).json({
            message:"invlaid id"
        }) }
        const update=await db.collection("news").updateOne(
            {
                _id:new ObjectId(id)
            },
            {
                $set:req.body
            }
        )
        if(update.matchedCount===0){
            return res.status(404).json({
                message:"news not found"
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
//  --------- DELETE NEWSFROM CONTROLLER------------------------
//---------------------------------
const deletnews=(db)=> async(req,res)=>{
    try{
    const {id}=req.params

    if(!ObjectId.isvalid(id)){
        return res.status(401).json({
            message:"invalid news_id"
        })

    }
    const del= await db.collection("news").deleteOne({_id:new ObjectId(id)});

    if(del.deletedCount===0){
        return res.status(401).json({
            message:"news not found"
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
    getnews,
    getnew,
    addnews,
    updatenews,
    deletnews
};



