
const idvalidationSchema={
    id:{
      in:["params"],
      isMongoId:{
        errorMessage:"id is invalid"
      }
    }
  }

  module.exports=idvalidationSchema