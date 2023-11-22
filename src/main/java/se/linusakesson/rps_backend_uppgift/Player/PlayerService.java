package se.linusakesson.rps_backend_uppgift.Player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    public PlayerEntity createToken() {
        PlayerEntity playerEntity = new PlayerEntity(
                UUID.randomUUID(),
                null,
                null,
                null,
                null
        );
        playerRepository.save(playerEntity);
        return playerEntity;
    }

    public boolean registerPlayer(UpdatePlayer updatePlayer, UUID userId){
        Optional<PlayerEntity> playerEntity = playerRepository.findById(userId);

        if (playerEntity.isPresent() && playerRepository.findByUsername(updatePlayer.getUsername()).isEmpty()) {

            playerEntity.get().setUsername(updatePlayer.getUsername());
            playerEntity.get().setPassword(passwordEncoder().encode(updatePlayer.getPassword()));

            playerRepository.save(playerEntity.get());
            return true;
        }
        return false;
    }

    public Optional<PlayerEntity> loginPlayer(UpdatePlayer updatePlayer) {

        if (playerRepository.findByUsername(updatePlayer.getUsername()).isPresent()) {
            PlayerEntity player = playerRepository.findByUsername(updatePlayer.getUsername()).get();
            if (BCrypt.checkpw(updatePlayer.getPassword(), player.getPassword())) {
                return Optional.of(player);
            }
        }
        return Optional.empty(); //Oklar om det ska vara null istället.
    }

}

