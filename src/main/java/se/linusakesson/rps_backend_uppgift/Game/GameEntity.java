package se.linusakesson.rps_backend_uppgift.Game;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.linusakesson.rps_backend_uppgift.Player.PlayerEntity;

import java.util.UUID;

@Entity(name = "Game")
@Table(name = "game")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class GameEntity {
    @Id
    @Column(name = "gamestatus_id")
    UUID gameStatusId;

    @ManyToOne
    @JoinColumn(name = "playerOneGame")
    PlayerEntity playerOne;

    @Column(name = "player_move")
    @Enumerated(EnumType.STRING)
    GameMove playerMove;

    @Column(name = "game_status")
    @Enumerated(EnumType.STRING)        // Gör så att det står "OPEN" till exempel ist för 1 i databasen.
    GameCondition gameStatus;

    @ManyToOne
    @JoinColumn(name = "playerTwoGame")
    PlayerEntity playerTwo;

    @Column(name = "opponent_move")
    @Enumerated(EnumType.STRING)
    GameMove opponentMove;

}
