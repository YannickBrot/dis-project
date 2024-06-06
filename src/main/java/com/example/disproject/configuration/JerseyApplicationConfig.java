package com.example.disproject.configuration;

import com.example.disproject.api.ProjectAPI;
import com.example.disproject.api.TaskAPI;
import jakarta.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

@Component
@ApplicationPath("/api")
public class JerseyApplicationConfig extends ResourceConfig {
    public JerseyApplicationConfig() {
        register(ProjectAPI.class);
        register(TaskAPI.class);
        register(CorsFilter.class);
    }
}
