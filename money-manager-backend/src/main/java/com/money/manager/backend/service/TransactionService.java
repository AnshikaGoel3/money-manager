package com.money.manager.backend.service;

import com.money.manager.backend.dto.TransactionRequest;
import com.money.manager.backend.dto.TransactionUpdateRequest;
import com.money.manager.backend.model.Transaction;
import com.money.manager.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.time.Duration;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public void addTransaction(String userEmail, TransactionRequest request) {

        Transaction transaction = new Transaction();
        transaction.setUserEmail(userEmail);
        transaction.setType(request.getType());
        transaction.setAmount(request.getAmount());
        transaction.setCategory(request.getCategory());
        transaction.setDivision(request.getDivision());
        transaction.setAccount(request.getAccount());
        transaction.setDescription(request.getDescription());
        transaction.setCreatedAt(LocalDateTime.now());
        transaction.setUpdatedAt(LocalDateTime.now());

        transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactions(String userEmail) {
        return transactionRepository.findByUserEmail(userEmail);
    }

    public List<Transaction> getTransactionsBetween(
            String userEmail,
            LocalDateTime start,
            LocalDateTime end
    ) {
        return transactionRepository.findByUserEmailAndCreatedAtBetween(
                userEmail, start, end
        );
    }


    public void deleteTransaction(String id, String userEmail) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!transaction.getUserEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized: You cannot delete this transaction");
        }

        transactionRepository.deleteById(id);
    }

    public void updateTransaction(
            String transactionId,
            String userEmail,
            TransactionUpdateRequest request
    ) {

        Transaction transaction = transactionRepository
                .findByIdAndUserEmail(transactionId, userEmail)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        Duration duration =
                Duration.between(transaction.getCreatedAt(), LocalDateTime.now());

        if (duration.toHours() > 12) {
            throw new RuntimeException("Transaction can only be edited within 12 hours");
        }

        if (request.getAmount() != null)
            transaction.setAmount(request.getAmount());

        if (request.getCategory() != null)
            transaction.setCategory(request.getCategory());

        if (request.getDivision() != null)
            transaction.setDivision(request.getDivision());

        if (request.getAccount() != null)
            transaction.setAccount(request.getAccount());

        if (request.getDescription() != null)
            transaction.setDescription(request.getDescription());

        transaction.setUpdatedAt(LocalDateTime.now());

        transactionRepository.save(transaction);
    }

}
