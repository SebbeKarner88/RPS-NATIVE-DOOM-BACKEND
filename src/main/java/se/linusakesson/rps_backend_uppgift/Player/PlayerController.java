package se.linusakesson.rps_backend_uppgift.Player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
public class PlayerController {

    private final PlayerService playerService;


    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }


    @CrossOrigin
    @GetMapping("/token")
    public UUID createToken(){
        return playerService.createToken()
                .getUserId();
    }

    @CrossOrigin
    @PostMapping("/add")
    public boolean registerPlayer(@RequestBody UpdatePlayer updatePlayer, @RequestHeader(value = "token") UUID userId) {
       return playerService.registerPlayer(updatePlayer, userId);
    }

    @CrossOrigin
    @PostMapping("/update")
    public LoginDTO loginPlayer(@RequestBody UpdatePlayer updatePlayer) {
        return playerService.loginPlayer(updatePlayer)
                .map(PlayerController::playerDTO)
                .orElse(null);
    }

    private static LoginDTO playerDTO (PlayerEntity playerEntity) {
        return new LoginDTO(
                playerEntity.getUserId(),
                playerEntity.getUsername()
        );
    }
}



