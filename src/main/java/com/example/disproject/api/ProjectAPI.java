package com.example.disproject.api;

import com.example.disproject.model.FilledBucket;
import com.example.disproject.model.Project;
import com.example.disproject.service.BucketService;
import com.example.disproject.service.ProjectService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import org.springframework.stereotype.Component;

import java.util.List;

import static jakarta.ws.rs.core.MediaType.APPLICATION_JSON;

@Component
@Path("/projects")
public class ProjectAPI {

    private final ProjectService projectService;
    private final BucketService bucketService;

    @Inject
    public ProjectAPI(ProjectService projectService, BucketService bucketService) {
        this.projectService = projectService;
        this.bucketService = bucketService;
    }
    @GET
    @Produces(APPLICATION_JSON)
    public List<Project> getProjects(){
        return this.projectService.readProjects();
    }

    @POST
    @Consumes(APPLICATION_JSON)
    @Produces(APPLICATION_JSON)
    public Project createProject(Project project){
        return this.projectService.createProject(project);
    }

    @GET
    @Produces(APPLICATION_JSON)
    @Path("/{projectId}/buckets")
    public List<FilledBucket> getBucketsForProject(@PathParam("projectId") int projectId){
        return this.bucketService.getBucketsForProject(projectId);
    }
}
