const { ObjectId } = require('mongodb');

//-------------------------------------------------
//  --------- GET INVENTORY TRANSACTION FORM CONTROLLER------------------------
//---------------------------------
const getTransactions = (db) => async (req, res) => {
    try {
        const transaction = await db
            .collection("inventorytransaction")
            .find()
            .toArray();

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({
            message: "failed to get transactions",
            error: error.message
        });
    }
};
//-------------------------------------------------
//  --------- GET SINGLE NEWS FROM CONTROLLER------------------------
//---------------------------------
const getTransaction = (db) => async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid transaction_id"
            });
        }

        const transaction = await db
            .collection("inventorytransaction")
            .findOne({
                _id: new ObjectId(id)
            });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        res.status(200).json(transaction);

    } catch (error) {
        return res.status(500).json({
            message: "failed to get_transaction",
            error: error.message
        });
    }
};




//-------------------------------------------------
//  --------- ADD NEWS FROM CONTROLLER------------------------
//---------------------------------
const addTransaction=(db) => async(req,res)=>{
 try{
  const transaction=req.body;

   if(!Array.isArray(transaction)){
    return res.status(500).json({
        message:"request body has to be transaction"
    }) 
}

    const add=await db.collection("inventorytransaction").insertMany(transaction);
    res.status(201).json(add)
  
 }
 catch(error){
  return res.status(500).json({
    message:"failed to add transaction"
  })
 }
}




//-------------------------------------------------
//  ---------  UPDATING NEWS FROM CONTROLLER------------------------
//---------------------------------

 const updatetransaction=(db)=>async(req,res)=>{
     try{
     const {id}=req.params;

     if(!ObjectId.isValid(id)){
         return res.status(400).json({
             message:"invlaid id"
         }) }
         const update=await db.collection("inventorytransaction").updateOne(
             {
                 _id:new ObjectId(id)
             },
             {
                $set:req.body
            }
         )
         if(update.matchedCount===0){
             return res.status(404).json({
                 message:"transaction not found"
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
 const delettransaction=(db)=> async(req,res)=>{
     try{
     const {id}=req.params
     if(!ObjectId.isvalid(id)){
         return res.status(401).json({
             message:"invalid transaction_id"
         })
     }
    const del= await db.collection("inventorytransaction").deleteOne({_id:new ObjectId(id)});

    if(del.deletedCount===0){
         return res.status(401).json({
             message:"transaction not found"
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
   getTransactions,
   getTransaction,
   addTransaction
};



