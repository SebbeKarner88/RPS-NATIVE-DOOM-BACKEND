package se.linusakesson.rps_backend_uppgift.Player;

import lombok.Value;
import se.linusakesson.rps_backend_uppgift.Game.GameEntity;

import java.util.UUID;

@Value
public class UpdatePlayer {
    UUID token;
    String username;
    String password;
    GameEntity playerOne;
    GameEntity playerTwo;
}
