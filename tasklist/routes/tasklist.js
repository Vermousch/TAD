/**
 * Created by FERRAND on 29/04/2015.
 */

var mongoose = require('mongoose'),
task = require('../models/task.js');

var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI
mongoose.connect(connectionString);

module.exports = TaskList;

function TaskList(connection) {
    mongoose.connect(connection);
}

TaskList.prototype = {
    showTasks: function(req, res) {
        task.find({ itemCompleted : false }, function foundTasks(err, items) {
            res.render('index', { title: 'My ToDo List', tasks: items })
        });
    },

    addTask: function(req,res) {
        var item = req.body;
        var newTask = new task();
        newTask.itemName = item.itemName;
        newTask.itemCategory = item.itemCategory;
        newTask.save(function savedTask(err) {
            if(err) {
                throw err;
            }
        });
        res.redirect('/');
    },

    completeTask: function(req,res) {
        var completedTasks = req.body;
        for(taskId in completedTasks) {
            if(completedTasks[taskId]=='true') {
                var conditions = { _id: taskId };
                var updates = { itemCompleted: completedTasks[taskId] };
                task.update(conditions, updates, function updatedTask(err) {
                    if(err) {
                        throw err;
                    }
                });
            }
        }
        res.redirect('/');
    }
}