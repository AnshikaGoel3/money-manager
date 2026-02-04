package com.money.manager.backend.config;

import com.money.manager.backend.model.User;
import com.money.manager.backend.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.CommandLineRunner;

import java.time.LocalDateTime;

@Configuration
public class DataInitConfig {

    @Bean
    CommandLineRunner init(UserRepository userRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                User user = new User(
                        null,
                        "test@money.com",
                        "dummy-password",
                        LocalDateTime.now()
                );
                userRepository.save(user);
            }
        };
    }
}
