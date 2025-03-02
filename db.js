module.exports=()=>{
    const connectionParams={
        useNewUrlParser:true,
        useUnifiedTopology:true,
    };
    try{
        mongoose.connect(process.env.MONGO_URL,connectionParams);
        console.log("Connected To Database succcessfully");
    }catch(error){
     console.log(error);
     console.log("could not connect to database");
    }
};