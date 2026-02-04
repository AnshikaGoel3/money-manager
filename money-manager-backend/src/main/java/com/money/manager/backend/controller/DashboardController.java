package com.money.manager.backend.controller;

import com.money.manager.backend.dto.CategoryBreakdownResponse;
import com.money.manager.backend.dto.DashboardSummaryResponse;
import com.money.manager.backend.model.TimePeriod;
import com.money.manager.backend.service.DashboardService;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/api/dashboard", "/dashboard"})
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public DashboardSummaryResponse getSummary() {

        String userEmail = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return dashboardService.getSummary(userEmail);
    }

    @GetMapping("/summary/{period}")
    public DashboardSummaryResponse getSummaryByPeriod(
            @PathVariable TimePeriod period
    ) {

        String userEmail = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return dashboardService.getSummaryByPeriod(userEmail, period);
    }

    @GetMapping("/categories")
    public List<CategoryBreakdownResponse> getCategoryBreakdown(
            @RequestParam String type
    ) {

        String userEmail = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return dashboardService.getCategoryBreakdown(userEmail, type);
    }

}
