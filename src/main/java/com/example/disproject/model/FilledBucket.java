package com.example.disproject.model;

import java.util.List;

public record FilledBucket (
        Bucket bucket,
        List<Task> tasks
)
{
}
