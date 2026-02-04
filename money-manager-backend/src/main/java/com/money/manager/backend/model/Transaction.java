package com.money.manager.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    private String id;

    private String userEmail;

    private TransactionType type; // INCOME or EXPENSE

    private Double amount;

    private String category;       // fuel, food, medical, etc.

    private String division;       // OFFICE or PERSONAL

    private String account;        // CASH, BANK, WALLET

    private String description;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
