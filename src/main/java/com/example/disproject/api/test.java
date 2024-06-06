package com.example.disproject.api;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import org.springframework.stereotype.Component;

import static jakarta.ws.rs.core.MediaType.APPLICATION_JSON;

@Component
@Path("/test")
public class test {
    @GET
    @Produces(APPLICATION_JSON)
    public String helloWorld(){
        return "Hello";
    }
}
