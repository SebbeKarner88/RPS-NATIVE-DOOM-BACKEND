package se.linusakesson.rps_backend_uppgift.Player;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PlayerRepository extends JpaRepository<PlayerEntity, UUID> {

    Optional<PlayerEntity> findByUsername(String username);

}
