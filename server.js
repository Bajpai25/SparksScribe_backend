const express=require("express");
const cors=require("cors");
const app= express();
const UserregisterModel=require("./models/register_model");
const Blog=require("./models/Blog_model");
const Comment_Model=require("./models/comment_model");
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

// craeting route for adding a comment to a blog

app.post('/comment',add_comment);

async function add_comment(req,res){
  
  const {comment_text,comment_by}=await req.body;

  try{
    const comment_data=await Comment_Model.create({comment_text,comment_by});

    if(comment_data){
      res.status(200).json({
        message:"Comment added successfully",
        data:comment_data
      })
    }
  }
  catch(err){
    res.status(400).json({
      message:"Comment not added",
      data:err
    })
  }
}
// getting comment by id 

app.get('/comment/:id',get_comment_by_id);

async function get_comment_by_id(req,res){
  const id=req.params.id;
 
  try{
    const comment_data= await Comment_Model.findById(id);
    if(comment_data){
      res.status(200).json({
        message:"data received successfully",
        data:comment_data
      })
    }
  }
  catch(err){
    res.status(400).json({
      message:"data not received",
      data:err
    })  
  }
}

// creating route for changing the comment data by id

app.put('/comment/:id',update_comment_data);

async function update_comment_data(req,res){
  const id=req.params.id;
  const {comment_text,comment_by}=await req.body;
  
  try{
    const comment_data=await Comment_Model.findByIdAndUpdate(id,{comment_text,comment_by},{new:true});
    if(comment_data){
      res.status(200).json({
        message:"comments changed successfully",
        data:comment_data
      })
    }
  }
  catch(err){
    res.status(400).json({
      message:"comments not changed",
      data:err
    })
  }
}

// delete comment data by id

app.delete('/comment/:id',delete_comment_data);

async function delete_comment_data(req,res){
  const id=req.params.id;
  
  try{
    const comment_data=await Comment_Model.findByIdAndDelete(id);
    if(comment_data){
      res.status(200).json({
        message:"data deleted successfully",
        data:comment_data
      })
    }
  }
  catch(err){
    res.status(400).json({
      message:"data not deleted",
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

