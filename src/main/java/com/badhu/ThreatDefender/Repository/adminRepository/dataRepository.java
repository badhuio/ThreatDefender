package com.badhu.ThreatDefender.Repository.adminRepository;

import com.badhu.ThreatDefender.Model.Payload;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface dataRepository extends MongoRepository<Payload, String> {

    boolean existsByPayload(String payload);
}