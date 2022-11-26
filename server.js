const app = require("./app");
const MongDB = require("./utils/mongodb.util");

async function startServer (){
    try{
        await MongDB.connect("mongodb://localhost:27017/book_db");
        console.log("Connect to the database");
        
        app.listen(6969,()=>{
            console.log(`Server is running on port 6969`);
        });
    }catch (error){
        console.log("Cannot connect to the database!",error);
        process.exit();
    }
}

startServer();

