var express=require("express");
var mongoose =require("mongoose");
var bodyParser=require("body-parser");
var app=express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true});
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
      Item.insertMany(defaultItem,function(err)
      {
          if(err){
              console.log(err);
          }
          else{
              console.log("Successfully saved items to DB");
          }
      });
      res.redirect("/");
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



app.listen(2000,function()
{
    console.log("Server is listening to port 2000");
})
