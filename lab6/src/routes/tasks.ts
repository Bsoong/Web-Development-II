const data = require("../data");
const tasksDataR = data.tasks;
import {Request, Response} from 'express';


export class Tasks {
  public routes(app): void {
    app.route("/api/tasks/:id").get(async (req: Request, res: Response) => {
      try {
        const tasks = await tasksDataR.get(req.params.id);
        res.json(tasks);
      } catch (e) {
        res.status(404).json({ message: "Tasks not found" });
      }
});

    app.route("/api/tasks").get(async (req: Request, res: Response) => {
  try {
    const tasksList = await tasksDataR.getAll();
    let displayList = [];
    if(req.query.skip && req.query.skip > 0) {
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

    app.route("/api/tasks").post(async (req: Request, res: Response) => {
  const body1 = req.body
  if(!body1) {
    res.status(400).json({error:"No data found"})
    return;
  }
  if(!body1.title) {
    res.status(400).json({error:"No data found for title"})
    return;
  }
  if(!body1.description) {
    res.status(400).json({error:"No data found for description"})
    return;
  }
  if(!body1.hoursEstimated) {
    res.status(400).json({error:"No data found for hoursEstimated"})
    return;
  }
  if(body1.completed == null) {
    res.status(400).json({error:"No data found for completed"})
    return;
  }
  try {
    const newTask = await tasksDataR.create(body1.title, body1.description, body1.hoursEstimated, body1.completed);
   res.status(200).json(newTask);
 } catch(e) {
   res.sendStatus(500);
   console.log(e);
 }
});

    app.route("/api/tasks/:id").patch(async (req: Request, res: Response) => {
  const body2 = req.body;
  const id1 = req.params.id;
  if(!body2) {
    throw "Error: Must be paramaters given."
  }
  try {
     await tasksDataR.get(id1);
  } catch(e) {
    res.sendStatus(500);
    console.log(e);
  }
  if(body2.title && typeof(body2.title) != "string") {
    res.status(409).json({error: "Title must be a string"})
  }
  if(body2.description && typeof(body2.description) != "string") {
    res.status(409).json({error: "Description must be a string"});
  }
  if(body2.hoursEstimated && typeof(body2.hoursEstimated) != "number") {
    res.status(409).json({error: "hoursEstimated must be a number"});
  }
  if(body2.completed && typeof(body2.completed) != "boolean") {
    res.status(409).json({error: "completed must be a boolean"});
  }
  //Singles
  if(body2.title && !body2.description && !body2.hoursEstimated && body2.completed == null) {
    let task = await tasksDataR.updateTitle(id1, body2.title);
    res.status(200).json(task);
    return;
  }
  else if(!body2.title && body2.description && !body2.hoursEstimated && body2.completed == null) {
   let task = await tasksDataR.updateDescription(id1, body2.description);
   res.status(200).json(task);
   return;
  }
  else if(!body2.title && !body2.description && body2.hoursEstimated && body2.completed == null) {
   let task = await tasksDataR.updatehoursEstimated(id1, body2.hoursEstimated);
   res.status(200).json(task);
   return;
  }
  else if(!body2.title && !body2.description && !body2.hoursEstimated && body2.completed) {
   let task = await tasksDataR.updateCompleted(id1, body2.completed);
   res.status(200).json(task);
   return;
  }
  //end Of Single
  //Triples
  else if(!body2.title && body2.description && body2.hoursEstimated && body2.completed) {
   let task = await tasksDataR.updateDescription(id1, body2.description);
   task = await tasksDataR.hoursEstimated(id1, body2.hoursEstimated);
   task = await tasksDataR.updateCompleted(id1, body2.completed);
   res.status(200).json(task);
   return;
  }
  else if(body2.title && !body2.description && body2.hoursEstimated && body2.completed) {
   let task = await tasksDataR.updateTitle(id1, body2.title);
   task = await tasksDataR.hoursEstimated(id1, body2.hoursEstimated);
   task = await tasksDataR.updateCompleted(id1, body2.completed);
   res.status(200).json(task);
   return;
  }
  else if(body2.title && body2.description && !body2.hoursEstimated && body2.completed) {
   let task = await tasksDataR.updateDescription(id1, body2.description);
   task = await tasksDataR.updateTitle(id1, body2.title);
   task = await tasksDataR.updateCompleted(id1, body2.completed);
   res.status(200).json(task);
   return;
  }
  else if(body2.title && body2.description && body2.hoursEstimated && body2.completed == null ) {
   let task = await tasksDataR.updateDescription(id1, body2.description);
   task = await tasksDataR.updateTitle(id1, body2.title);
   task = await tasksDataR.updatehoursEstimated(id1, body2.hoursEstimated);
   res.status(200).json(task);
   return;
  }
  //end of triples
  //Doubles title first
  else if(body2.title && body2.description && !body2.hoursEstimated && body2.completed == null) {
   let task = await tasksDataR.updateDescription(id1, body2.description);
   task = await tasksDataR.updateTitle(id1, body2.title);
   res.status(200).json(task);
   return;
  }
  else if(body2.title && !body2.description && body2.hoursEstimated && body2.completed == null) {
   let task = await tasksDataR.updateTitle(id1, body2.title);
   task = await tasksDataR.updatehoursEstimated(id1, body2.hoursEstimated);
   res.status(200).json(task);
   return;
  }
  else if(body2.title && !body2.description && !body2.hoursEstimated && body2.completed) {
   let task = await tasksDataR.updateTitle(id1, body2.title);
   task = await tasksDataR.updateCompleted(id1, body2.completed);
   res.status(200).json(task);
   return;
  }
  //Doubles Title done
  //Doubles Descripion
  else if(!body2.title && body2.description && body2.hoursEstimated && body2.completed == null) {
   let task = await tasksDataR.updateDescription(id1, body2.description);
   task = await tasksDataR.updatehoursEstimated(id1, body2.hoursEstimated);
   res.status(200).json(task);
   return;
  }
  else if(!body2.title && body2.description && !body2.hoursEstimated && body2.completed) {
   let task = await tasksDataR.updateDescription(id1, body2.description);
   task = await tasksDataR.updateCompleted(id1, body2.completed);
   res.status(200).json(task);
   return;
  }
  else if(!body2.title && !body2.description && body2.hoursEstimated && body2.completed) {
   let task = await tasksDataR.updatehoursEstimated(id1, body2.hoursEstimated);
   task = await tasksDataR.updateCompleted(id1, body2.completed);
   res.status(200).json(task);
   return;
  }
  else {
   let task = await tasksDataR.update(id1, body2.title, body2.description, body2.hoursEstimated, body2.completed);
   res.status(200).json(task);
   return;
  }

})
    app.route("/api/tasks/:id").put(async (req: Request, res: Response) =>{
  const id2 = req.params.id;
  const body3 = req.body;
  if(!body3) {
    res.status(404).json({error:"No data found"})
    return;
  }
  if(!body3.title) {
    res.status(404).json({error:"No data found for title"})
    return;
  }
  if(!body3.description) {
    res.status(404).json({error:"No data found for description"})
    return;
  }
  if(!body3.hoursEstimated) {
    res.status(404).json({error:"No data found for hoursEstimated"})
    return;
  }
  if(body3.completed == null) {
    res.status(404).json({error:"No data found for completed"})
    return;
  }
  try {
    await tasksDataR.get(id2);
  }
  catch(e) {
    res.status(404).json({error: "No id found"});
    return;
  }
  try {
    let tasks = await tasksDataR.update(id2, body3.title, body3.description, body3.hoursEstimated, body3.completed)
    res.status(200).json(tasks);
  } catch(e) {
    res.sendStatus(500);
    console.log(e);
  }
});

    app.route("/api/tasks/:id/comments").post(async (req: Request, res: Response) => {
      const body4 = req.body;
      const id3 = req.params.id;
      if(!id3) {
        res.status(404).json({error: "Need an Id"})
        return;
      }
      if(!body4.name) {
        res.status(404).json({error: "Need a name"})
        return;
      }
      if(typeof(body4.name) != "string") {
        res.status(404).json({error: "Name must be a string"});
        return
      }
      if(!body4.comment) {
        res.status(404).json({error: "need a comment"});
        return;
      }
      if(typeof(body4.comment) != "string") {
        res.status(404).json({error: "Comment must be a string"});
        return
      }
      try {
        await tasksDataR.get(id3);
      }
      catch(e) {
        console.log(e);
        res.sendStatus(404).json({error: "Not found"});
        return;
      }
      try {
        let grabComment = await tasksDataR.createComment(id3, body4.name, body4.comment);
        res.sendStatus(200).json(grabComment);
      } catch(e) {
        res.sendStatus(500);
        console.log(e);
      }
    });
    app.route("/api/tasks/:taskId/:commentId").delete(async (req: Request, res: Response ) => {
  const taskId = req.params.taskId;
  const commentId = req.params.commentId;
  if(!taskId) {
    res.status(404).json({error: "Task ID does not exist"});
  }
  if(!commentId) {
    res.status(404).json({error: "CommentId does not exist"});
  }
  try {
    await tasksDataR.get(taskId)
  } catch(e) {
    res.status(404).json({"No Task found with that TaskId"});
    console.log(e)
  }
  try {
    const removedComment = await tasksDataR.removeComment(taskId, commentId);
    res.status(200).json(removedComment)
  } catch(e) {
    console.log(e);
    res.status(409).json("Error: Could not remove Comment")
}});
    }
}
