package com.money.manager.backend.repository;

import com.money.manager.backend.model.Transaction;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends MongoRepository<Transaction, String> {

    @Aggregation(pipeline = {
        "{ $match: { userEmail: ?0 } }",
        "{ $group: { _id: '$type', total: { $sum: '$amount' } } }"
    })
    List<TypeTotal> getTotalsByType(String userEmail);

    List<Transaction> findByUserEmail(String userEmail);

    List<Transaction> findByUserEmailAndCreatedAtBetween(String userEmail, LocalDateTime start, LocalDateTime end);

    @Aggregation(pipeline = {
        "{ $match: { userEmail: ?0, createdAt: { $gte: ?1, $lte: ?2 } } }",
        "{ $group: { _id: '$type', total: { $sum: '$amount' } } }"
    })
    List<TypeTotal> getTotalsByTypeAndDateRange(
            String userEmail,
            LocalDateTime start,
            LocalDateTime end
    );

    @Aggregation(pipeline = {
        "{ $match: { userEmail: ?0, type: ?1 } }",
        "{ $group: { _id: '$category', total: { $sum: '$amount' } } }"
    })
    List<CategoryTotal> getCategoryTotals(
            String userEmail,
            String type
    );

    @Aggregation(pipeline = {
        "{ $match: { userEmail: ?0, type: ?1, division: ?2 } }",
        "{ $group: { _id: '$category', total: { $sum: '$amount' } } }"
    })
    List<CategoryTotal> getCategoryTotalsByDivision(
            String userEmail,
            String type,
            String division
    );

    Optional<Transaction> findByIdAndUserEmail(String id, String userEmail);

}
