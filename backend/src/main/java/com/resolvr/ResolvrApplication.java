package com.resolvr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ResolvrApplication {

    public static void main(String[] args) {
        SpringApplication.run(ResolvrApplication.class, args);
    }
}
