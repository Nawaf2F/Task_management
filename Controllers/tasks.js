const { validationResult } = require('express-validator')
const Task = require('../Models/tasks')
const User = require('../Models/users')

module.exports = {

    home:(req, res) =>{
        res.render('index.ejs') 
        },
        
    create: function(req, res) {
        let owners = req.user._id
        Task.find({},(error,tasks)=>{
            if(error){
                console.log(`There was an error: ${error}`)
            }else{
                res.render('CRUD/todo.ejs',{todotasks: tasks, owners: owners})
            }
        })
    },
    createReq: (req,res)=>{
        const error = validationResult(req)

        if(!error.isEmpty()){
            req.flash('error',error.array)
            res.redirect('/create')
        
        }else{
        let firstTask = new Task({
            title: req.body.title,
            owner : req.user._id,
            description: req.body.description,
            level: req.body.level,
        })
        firstTask.save().then(()=> res.redirect('/create'))}
    },
    edit: (req,res)=>{
        let owners = req.user._id
        const id = req.params.id
        Task.find({},(error,tasks)=>{
            res.render('CRUD/todoEdit.ejs',{todotasks: tasks, idTask: id,owners: owners})
        })
            },
    update: (req,res)=>{
        const id = req.params.id
        Task.findByIdAndUpdate(id, {
            title: req.body.title,
            description: req.body.description,
            level: req.body.level,
           }, error=>{
            if(error) return res.send(500,error)
            else res.redirect('/create')
        })
    
     },
     delete: (req,res)=>{
        Task.deleteOne({_id: req.params.id}, (error)=>{
            if(error) console.log(`There was an error: ${error}`)
            else{res.redirect('/create')}
        })
    },
    admin: function(req, res) {
        // Get all the tasks from all users
        Task.find({}, (error, tasks) => {
          if (error) {
            console.log(`There was an error: ${error}`);
          } else {
            // Get the owners of the tasks
            User.find({}, (error, users) => {
              if (error) {
                console.log(`There was an error: ${error}`);
              } else {
                // Create an object to store the owners of the tasks
                let owners = {};
      
                // Add the owners to the object
                users.forEach((user) => {
                  owners[user._id] = user;
                });
      
                // Render the template with the tasks and the owners
                res.render('Admin/todoAdmin.ejs', {
                  todotasks: tasks,
                  owners: owners,
                });
              }
            });
          }
        });
      },editAdmin: (req,res)=>{
        let owners = req.user._id
        const id = req.params.id
        Task.find({},(error,tasks)=>{
            res.render('Admin/todoEditAdmin.ejs',{todotasks: tasks, idTask: id,owners: owners})
        })
            },
    updateAdmin: (req,res)=>{
        const id = req.params.id
        Task.findByIdAndUpdate(id, {
            title: req.body.title,
            description: req.body.description,
            level: req.body.level,
           }, error=>{
            if(error) return res.send(500,error)
            else res.redirect('/admin')
        })
    
     },
     deleteAdmin: (req,res)=>{
        Task.deleteOne({_id: req.params.id}, (error)=>{
            if(error) console.log(`There was an error: ${error}`)
            else{res.redirect('/admin')}
        })
    }
}