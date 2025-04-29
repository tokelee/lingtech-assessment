import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/server";

let task_id: string;

beforeEach(async () => {
    const res = await request(app).post("/api/tasks").send({
      title: "Study physics",
      description: "Revise wave-particle duality",
      status: "pending",
    });
  
    task_id = res.body.data.task.id; // Save ID for use in tests
  });


// TEST: GET ALL TASKS
describe("GET /tasks", () => {
  it("should respond with list all tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
  });
});

// TEST: GET ONE TASK
describe("GET /tasks", () => {
  it("should get one task by id", async () => {
    const res = await request(app).get(`/api/tasks/${task_id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.task.id).toBe(task_id);
    expect(res.body.data.task.title).toBe("Study physics");
  });
});

// TEST: CREATE A NEW TASK
describe("POST /tasks", () => {
  it("should create a new task", async () => {
    const res = await request(app).post("/api/tasks").send({
      title: "Read Lead Physics",
      description: "Read a book on Physics with electronics business",
      status: "pending",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.task).toHaveProperty("id");
  });
});

// TEST: EDIT TASK
describe("PUT /tasks/:id", () => {
  it("should update a task", async () => {
    const res = await request(app).put(`/api/tasks/${task_id}`).send({
      title: "Research quantum physics",
      status: "completed",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.task.status).toBe("completed");

    const check = await request(app).get(`/api/tasks/${task_id}`);
    expect(check.statusCode).toBe(200);
    expect(check.body.data.task.title).toBe("Research quantum physics");
  });
});

// TEST: DELETE TASK
describe("DELETE /tasks/:id", () => {
  it("should delete a task by id", async () => {
    const res = await request(app).delete(`/api/tasks/${task_id}`);
    expect(res.statusCode).toBe(200);

    const check = await request(app).get(`/api/tasks/${task_id}`);
    expect(check.statusCode).toBe(404); 
  });
});
