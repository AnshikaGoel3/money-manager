package com.money.manager.backend.service;

import com.money.manager.backend.dto.CategoryBreakdownResponse;
import com.money.manager.backend.dto.DashboardSummaryResponse;
import com.money.manager.backend.model.TimePeriod;
import com.money.manager.backend.repository.CategoryTotal;
import com.money.manager.backend.repository.TransactionRepository;
import com.money.manager.backend.repository.TypeTotal;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DashboardService {

    private final TransactionRepository transactionRepository;

    public DashboardService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public DashboardSummaryResponse getSummary(String userEmail) {

        List<TypeTotal> totals = transactionRepository.getTotalsByType(userEmail);

        double income = 0;
        double expense = 0;

        for (TypeTotal t : totals) {
            if ("INCOME".equals(t.get_id())) {
                income = t.getTotal();
            } else if ("EXPENSE".equals(t.get_id())) {
                expense = t.getTotal();
            }
        }

        return new DashboardSummaryResponse(
                income,
                expense,
                income - expense
        );
    }

    public DashboardSummaryResponse getSummaryByPeriod(
            String userEmail,
            TimePeriod period
    ) {

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start;

        switch (period) {
            case WEEK -> start = now.minusDays(7);
            case MONTH -> start = now.minusMonths(1);
            case YEAR -> start = now.minusYears(1);
            default -> throw new IllegalArgumentException("Invalid period");
        }

        List<TypeTotal> totals =
                transactionRepository.getTotalsByTypeAndDateRange(
                        userEmail, start, now
                );

        double income = 0;
        double expense = 0;

        for (TypeTotal t : totals) {
            if ("INCOME".equals(t.get_id())) income = t.getTotal();
            if ("EXPENSE".equals(t.get_id())) expense = t.getTotal();
        }

        return new DashboardSummaryResponse(
                income,
                expense,
                income - expense
        );
    }

    public List<CategoryBreakdownResponse> getCategoryBreakdown(
            String userEmail,
            String type
    ) {

        List<CategoryTotal> results =
                transactionRepository.getCategoryTotals(userEmail, type);

        return results.stream()
                .map(r -> new CategoryBreakdownResponse(
                        r.get_id(),
                        r.getTotal()
                ))
                .toList();
    }


}
