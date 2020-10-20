const task = require('../models/task');
const {
    getAllTasks,
    getTaskById,
    addTask,
    deleteTask,
    updateTask
} = require('../utils/tasks_utilities');

const getTasks = function (req, res) {
    // execute the query from getAllTask
    getAllTasks(req)
    .exec((err, tasks) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        
       // console.log(getPoints(tasks))
        res.render('dashboard.pug', { 
            title: 'All Tasks', 
            tasks: tasks,
            user: req.user
            })
    })
};

function setCategories (tasks){
    let habits = []
    let todo = []
    let task = []
 
  //  if task.category == "Habit" 
 }
function setpoints (tasks) {
    //iterate over tasks
    //if category then get points certain amount

}
 
     // const getPoints = function (tasks){
//     let completed = tasks.find({completed: true})
//     return completed;

// }

const getTask = function (req, res) {
    // execute the query from getTaskById
    getTaskById(req).exec((err, task) => {
        if (err) {
            res.status(404);
            return res.send("Task not found");
        }
        res.render('tasks/task.pug', { 
            title: task.name, 
            task: task,
            user: req.user
            })
    });
};     

function taskNew(req, res) {
    res.render("tasks/new_task.pug");
}

const makeTask = function (req, res) {
    // save the Task instance from addTask
    addTask(req)
    .then(t => 
        res.redirect("/tasks/dashboard")
        )
    .catch(err => 
        res.send(err))
};

const removeTask = function (req, res) {
    deleteTask(req.params.id).exec((err) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        res.sendStatus(204);
        res.send('Success');
    });
};

function taskEdit(req, res) {
    let id = req.params.id

    res.render("tasks/edit_task.pug", { 
        id: id 
        });
}

const changeTask = function (req, res) {
    // execute the query from updateTask
    console.log("ghfgh")
    updateTask(req).exec((err, task) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
       
        res.status(200);
        res.redirect('/tasks/dashboard');
    });
};

module.exports = {
    getTasks,
    getTask,
    makeTask,
    removeTask,
    changeTask,
    taskNew,
    taskEdit
};