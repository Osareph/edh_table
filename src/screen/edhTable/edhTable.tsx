import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { Button } from "@expo/ui";
import { useEffect, useRef } from "react";

import { useEdhTableScreen } from "@/hooks/useEdhTableScreen";
import { getPlayer } from "@/domain/edhTable";

export default function edhTable() {
  const {
    goHome,
    handleAdjustCommanderDamage,
    handleAdjustLife,
    handleIncrementCounter,
    handleResetCounter,
    handleResetGame,
    handleResetRound,
    playerCount,
    players,
    randomizeStartingPlayer,
    startingPlayer,
  } = useEdhTableScreen();

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (startingPlayer === null) {
      pulseAnim.setValue(1);
      return;
    }

    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.2,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 180,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [pulseAnim, startingPlayer]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>EDH Table</Text>
        <Pressable
          accessibilityRole="button"
          onPress={goHome}
          style={styles.closeButton}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </Pressable>
      </View>

      <View style={styles.toolsRow}>
        <View style={styles.toolGroup}>
          <Text style={styles.toolLabel}>Start player</Text>
          <Button
            label={
              startingPlayer !== null
                ? `Player ${startingPlayer}`
                : "Choose random player"
            }
            onPress={randomizeStartingPlayer}
            style={styles.toolButton}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {Array.from({ length: playerCount }, (_, index) => {
            const playerNumber = index + 1;
            const player = getPlayer(players, playerNumber);
            const isStartingPlayer = playerNumber === startingPlayer;

            return (
              <Animated.View
                key={playerNumber}
                style={[
                  styles.playerCard,
                  isStartingPlayer && styles.winnerCard,
                  isStartingPlayer && { transform: [{ scale: pulseAnim }] },
                ]}
              >
                <View style={styles.playerHeader}>
                  <Text style={styles.playerLabel}>Player {playerNumber}</Text>
                  {isStartingPlayer ? (
                    <View style={styles.startBadge}>
                      <Text style={styles.startBadgeText}>START</Text>
                    </View>
                  ) : null}
                </View>

                <View style={styles.lifePanel}>
                  <Text style={styles.lifeLabel}>Life</Text>
                  <View style={styles.lifeRow}>
                    <Button
                      label="-"
                      onPress={() => handleAdjustLife(playerNumber, -1)}
                      style={styles.lifeButton}
                    />
                    <View style={styles.lifeValuePill}>
                      <Text style={styles.lifeValue}>{player.life}</Text>
                    </View>
                    <Button
                      label="+"
                      onPress={() => handleAdjustLife(playerNumber, 1)}
                      style={styles.lifeButton}
                    />
                  </View>
                </View>

                <View style={styles.statRow}>
                  <Text style={styles.metaLabel}>Poison</Text>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() =>
                      handleIncrementCounter(playerNumber, "poison")
                    }
                    onLongPress={() =>
                      handleResetCounter(playerNumber, "poison")
                    }
                    style={styles.singleCounterButton}
                  >
                    <Text style={styles.singleCounterText}>
                      {player.poison}
                    </Text>
                  </Pressable>
                </View>

                <View style={styles.statRow}>
                  <Text style={styles.metaLabel}>Experience</Text>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() =>
                      handleIncrementCounter(playerNumber, "experience")
                    }
                    onLongPress={() =>
                      handleResetCounter(playerNumber, "experience")
                    }
                    style={styles.singleCounterButton}
                  >
                    <Text style={styles.singleCounterText}>
                      {player.experience}
                    </Text>
                  </Pressable>
                </View>

                <View style={styles.commanderSection}>
                  <Text style={styles.metaLabel}>Commander damage</Text>
                  {Array.from({ length: playerCount }, (_, index2) => {
                    const attackerNumber = index2 + 1;
                    const totalDamage =
                      player.commanderDamage[attackerNumber] ?? 0;

                    if (attackerNumber === playerNumber) {
                      return null;
                    }

                    return (
                      <View key={attackerNumber} style={styles.commanderRow}>
                        <Text style={styles.commanderText}>
                          P{attackerNumber}
                        </Text>
                        <View style={styles.counterRow}>
                          <Button
                            label="-"
                            onPress={() =>
                              handleAdjustCommanderDamage(
                                attackerNumber,
                                playerNumber,
                                -1,
                              )
                            }
                            style={styles.smallButton}
                          />
                          <Text style={styles.metaValue}>{totalDamage}</Text>
                          <Button
                            label="+"
                            onPress={() =>
                              handleAdjustCommanderDamage(
                                attackerNumber,
                                playerNumber,
                                1,
                              )
                            }
                            style={styles.smallButton}
                          />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </Animated.View>
            );
          })}
        </View>

        <View style={styles.footerActions}>
          <Button
            label="Reset round"
            onPress={handleResetRound}
            style={styles.resetButton}
          />
          <Button
            label="Reset game"
            onPress={handleResetGame}
            style={styles.resetButtonPrimary}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf6ff",
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
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    color: "#111827",
    flex: 1,
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#111827",
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
    justifyContent: "center",
    marginBottom: 20,
  },
  toolGroup: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dbeafe",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: "#93c5fd",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 3,
  },
  toolLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  toolButton: {
    minWidth: 220,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#eff6ff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 14,
  },
  playerCard: {
    width: "47%",
    minWidth: 170,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#dbeafe",
    shadowColor: "#1d4ed8",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },
  winnerCard: {
    borderColor: "#f59e0b",
    backgroundColor: "#fffaf0",
    shadowColor: "#f59e0b",
    shadowOpacity: 0.22,
    shadowRadius: 18,
  },
  playerLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },
  playerHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  startBadge: {
    backgroundColor: "#f59e0b",
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 9,
    marginLeft: 8,
  },
  startBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.8,
  },
  lifePanel: {
    width: "100%",
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 12,
    marginTop: 2,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  lifeLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 8,
    letterSpacing: 0.4,
  },
  lifeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  lifeButton: {
    minWidth: 46,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
  },
  lifeValuePill: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    minWidth: 76,
    alignItems: "center",
    justifyContent: "center",
  },
  lifeValue: {
    minWidth: 26,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  statRow: {
    width: "100%",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#edf2f7",
  },
  metaLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    textAlign: "left",
    flexShrink: 1,
  },
  metaValue: {
    minWidth: 24,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  singleCounterButton: {
    minWidth: 90,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dbeafe",
    backgroundColor: "#ffffff",
  },
  singleCounterText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  commanderSection: {
    width: "100%",
    marginTop: 8,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#edf2f7",
  },
  commanderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 8,
  },
  commanderText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  button: {
    minWidth: 44,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
  },
  smallButton: {
    minWidth: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
  },
  footerActions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 22,
  },
  resetButton: {
    minWidth: 120,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
  },
  resetButtonPrimary: {
    minWidth: 120,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2563eb",
    backgroundColor: "#2563eb",
  },
});
