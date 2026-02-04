package com.money.manager.backend.dto;

import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class TransactionUpdateRequest {

    @Positive
    private Double amount;

    private String category;
    private String division;
    private String account;
    private String description;
}
