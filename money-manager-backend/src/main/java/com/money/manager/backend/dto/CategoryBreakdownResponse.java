package com.money.manager.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryBreakdownResponse {
    private String category;
    private Double total;
}
