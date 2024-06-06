package com.example.disproject.api;

import com.example.disproject.model.Task;
import com.example.disproject.service.TaskService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import org.springframework.stereotype.Component;

import static jakarta.ws.rs.core.MediaType.APPLICATION_JSON;

@Component
@Path("/tasks")
public class TaskAPI {
    private final TaskService taskService;

    @Inject

    public TaskAPI(TaskService taskService) {
        this.taskService = taskService;
    }

    @POST
    @Produces(APPLICATION_JSON)
    @Consumes(APPLICATION_JSON)
    public Task postTask(Task task){
        return this.taskService.createTask(task);
    }

    @PUT
    @Produces(APPLICATION_JSON)
    @Consumes(APPLICATION_JSON)
    public Task putTask(Task task){
        return this.taskService.updateTask(task);
    }

    @DELETE
    @Path("/{taskId}")
    public boolean deleteTask(@PathParam("taskId")int taskId){
        return this.taskService.deleteTask(taskId);
    }
}
