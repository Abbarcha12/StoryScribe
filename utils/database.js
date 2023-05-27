import mongoose, { connection } from "mongoose";
// track the connection
let Isconnected =false;

export const connectToDB = async  ()=>{
    mongoose.set('strictQuery',true);
    if(Isconnected){
        console.log('MongoDB is already connected');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGDB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'shared'
        })
        Isconnected=true
        console.log('DataBase Connected')
    } catch (error) {
        console.log(error)
    }
}