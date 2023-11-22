package se.linusakesson.rps_backend_uppgift.Player;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import se.linusakesson.rps_backend_uppgift.Game.GameEntity;

import java.util.List;
import java.util.UUID;

@Entity(name = "Player")
@Table(name = "player")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PlayerEntity {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "playerOne")
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonIgnore
    private List<GameEntity> playerOneGame;

    @OneToMany(mappedBy = "playerTwo")
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonIgnore
    private List<GameEntity> playerTwoGame;

    public void setPlayerOneGame(GameEntity playerOneGame) {
        this.playerOneGame.add(playerOneGame);
    }

    public void setPlayerTwoGame(GameEntity playerTwoGame) {
        this.playerTwoGame.add(playerTwoGame);
    }

}
