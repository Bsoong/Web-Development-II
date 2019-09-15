const express = require("express");
const router = express.Router();
const data = require("../data");
const tasksData = data.tasks;


router.get("/tasks/:id", async (req, res) => {
  try {
    const tasks = await tasksData.get(req.params.id);
    res.json(tasks);
  } catch (e) {
    res.status(404).json({ message: "Tasks not found" });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasksList = await tasksData.getAll();
    let displayList = [];
    if(req.query.skip) {
      displayList = tasksList.slice(parseInt(req.query.skip,10), parseInt(req.query.skip,10)+20);
    }
    else if(req.query.take) {
      if(req.query.take < 100) {
        displayList = tasksList.slice(0, parseInt(req.query.take,10));
      }
      else{
        displayList = tasksList.slice(0, 99);
      }
    }
    else {
      displayList = tasksList.slice(0,20);
       }
    res.json(displayList);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/tasks", async (req, res) => {
  const body = req.body
  if(!body) {
    res.status(400).json({error:"No data found"})
    return;
  }
  if(!body.title) {
    res.status(400).json({error:"No data found for title"})
    return;
  }
  if(!body.description) {
    res.status(400).json({error:"No data found for description"})
    return;
  }
  if(!body.hoursEstimated) {
    res.status(400).json({error:"No data found for hoursEstimated"})
    return;
  }
  if(body.completed == null) {
    res.status(400).json({error:"No data found for completed"})
    return;
  }
  try {
    const newTask = await tasksData.create(body.title, body.description, body.hoursEstimated, body.completed);
   res.status(200).json(newTask);
 } catch(e) {
   res.sendStatus(500);
   console.log(e);
 }
});
//Need to work on
router.patch("/tasks/:id", async (req, res) => {
  body = req.body;
  id = req.params.id;
  if(!body) {
    throw "Error: Must be paramaters given."
  }
  try {
     await tasksData.get(id);
  } catch(e) {
    res.sendStatus(500);
    console.log(e);
  }
  //Singles
  if(body.title && !body.description && !body.hoursEstimated && body.completed == null) {
    let task = await tasksData.updateTitle(id, body.title);
    res.status(200).json(task);
    return;
  }
   else if(!body.title && body.description && !body.hoursEstimated && body.completed == null) {
    let task = await tasksData.updateDescription(id, body.description);
    res.status(200).json(task);
    return;
  }
  else if(!body.title && !body.description && body.hoursEstimated && body.completed == null) {
    let task = await tasksData.updatehoursEstimated(id, body.hoursEstimated);
    res.status(200).json(task);
    return;
  }
  else if(!body.title && !body.description && !body.hoursEstimated && body.completed) {
    let task = await tasksData.updateCompleted(id, body.completed);
    res.status(200).json(task);
    return;
  }
  //end Of Single
  //Triples
  else if(!body.title && body.description && body.hoursEstimated && body.completed) {
    let task = await tasksData.updateDescription(id, body.description);
    task = await tasksData.hoursEstimated(id, body.hoursEstimated);
    task = await tasksData.updateCompleted(id, body.completed);
    res.status(200).json(task);
    return;
  }
  else if(body.title && !body.description && body.hoursEstimated && body.completed) {
    let task = await tasksData.updateTitle(id, body.title);
    task = await tasksData.hoursEstimated(id, body.hoursEstimated);
    task = await tasksData.updateCompleted(id, body.completed);
    res.status(200).json(task);
    return;
  }
  else if(body.title && body.description && !body.hoursEstimated && body.completed) {
    let task = await tasksData.updateDescription(id, body.description);
    task = await tasksData.updateTitle(id, body.title);
    task = await tasksData.updateCompleted(id, body.completed);
    res.status(200).json(task);
    return;
  }
  else if(body.title && body.description && body.hoursEstimated && body.completed == null ) {
    let task = await tasksData.updateDescription(id, body.description);
    task = await tasksData.updateTitle(id, body.title);
    task = await tasksData.updatehoursEstimated(id, body.hoursEstimated);
    res.status(200).json(task);
    return;
  }
  //end of triples
  //Doubles title first
  else if(body.title && body.description && !body.hoursEstimated && body.completed == null) {
    let task = await tasksData.updateDescription(id, body.description);
    task = await tasksData.updateTitle(id, body.title);
    res.status(200).json(task);
    return;
  }
  else if(body.title && !body.description && body.hoursEstimated && body.completed == null) {
    let task = await tasksData.updateTitle(id, body.title);
    task = await tasksData.updatehoursEstimated(id, body.hoursEstimated);
    res.status(200).json(task);
    return;
  }
  else if(body.title && !body.description && !body.hoursEstimated && body.completed) {
    let task = await tasksData.updateTitle(id, body.title);
    task = await tasksData.updateCompleted(id, body.completed);
    res.status(200).json(task);
    return;
  }
  //Doubles Title done
  //Doubles Descripion
  else if(!body.title && body.description && body.hoursEstimated && body.completed == null) {
    let task = await tasksData.updateDescription(id, body.description);
    task = await tasksData.updatehoursEstimated(id, body.hoursEstimated);
    res.status(200).json(task);
    return;
  }
  else if(!body.title && body.description && !body.hoursEstimated && body.completed) {
    let task = await tasksData.updateDescription(id, body.description);
    task = await tasksData.updateCompleted(id, body.completed);
    res.status(200).json(task);
    return;
  }
  else if(!body.title && !body.description && body.hoursEstimated && body.completed) {
    let task = await tasksData.updatehoursEstimated(id, body.hoursEstimated);
    task = await tasksData.updateCompleted(id, body.completed);
    res.status(200).json(task);
    return;
  }
  else {
    let task = await tasksData.update(id, body.title, body.description, body.hoursEstimated, body.completed);
    res.status(200).json(task);
    return;
  }

})
router.put("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if(!body) {
    res.status(400).json({error:"No data found"})
    return;
  }
  if(!body.title) {
    res.status(400).json({error:"No data found for title"})
    return;
  }
  if(!body.description) {
    res.status(400).json({error:"No data found for description"})
    return;
  }
  if(!body.hoursEstimated) {
    res.status(400).json({error:"No data found for hoursEstimated"})
    return;
  }
  if(body.completed == null) {
    res.status(400).json({error:"No data found for completed"})
    return;
  }
  try {
    await tasksData.get(id);
  }
  catch(e) {
    res.status(404).json({error: "No id found"});
    return;
  }
  try {
    let tasks = await tasksData.update(id, body.title, body.description, body.hoursEstimated, body.completed)
    res.status(200).json(tasks);
  } catch(e) {
    res.sendStatus(500);
    console.log(e);
  }
});

