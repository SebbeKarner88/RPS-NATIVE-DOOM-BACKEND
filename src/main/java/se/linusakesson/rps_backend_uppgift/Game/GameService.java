package se.linusakesson.rps_backend_uppgift.Game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.linusakesson.rps_backend_uppgift.Player.PlayerRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final PlayerRepository playerRepository;

    @Autowired
    public GameService(GameRepository gameRepository, PlayerRepository playerRepository) {
        this.gameRepository = gameRepository;
        this.playerRepository = playerRepository;
    }

    public Optional<GameEntity> startGame(UUID token) {
        GameEntity gameEntity = new GameEntity(
                UUID.randomUUID(),
                playerRepository.findById(token).get(),
                null,
                GameCondition.OPEN,
                null,
                null
        );
        gameRepository.save(gameEntity);
        playerRepository.getReferenceById(token).setPlayerOneGame(gameEntity);

        return Optional.of(gameEntity);
    }

    public Optional<GameEntity> joinGame(UUID token, UUID gameID) {
        GameEntity gameEntity = new GameEntity();

        if(gameRepository.existsById(gameID)) {
            gameEntity = gameRepository.findById(gameID).get();


            gameEntity.setPlayerTwo(playerRepository.getReferenceById(token));
            gameEntity.setGameStatus(GameCondition.ACTIVE);

            gameRepository.save(gameEntity);
        }

        return Optional.of(gameEntity);
    }

    public List<GameEntity> listAllGames() {
        return gameRepository.findAll();
    }

    public List<GameEntity> listPlayerGames(UUID token) {

        return gameRepository.findAll()
                .stream()
                .filter(gameEntity -> gameEntity.playerOne.getUserId().equals(token) ||
                        gameEntity.playerTwo.getUserId().equals(token))
                .toList();
    }

    public Optional<GameEntity> checkGameCondition(UUID gameID, UUID token) throws InterruptedException {
        GameEntity gameEntity = new GameEntity();
        if(gameRepository.existsById(gameID)) {
            gameEntity = gameRepository.findById(gameID).get();

            if (!gameEntity.getGameStatus().equals(GameCondition.ACTIVE)) {

                if (gameEntity.getPlayerOne().getUserId().equals(token)) {

                    System.out.println(gameEntity.getGameStatus());

                } else if (gameEntity.getPlayerTwo().getUserId().equals(token)) {

                    GameEntity assign = gameRepository.findById(gameID).get();      // gör en kopia på gamestatus

                    switch (gameEntity.getGameStatus()) {

                        case WIN -> {
                            assign.setGameStatus(GameCondition.LOSE);       // När player 1 visar WIN så visar Player 2 LOSE
                            return Optional.ofNullable(assign);
                        }
                        case LOSE -> {
                            assign.setGameStatus(GameCondition.WIN);        // När player 1 visar LOSE så visar Player 2 WIN
                            return Optional.ofNullable(assign);
                        }

                    }
                } else {
                    System.out.println("Du var inte med");
                }
            }
        }
        gameRepository.save(gameEntity);
        return Optional.of(gameEntity);
    }

    public Optional<GameEntity> makeMove(String move, UUID token, UUID gameStatus) {
        GameEntity game = new GameEntity();

        if (gameRepository.existsById(gameStatus)) {
            game = gameRepository.findById(gameStatus).get();

            if (game.playerOne.getUserId().equals(token)) {
                switch (move) {
                    case "rock" -> game.setPlayerMove(GameMove.ROCK);
                    case "paper" -> game.setPlayerMove(GameMove.PAPER);
                    case "scissors" -> game.setPlayerMove(GameMove.SCISSORS);
                }
                gameRepository.save(game);
            }

            if (game.playerTwo.getUserId().equals(token)) {
                switch (move) {
                    case "rock" -> game.setOpponentMove(GameMove.ROCK);
                    case "paper" -> game.setOpponentMove(GameMove.PAPER);
                    case "scissors" -> game.setOpponentMove(GameMove.SCISSORS);
                }
                gameRepository.save(game);
            }

            if (game.getPlayerMove() != null &&
                    game.getOpponentMove() != null) {

                if (game.getPlayerMove().equals(GameMove.ROCK)) {

                    if (game.getOpponentMove().equals(GameMove.ROCK)) {

                        game.setGameStatus(GameCondition.DRAW);

                    } else if (game.getOpponentMove().equals(GameMove.PAPER)) {

                        game.setGameStatus(GameCondition.LOSE);

                    } else if (game.getOpponentMove().equals(GameMove.SCISSORS)) {

                        game.setGameStatus(GameCondition.WIN);

                    }
                }

                if (game.getPlayerMove().equals(GameMove.PAPER)) {

                    if (game.getOpponentMove().equals(GameMove.ROCK)) {

                        game.setGameStatus(GameCondition.WIN);

                    } else if (game.getOpponentMove().equals(GameMove.PAPER)) {

                        game.setGameStatus(GameCondition.DRAW);

                    } else if (game.getOpponentMove().equals(GameMove.SCISSORS)) {

                        game.setGameStatus(GameCondition.LOSE);

                    }
                }

                if (game.getPlayerMove().equals(GameMove.SCISSORS)) {

                    if (game.getOpponentMove().equals(GameMove.ROCK)) {

                        game.setGameStatus(GameCondition.LOSE);

                    } else if (game.getOpponentMove().equals(GameMove.PAPER)) {

                        game.setGameStatus(GameCondition.WIN);

                    } else if (game.getOpponentMove().equals(GameMove.SCISSORS)) {

                        game.setGameStatus(GameCondition.DRAW);

                    }
                }
                gameRepository.save(game);
            }

        }

        // Denna la jag bara till för att player 1 och player 2 skulle få sina respektive conditions redan i denna retur.

        if (game.playerTwo.getUserId().equals(token)) {
            GameEntity assign = gameRepository.findById(gameStatus).get();
           if (game.getGameStatus().equals(GameCondition.WIN)){
               assign.setGameStatus(GameCondition.LOSE);
               return Optional.of(assign);
           }
           else if (game.getGameStatus().equals(GameCondition.LOSE)){
                assign.setGameStatus(GameCondition.WIN);
                return Optional.of(assign);
            }
        }
        return Optional.of(game);
    }
}
