import ExpressAsyncHandler from "express-async-handler";
import { Request, Response } from "express"; 
import { add_task, read_task, read_tasks, update_task } from "#utils/file_handler.utils.js";
import ErrorResponse from "#utils/error_response.utils.js";

const ADD_TASK_CTRL = ExpressAsyncHandler(async (req: Request, res: Response)=>{
    const {title, description, status} = req.body;
    const task = await add_task({title, description, status});
    res.status(201).json({success: true, message:"Task added successfully!", data:{task}})
})

const READ_TASKS_CTRL = ExpressAsyncHandler(async (req: Request, res: Response)=>{
    const tasks = await read_tasks();
    res.status(200).json({success: true, data:{tasks: tasks.reverse()}})
})

const READ_ONE_TASK_CTRL = ExpressAsyncHandler(async (req: Request, res: Response)=>{
    const {id} = req.params
    const task = await read_task(id);
    if(!task){
        throw new ErrorResponse(404, "Task not found");
    }
    res.status(200).json({success: true, message:"success", data:{task}})
})

const EDIT_TASK_CTRL = ExpressAsyncHandler(async (req: Request, res: Response)=>{
    const {id} = req.params;
    const {title, description, status} = req.body;
    if(!id){
        throw new ErrorResponse(400, "Invalid request!")
    }
    
    const task = await update_task({id, title, description, status});
    res.status(200).json({success: true, message:"Task updated successfully!", data:{task}})
})

export {ADD_TASK_CTRL, READ_TASKS_CTRL, READ_ONE_TASK_CTRL, EDIT_TASK_CTRL}