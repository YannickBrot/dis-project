package com.example.disproject.service;

import com.example.disproject.model.Project;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.reflect.ConstructorMapper;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.List;

@Service
public class ProjectService {
    private final Jdbi jdbi;

    public ProjectService(DataSource dataSource) {
        this.jdbi = Jdbi.create(dataSource)
                .registerRowMapper(ConstructorMapper.factory(Project.class));
    }

    public List<Project> readProjects() {
        return this.jdbi.withHandle(handle ->
                handle.createQuery("SELECT * FROM projects")
                        .mapTo(Project.class)
                        .list()
        );
    }

    public Project createProject(Project project) {
        if (!project.name().matches("^[\\w\\-\\s]+$")) {
            throw new IllegalArgumentException("Invalid project name. Only letters, numbers, underscores, hyphens, and spaces are allowed.");
        }
        return this.jdbi.withHandle(h -> {
                    var created = h.createUpdate("""
                                    INSERT INTO projects (name, description, created_at, deadline, hour_estimate, price)
                                    VALUES (:name, :description, :createdAt, :deadline, :hourEstimate, :price)
                                     """)
                            .bindMethods(project)
                            .executeAndReturnGeneratedKeys()
                            .mapTo(Project.class)
                            .one();
                    h.createUpdate("""
                                    INSERT INTO buckets (project_id, name) VALUES (:projectId, 'TO-DO');
                                    INSERT INTO buckets (project_id, name) VALUES (:projectId, 'DOING');
                                    INSERT INTO buckets (project_id, name) VALUES (:projectId, 'DONE');
                                    """)
                            .bind("projectId", created.id())
                            .execute();
                    return created;
                }
        );
    }
}
