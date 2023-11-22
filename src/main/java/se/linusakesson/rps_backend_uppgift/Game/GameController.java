package se.linusakesson.rps_backend_uppgift.Game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/games")
public class GameController {


    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @CrossOrigin
    @PostMapping("/create")
    public GameStatus startGame(@RequestHeader(value = "token") UUID token) {
        return gameService.startGame(token)
                .map(GameController::GameEntityDTO)
                .orElse(null);
    }

    @CrossOrigin
    @PostMapping("/add")
    public GameStatus joinGame(@RequestHeader(value = "token") UUID token,
                               @RequestHeader(value = "gameId") UUID gameID) {
        return gameService.joinGame(token, gameID)
                .map(GameController::GameEntityDTO)
                .orElse(null);
    }

    @CrossOrigin
    @GetMapping
    public List<GameEntity> openGames(){
        return gameService.listAllGames()
                .stream()
                .filter(gameStatusDTO1 -> gameStatusDTO1.getGameStatus().equals(GameCondition.OPEN))
                .collect(Collectors.toList());
    }

    @CrossOrigin
    @GetMapping("/allGames")
    public List<GameEntity> allGames(@RequestHeader(value = "token") UUID token){
        return new ArrayList<>(gameService.listPlayerGames(token));
    }

    @CrossOrigin
    @GetMapping("/gameID")
    public GameStatus getGameStatus(@RequestHeader(value = "gameID") UUID gameID,
                                    @RequestHeader(value = "token") UUID token) throws InterruptedException {
        return gameService.checkGameCondition(gameID, token)
                .map(GameController::GameEntityDTO)
                .orElse(null);
    }

    @CrossOrigin
    @PostMapping("/update")
    public GameStatus makeMove(@RequestHeader(value = "sign") String move,
                               @RequestHeader(value = "token") UUID userToken,
                               @RequestHeader(value = "gameID") UUID gameStatus) {

        return gameService.makeMove(move, userToken, gameStatus)
                .map(GameController::GameEntityDTO)
                .orElse(null);
    }

    private static GameStatus GameEntityDTO(GameEntity gameEntity) {
        return new GameStatus(
                gameEntity.getGameStatusId(),
                gameEntity.getPlayerOne(),
                gameEntity.getPlayerMove(),
                gameEntity.getGameStatus(),
                gameEntity.getPlayerTwo(),
                gameEntity.getOpponentMove()
        );
    }
}