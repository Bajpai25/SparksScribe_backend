const express=require("express");
const cors=require("cors");
const app= express();
const UserregisterModel=require("./models/register_model");
const Blog=require("./models/Blog_model");
const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());
app.post("/register",fetch_data);
app.post('/login',fetch_login_data);
const PORT=process.env.PORT || 5000;


const link="mongodb+srv://mern_blog:O3iDjfR9CxBHNKRx@cluster0.xe0ijps.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(link,{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.once("open",()=>{console.log("connected to database");});

async function fetch_login_data(req,res){
    
    const {email,password}=await req.body;
    const logindoc= await UserregisterModel.findOne({email,password});
    if(logindoc){
        console.log("login successfull");
        res.status(200).json({
          message:"Login successfull",
          data:logindoc
        });
    }
    else{
      res.status(400).json({
        message:"Login failed"
      })
        console.log("Register please");
    }
}
async function fetch_data(req,res){
   
  const {first_name,last_name,email,password}=await req.body;
  console.log(req.body);
  try{
    const registerdoc= await  UserregisterModel.create({ first_name , last_name , email , password });
    res.json({
      message:"Register successfull",
      data:registerdoc
    });
  }

  catch(err){
    console.log(err);
  }
}
app.listen(PORT,()=>{
    console.log("server is running!");
})

// fetching blog data from frontend

app.post('/blog',fetch_blog_data);

async function fetch_blog_data(req,res)
{
  const {title,category,time,content,tags}=await req.body;

  try{
    let blog_data=await Blog.create({title,category,time,content,tags});
    res.send({
      message:"Blog data received successfully",
      data:blog_data
    })
  }

  catch(err){
    res.send({
      message:"Blog data not received",
      data:err
    })
  }

}

// route for get request

app.get('/get_blog',get_blog_data);

async function get_blog_data(req,res){
  const blog_data=await Blog.find({});
  res.send({
    message:"Blog data received successfully",
    data:blog_data
  })
}

// route for get request by id
app.get('/blog/:id',get_blog_data_by_id);

async function get_blog_data_by_id(req,res){
  const id=req.params.id;
  const blog_data=await Blog.findById(id);
  res.json({
    message:"Blog data received successfully",
    data:blog_data
  })
}

// patch request route generation for updating blog data

app.put('/blog/:id',update_blog_data);

async function update_blog_data(req,res){
  const id=req.params.id;
  const {title,category,time,content,tags}=req.body;
  try{
    const updated_blog_data=await Blog.findByIdAndUpdate(id,{title,category,time,content,tags},{new:true});

    if(updated_blog_data){
      res.json({
        message:"Blog data updated successfully",
        data:updated_blog_data
      })
    }
    else{
      res.json({
        message:"Blog data not updated",
      })
    }
  }
  catch(err){
    res.json({
      message:"Blog data not updated",
      data:err
    })
  }
}

// creating route for deleting the blog data by id 

app.delete('/blog/:id',delete_blog_data);

async function delete_blog_data(req,res){
  const id=req.params.id;
  const delete_data=await Blog.findByIdAndDelete(id);
  res.json({
    message:"Blog data deleted successfully",
    data:delete_data
  })
}

