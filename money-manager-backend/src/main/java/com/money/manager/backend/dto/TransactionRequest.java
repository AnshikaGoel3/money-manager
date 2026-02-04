package com.money.manager.backend.dto;

import com.money.manager.backend.model.TransactionType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class TransactionRequest {

    @NotNull
    private TransactionType type;

    @Positive
    private Double amount;

    private String category;

    private String division;

    private String account;

    private String description;
}
