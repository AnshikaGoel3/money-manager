package com.money.manager.backend.controller;

import com.money.manager.backend.dto.TransactionRequest;
import com.money.manager.backend.dto.TransactionUpdateRequest;
import com.money.manager.backend.model.Transaction;
import com.money.manager.backend.service.TransactionService;
import jakarta.validation.Valid;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/api/auth", "/auth"})
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addTransaction(@Valid @RequestBody TransactionRequest request) {

        String userEmail = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        transactionService.addTransaction(userEmail, request);
    }

    @GetMapping
    public List<Transaction> getTransactions() {

        String userEmail = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return transactionService.getAllTransactions(userEmail);
    }

    @GetMapping("/filter")
    public List<Transaction> filterByDate(
            @RequestParam String startDate,
            @RequestParam String endDate
    ) {

        String userEmail = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);

        return transactionService.getTransactionsBetween(userEmail, start, end);
    }

    @PutMapping("/{id}")
    public void updateTransaction(
            @PathVariable String id,
            @Valid @RequestBody TransactionUpdateRequest request
    ) {

        String userEmail = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        transactionService.updateTransaction(id, userEmail, request);
    }

        
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTransaction(@PathVariable String id) {
        String userEmail = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        transactionService.deleteTransaction(id, userEmail); // Ensure this method exists in your Service
    }

}
