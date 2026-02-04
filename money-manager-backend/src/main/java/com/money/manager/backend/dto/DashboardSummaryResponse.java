package com.money.manager.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardSummaryResponse {

    private Double totalIncome;
    private Double totalExpense;
    private Double balance;
}
