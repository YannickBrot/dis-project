package com.example.disproject.service;

import com.example.disproject.model.Task;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.reflect.ConstructorMapper;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;

@Service
public class TaskService {
    private final Jdbi jdbi;

    public TaskService(DataSource dataSource) {
        this.jdbi = Jdbi.create(dataSource)
                .registerRowMapper(ConstructorMapper.factory(Task.class));
    }

    public Task createTask(Task task) {
        if(!taskDescriptionIsGood(task)) throw new IllegalArgumentException("Invalid characters in description.");
        return this.jdbi.withHandle(h ->
                h.createUpdate("""
                                INSERT INTO tasks (name, description, bucket_id)
                                VALUES (:name, :description, :bucketId)
                                """)
                        .bindMethods(task)
                        .executeAndReturnGeneratedKeys()
                        .mapTo(Task.class)
                        .one()
        );
    }

    public Task updateTask(Task task) {
        if(!taskDescriptionIsGood(task)) throw new IllegalArgumentException("Invalid characters in description.");
        return this.jdbi.withHandle(h ->
                h.createUpdate("""
                                UPDATE tasks
                                SET name = :name, description = :description, bucket_id = :bucketId
                                WHERE id = :id
                                """)
                        .bindMethods(task)
                        .executeAndReturnGeneratedKeys()
                        .mapTo(Task.class)
                        .one()
        );
    }

    /***
     * Ensure task descriptions do not include potentially harmful characters that could be used for SQL injection or XSS attacks if not properly sanitized.
     * @param task
     * @return True if the description of the task does not contain illegal characters
     */
    private boolean taskDescriptionIsGood(Task task){
        return task.description().matches("^[^<>{}\"/|;:.*%$#!@]+$");
    }

    public boolean deleteTask(int taskId) {
        return this.jdbi.withHandle(h ->
                h.createUpdate("DELETE FROM tasks WHERE id = :taskId")
                        .bind("taskId", taskId)
                        .execute() > 0
        );
    }
}
