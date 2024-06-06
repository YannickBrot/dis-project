package com.example.disproject.model;

public record Task(
        int id,
        int bucketId,
        String name,
        String description
) {
}
