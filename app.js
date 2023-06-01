var express=require("express");
var mongoose =require("mongoose");
var bodyParser=require("body-parser");
var app=express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
async function connectToMongoDB() {
    try {
      // Your MongoDB connection code using Mongoose or any other library
      await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      console.log('Connected to MongoDB');
      // Further code after successful connection
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      // Handle the error appropriately, e.g., retry, show an error message, or exit the application
    }
  }

  mongoose.set('strictQuery', false);

  
  // Call the function to connect to MongoDB
  connectToMongoDB();
const itemSchema ={
    name:String
}
const Item=mongoose.model("Item",itemSchema);
const item1= new Item({
    name :"Welcome to CUB TODO",
});
const item2= new Item({
    name :"CUB new event",
});const item3= new Item({
    name :"CUB NEWS",
});
const defaultItem=[item1,item2,item3];
/*
Item.insertMany(defaultItem).then(function(){
    console.log("successfully saved default items to db");
})
.catch(function(err){
    console.log(err);
});
*/
app.get("/",function(req,res){
 // res.send("<h1>Hey guys!!</h1>");
 Item.find({},function(err,f)
 {
    // console.log(f);
    if(f.length===0)
    {
        (defaultItem,function(err)
      {
          if(err){
              console.log(err);
          }
          else{
              console.log("Successfully saved items to DB");
          }
      });
      res.redirect('/');
    }
    else{
    res.render("list",{newListItems:f});
    }
 });

})

app.post("/",function(req,res){

      const itemName=req.body.n; 
    // console.log(i);
   // i1.push(i);
    //res.render("list",{newListItems:f}); 
   // res.redirect("/");
   const item=new Item({
     name:itemName
   });
   item.save();
});

app.post("/delete",function(req,res){

    const check=req.body.checkbox;
    Item.findByIdAndRemove(check,function(err)
    {
        if(!err)
        {
            console.log("Successfully deleted");
            res.redirect("/");
        }
      })
});



app.listen(8000,function()
{
    console.log("Server is listening to port 8000");
})
