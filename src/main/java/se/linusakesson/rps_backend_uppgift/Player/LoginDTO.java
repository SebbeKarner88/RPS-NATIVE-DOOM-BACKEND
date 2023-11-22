package se.linusakesson.rps_backend_uppgift.Player;

import lombok.Data;
import lombok.Value;
import se.linusakesson.rps_backend_uppgift.Game.GameEntity;

import java.util.UUID;

@Value
public class LoginDTO {
    UUID token;
    String username;
}
