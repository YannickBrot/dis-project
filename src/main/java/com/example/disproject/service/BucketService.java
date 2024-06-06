package com.example.disproject.service;

import com.example.disproject.model.Bucket;
import com.example.disproject.model.FilledBucket;
import com.example.disproject.model.Task;
import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.reflect.ConstructorMapper;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Service
public class BucketService {
    private final Jdbi jdbi;

    public BucketService(DataSource dataSource){
        this.jdbi = Jdbi.create(dataSource)
                .registerRowMapper(ConstructorMapper.factory(Bucket.class))
                .registerRowMapper(ConstructorMapper.factory(Task.class));
    }

    public List<FilledBucket> getBucketsForProject(int projectId){
        return this.jdbi.withHandle(h -> {
            var buckets = h.createQuery("SELECT * FROM buckets WHERE project_id = :projectId")
                    .bind("projectId", projectId)
                    .mapTo(Bucket.class)
                    .list();
            var result = new ArrayList<FilledBucket>();
            buckets.forEach(bucket -> result.add(new FilledBucket(bucket, getTasksForBucket(h, bucket.id()))));
            return result;
        });
    }

    private List<Task> getTasksForBucket(Handle h, int bucketId){
        return h.createQuery("SELECT * FROM tasks WHERE bucket_id = :bucketId")
                .bind("bucketId", bucketId)
                .mapTo(Task.class)
                .list();
    }
}
