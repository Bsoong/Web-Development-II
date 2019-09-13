const  mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const ObjectId = require('mongodb').ObjectID;
const uuid = require("node-uuid");

let create = async function create(title, description, hoursEstimated, completed) {
  const tasksCollect = await tasks();
  if(typeof(title) != "string") {
    throw "Error: Title must be a string"
  }
  if(typeof(description) != "string") {
    throw "Error: Description must be a string"
  }
  if(typeof(hoursEstimated) != "number") {
    throw "Error: hourseEstimated must be a number"
  }
  if(typeof(completed) != "boolean") {
    throw "Error: completed must be a boolean"
  }
  if(!title) {
    throw "Error: No name was received."
  }

  if(!description) {
    throw "Error: No taskType was received."
  }
  if(!hoursEstimated) {
    throw "Error: No hourseEstimated was received."
  }
  let newTask = {
    _id: uuid.v4(),
    title: title,
    description: description,
    hoursEstimated: hoursEstimated,
    completed: completed,
    comments: []
  };
  const insertInfo = await tasksCollect.insertOne(newTask);
  if (insertInfo.insertedCount === 0) throw "Could not add Task";
  const newId = insertInfo.insertedId;
  const task = await get(newId);
  return task;
}

let getAll = async function getAll() {
    const tasksCollect = await tasks();
    const task = await tasksCollect.find({}).toArray();
    return task;
  }

let get = async function get(id) {
  const tasksCollect = await tasks();
  if(!id) {
    throw "Error: No id found";
  }
const task = await tasksCollect.findOne({ _id: id });
if (task === null) {
  throw "No tasks with that ID";
}
return task;
}

let remove = async function remove(id) {
  const tasksCollect = await tasks();
  if(!id){
    throw "You must provide an id to search for";
  }
    const deletionInfo = await tasksCollect.removeOne({ _id: id });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete task with id of ${id}`;
    }
    return deletionInfo;
}
let update = async function update(id, updateTitle, updateDescription, updatehoursEstimated, updateCompleted) {
  const tasksCollect = await tasks();
  if(typeof(updateTitle) != "string") {
    throw "Error: Title must be a string"
  }
  if(typeof(updateDescription) != "string") {
    throw "Error: Description must be a string"
  }
  if(typeof(updatehoursEstimated) != "number") {
    throw "Error: hoursEstimated must be a number"
  }
  if(typeof(updateCompleted) != "boolean") {
    throw "Error: Completed must be a boolean"
  }
  if(!id) {
    throw "You must provide an id to search for";
    }
  if(!updateTitle) {
    throw "You must provide a Title for your task";
    }
  if(!updateDescription) {
    throw "You must provide a Description for your task";
  }
  if(!updatehoursEstimated) {
    throw "You must provide hoursEstimated for the task"
  }
  const task = await get(id);
  const updatedtasks = {
    title: updateTitle,
    description: updateDescription,
    hoursEstimated: updatehoursEstimated,
    completed: updateCompleted,
    comments: task.comments
   };
  const updatedInfo = await tasksCollect.updateOne({ _id: id }, {$set: updatedtasks});
  if (updatedInfo.modifiedCount === 0) {
    throw "could not update task successfully";
  }
  return updatedInfo;
}

let createComment = async function addComment(id, name, comment) {
  const tasksCollect = await tasks(id);
  if(typeof(name) != "string") {
    throw "Error: Name must be a string";
  }
  if(typeof(comment) != "string") {
    throw "Error: Comment must be a string";
  }
  if(!name) {
    throw "Error: You must name the comment";
  }
  if(!comment) {
    throw "Error: You must input a comment";
  }
  let newComment = {
    _id: uuid.v4(),
    name: name,
    comment: comment,
  }

  const updatedInfo = await tasksCollect.updateOne({ _id: id }, {$push: { comments: newComment} });
  if (updatedInfo.modifiedCount === 0) {
    throw "could not update Comment successfully";
  }
  return await get(id);

}
let removeComment = async function removeComment(taskId, commentId) {
const tasksCollect = await tasks(taskId);
if(!taskId) {
  throw "Error: Need a task Id"
}
if(!commentId) {
  throw "Error: Need a comment Id"
}
const updatedInfo = await tasksCollect.updateOne({_id: taskId} , { $pull: { comments: { _id: commentId} } });
if (updatedInfo.modifiedCount === 0) {
  throw "could not update Comment successfully";
}
return await get(taskId);
}

let updateTitle = async function updateTitle(id, newTitle) {
  const tasksCollect = await tasks();
  if(typeof(newTitle) != "string") {
    throw "Error: Title must be a string"
  }
  if(!id) {
    throw "You must provide an id to search for";
    }
  if(!newTitle) {
    throw "You must provide a name for your new title";
    }
  const updatedTitle = {
    title: newTitle
   };
  const updatedInfo = await tasksCollect.updateOne({ _id: id }, {$set: updatedTitle});
  if (updatedInfo.modifiedCount === 0) {
    throw "could not update post successfully";
  }
  return updatedInfo;
}

let updateDescription = async function updateDescription(id, newDescription) {
  const tasksCollect = await tasks();
  if(typeof(newDescription) != "string") {
    throw "Error: Title must be a string"
  }
  if(!id) {
    throw "You must provide an id to search for";
    }
  if(!newDescription) {
    throw "You must provide a name for your new Description";
    }
  const updatedDescription = {
    description: newDescription
   };
  const updatedInfo = await tasksCollect.updateOne({ _id: id }, {$set: updatedDescription});
  if (updatedInfo.modifiedCount === 0) {
    throw "could not update Task successfully";
  }
  return updatedInfo;
}

let updatehoursEstimated = async function updatehoursEstimated(id, newhoursEstimated) {
  const tasksCollect = await tasks();
  if(typeof(newhoursEstimated) != "number") {
    throw "Error: Hours estimated must an integer"
  }
  if(!id) {
    throw "You must provide an id to search for";
    }
  if(!newhoursEstimated) {
    throw "You must provide a name for the hours estimated";
    }
  const updateHE = {
    hoursEstimated: newhoursEstimated
   };
  const updatedInfo = await tasksCollect.updateOne({ _id: id }, {$set: updateHE});
  if (updatedInfo.modifiedCount === 0) {
    throw "could not update Task successfully";
  }
  return updatedInfo;
}

let updateCompleted = async function updateCompleted(id, newCompleted) {
  const tasksCollect = await tasks();
  if(typeof(newCompleted) != "boolean") {
    throw "Error: completed must be bool val"
  }
  if(!id) {
    throw "You must provide an id to search for";
    }
  if(!newCompleted) {
    throw "You must provide a name for the hours estimated";
    }
  const updateComp = {
    completed: newCompleted
   };
  const updatedInfo = await tasksCollect.updateOne({ _id: id }, {$set: updateComp});
  if (updatedInfo.modifiedCount === 0) {
    throw "could not update Task successfully";
  }
  return updatedInfo;
}

module.exports = {
  update,
  create,
  getAll,
  get,
  createComment,
  removeComment,
  updateTitle,
  updateDescription,
  updatehoursEstimated,
  updateCompleted,
}