router.post("/tasks/:id/comments", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  if(!id) {
    throw "Error: need Task ID to put Comment";
  }
  if(!body.name) {
    throw "Error: Comment needs a name";
  }
  if(!body.comment) {
    throw "Error: Need a description of the comment"
  }
  try {
    await tasksData.get(id);
  }
  catch(e) {
    res.status(404).json({error: "Not found"});
    return;
  }
  try {
    let grabComment = await tasksData.createComment(id, body.name, body.comment);
    res.status(200).json(grabComment);
  } catch(e) {
    res.sendStatus(500);
    console.log(e);
  }let newTitle = async function newTitle(id, title) {
  const tasksCollect = await tasks(id);
  if(!id) {
    throw "Error: No id found"
  }
  if(!title) {
    throw "Error: No title found"
  }
  let newTitle = {}
  const updatedInfo = await tasksCollect.updateOne({_id: id}, {$set: newTitle});
}
});

router.delete("/tasks/:taskId/:commentId", async (req,res )=> {
  const taskId = req.params.taskId;
  const commentId = req.params.commentId;
  if(!taskId) {
    throw "Error: need task Id to remove comment"
  }
  if(!commentId) {
    throw "Error: need commentId to remove comment"
  }
  try {
    let removeComment = await tasksData.removeComment(taskId, commentId);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});


module.exports = router;
