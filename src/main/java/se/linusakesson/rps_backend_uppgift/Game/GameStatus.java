package se.linusakesson.rps_backend_uppgift.Game;

import jakarta.persistence.*;
import lombok.Value;
import se.linusakesson.rps_backend_uppgift.Player.PlayerEntity;

import java.util.UUID;

@Value
public class GameStatus {

    UUID gameStatusId;
    PlayerEntity playerOne;
    GameMove playerMove;
    GameCondition gameStatus;
    PlayerEntity playerTwo;
    GameMove opponentMove;
}
