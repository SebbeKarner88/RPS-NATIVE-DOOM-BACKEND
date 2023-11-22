package se.linusakesson.rps_backend_uppgift.Game;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GameRepository extends JpaRepository<GameEntity, UUID> {
}
