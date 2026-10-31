import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useEdhTable } from "@/hooks/useEdhTable";
import { Button } from "@expo/ui";
import { useMemo, useState } from "react";
import { router } from "expo-router";
import {
  adjustCommanderDamage,
  adjustLife,
  createInitialPlayers,
  getDefaultPlayerState,
  getPlayer,
  getPlayerCount,
  incrementCounter,
  resetCounter,
  resetGame,
  resetRound,
  setStartingLife,
  STARTING_LIFE_OPTIONS,
  type PlayerState,
} from "@/domain/edhTable";

export default function edhTable() {
  const { numberOfPlayers } = useEdhTable();
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [coinSide, setCoinSide] = useState<"Heads" | "Tails" | null>(null);
  const [players, setPlayers] = useState<Record<number, PlayerState>>(createInitialPlayers());

  const playerCount = useMemo(() => getPlayerCount(numberOfPlayers), [numberOfPlayers]);
  const handleAdjustLife = (player: number, delta: number) => {
    setPlayers((prev) => adjustLife(prev, player, delta));
  };

  const handleIncrementCounter = (player: number, key: "poison" | "experience") => {
    setPlayers((prev) => incrementCounter(prev, player, key));
  };

  const handleResetCounter = (player: number, key: "poison" | "experience") => {
    setPlayers((prev) => resetCounter(prev, player, key));
  };

  const handleSetStartingLife = (player: number, value: number) => {
    setPlayers((prev) => setStartingLife(prev, player, value));
  };

  const handleAdjustCommanderDamage = (
    sourcePlayer: number,
    targetPlayer: number,
    delta: number,
  ) => {
    setPlayers((prev) => adjustCommanderDamage(prev, targetPlayer, sourcePlayer, delta));
  };

  const handleResetRound = () => {
    setPlayers((prev) => resetRound(prev, playerCount));
  };

  const handleResetGame = () => {
    setPlayers((prev) => resetGame(prev, playerCount));
    setDiceValue(null);
    setCoinSide(null);
  };

  const rollDice = () => {
    setDiceValue(Math.floor(Math.random() * 20) + 1);
  };

  const flipCoin = () => {
    setCoinSide(Math.random() > 0.5 ? "Heads" : "Tails");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>EDH Table</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.navigate("/screen/home")}
          style={styles.closeButton}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </Pressable>
      </View>

      <View style={styles.toolsRow}>
        <View style={styles.toolGroup}>
          <Text style={styles.toolLabel}>Dice</Text>
          <Button label={diceValue ? `D20: ${diceValue}` : "Roll D20"} onPress={rollDice} style={styles.toolButton} />
        </View>

        <View style={styles.toolGroup}>
          <Text style={styles.toolLabel}>Coin</Text>
          <Button label={coinSide ?? "Flip coin"} onPress={flipCoin} style={styles.toolButton} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {Array.from({ length: playerCount }, (_, index) => {
            const playerNumber = index + 1;
            const player = getPlayer(players, playerNumber);

            return (
              <View key={playerNumber} style={styles.playerCard}>
                <Text style={styles.playerLabel}>Player {playerNumber}</Text>

                <View style={styles.startingLifeBlock}>
                  <Text style={styles.metaLabel}>Starting life</Text>
                  <View style={styles.presetRow}>
                    {STARTING_LIFE_OPTIONS.map((option) => (
                      <Button
                        key={option}
                        label={String(option)}
                        onPress={() => handleSetStartingLife(playerNumber, option)}
                        style={player.startingLife === option ? styles.presetButtonActive : styles.presetButton}
                      />
                    ))}
                  </View>
                </View>

                <Text style={styles.life}>{player.life}</Text>

                <View style={styles.statRow}>
                  <Text style={styles.metaLabel}>Life</Text>
                  <View style={styles.counterRow}>
                    <Button
                      label="-"
                      onPress={() => handleAdjustLife(playerNumber, -1)}
                      style={styles.button}
                    />
                    <Text style={styles.metaValue}>{player.life}</Text>
                    <Button
                      label="+"
                      onPress={() => handleAdjustLife(playerNumber, 1)}
                      style={styles.button}
                    />
                  </View>
                </View>

                <View style={styles.statRow}>
                  <Text style={styles.metaLabel}>Poison</Text>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => handleIncrementCounter(playerNumber, "poison")}
                    onLongPress={() => handleResetCounter(playerNumber, "poison")}
                    style={styles.singleCounterButton}
                  >
                    <Text style={styles.singleCounterText}>{player.poison}</Text>
                  </Pressable>
                </View>

                <View style={styles.statRow}>
                  <Text style={styles.metaLabel}>Experience</Text>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => handleIncrementCounter(playerNumber, "experience")}
                    onLongPress={() => handleResetCounter(playerNumber, "experience")}
                    style={styles.singleCounterButton}
                  >
                    <Text style={styles.singleCounterText}>{player.experience}</Text>
                  </Pressable>
                </View>

                <View style={styles.commanderSection}>
                  <Text style={styles.metaLabel}>Commander damage</Text>
                  {Array.from({ length: playerCount }, (_, index2) => {
                    const attackerNumber = index2 + 1;
                    const totalDamage = player.commanderDamage[attackerNumber] ?? 0;

                    if (attackerNumber === playerNumber) {
                      return null;
                    }

                    return (
                      <View key={attackerNumber} style={styles.commanderRow}>
                        <Text style={styles.commanderText}>P{attackerNumber}</Text>
                        <View style={styles.counterRow}>
                          <Button
                            label="-"
                            onPress={() => handleAdjustCommanderDamage(attackerNumber, playerNumber, -1)}
                            style={styles.smallButton}
                          />
                          <Text style={styles.metaValue}>{totalDamage}</Text>
                          <Button
                            label="+"
                            onPress={() => handleAdjustCommanderDamage(attackerNumber, playerNumber, 1)}
                            style={styles.smallButton}
                          />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.footerActions}>
          <Button label="Reset round" onPress={handleResetRound} style={styles.resetButton} />
          <Button label="Reset game" onPress={handleResetGame} style={styles.resetButton} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 28,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111",
    flex: 1,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  closeIcon: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 20,
  },
  toolsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  toolGroup: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
  },
  toolLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },
  toolButton: {
    minWidth: 120,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#111",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  playerCard: {
    width: "45%",
    minWidth: 170,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  playerLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#222",
  },
  startingLifeBlock: {
    width: "100%",
    marginBottom: 8,
  },
  presetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  presetButton: {
    flex: 1,
    minWidth: 40,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#111",
  },
  presetButtonActive: {
    flex: 1,
    minWidth: 40,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#111",
    backgroundColor: "#d3d3d3",
  },
  life: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#111",
  },
  statRow: {
    width: "100%",
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  metaLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginBottom: 0,
    textAlign: "left",
    flexShrink: 1,
  },
  metaValue: {
    minWidth: 24,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  singleCounterButton: {
    minWidth: 90,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#111",
    backgroundColor: "#fff",
  },
  singleCounterText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  commanderSection: {
    width: "100%",
    marginTop: 6,
  },
  commanderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  commanderText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  button: {
    minWidth: 44,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#111",
  },
  smallButton: {
    minWidth: 32,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#111",
  },
  footerActions: {
    marginTop: 20,
    gap: 12,
    alignItems: "center",
  },
  resetButton: {
    minWidth: 180,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#111",
  },
});