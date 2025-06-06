import fs from "fs/promises";
import path from "path";

const project_root = path.resolve();
const task_file_path = path.join(project_root, 'tasks.json');


// Read multiple tasks
async function read_tasks(): Promise<TaskModel[]> {
    try{
        const tasks = await fs.readFile(task_file_path, 'utf-8');
        return JSON.parse(tasks);
    }catch(err:any){
        if(err.code === 'ENOENT'){
            console.log("File not found, initializing with an empty task list.");
            await fs.writeFile(task_file_path, '[]') 
            return [];
        }else{
            console.log("Failed to read tasks from file", err);
            return []
        }
    }
}


// Read one task
async function read_task(id:string): Promise<TaskModel | undefined> {
    const tasks = await read_tasks();
    const task = tasks.find((task)=>task.id === id);
    return task;
}

async function add_task({title, description, status}:{title:string; description: string; status: "pending" | "completed"}): Promise<TaskModel> {
    const existing_tasks:TaskModel[] = await read_tasks();
    let id:string;
    id = existing_tasks.length > 0 ? (+(existing_tasks[(existing_tasks.length)-1].id)+1).toString() : "1";
    const new_task = {id:id, title, description, status};
    existing_tasks.push(new_task);
    await fs.writeFile(task_file_path, JSON.stringify(existing_tasks))
    return new_task;
}

async function update_task({id, title, description, status}:TaskModel): Promise<TaskModel | undefined | boolean> {
    const tasks:TaskModel[] = await read_tasks();
    const task_index = tasks.findIndex((task)=>task.id === id);
    if(!tasks[task_index]) return false
    tasks[task_index] = {
        id: tasks[task_index].id, 
        title: title || tasks[task_index].title, 
        description: description || tasks[task_index].description, 
        status: status || tasks[task_index].status
    };
    await fs.writeFile(task_file_path, JSON.stringify(tasks));
    return tasks[task_index];
}

async function delete_task(id:string) {
    const tasks:TaskModel[] = await read_tasks();
    const task_index = tasks.findIndex((task)=>task.id === id);
    if(!tasks[task_index]) return false
    tasks.splice(task_index, 1)
    await fs.writeFile(task_file_path, JSON.stringify(tasks));
    return true;
}

export {read_task, add_task, read_tasks, update_task, delete_task}