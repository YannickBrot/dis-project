package com.example.disproject.model;

import java.time.LocalDateTime;

public record Project(
        int id,
        String name,
        String description,
        LocalDateTime createdAt,
        LocalDateTime deadline,
        int hourEstimate,
        int price
) {
}
