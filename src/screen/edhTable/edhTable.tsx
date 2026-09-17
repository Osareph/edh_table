import { View, Text, StyleSheet, Pressable } from "react-native";
import { useEdhTable } from "@/hooks/useEdhTable";
import { Button } from "@expo/ui";
import { useMemo, useState } from "react";
import { router } from "expo-router";

export default function edhTable() {
  const { numberOfPlayers } = useEdhTable();
  const [playerLives, setPlayerLives] = useState<Record<number, number>>({
    1: 40,
    2: 40,
    3: 40,
    4: 40,
  });

  const playerCount = useMemo(() => {
    if (
      numberOfPlayers === 2 ||
      numberOfPlayers === 3 ||
      numberOfPlayers === 4
    ) {
      return numberOfPlayers;
    }
    return 2;
  }, [numberOfPlayers]);

  const adjustLife = (player: number, delta: number) => {
    setPlayerLives((prev) => ({
      ...prev,
      [player]: Math.max(0, (prev[player] ?? 40) + delta),
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Life Total</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.navigate("/screen/home")}
          style={styles.closeButton}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </Pressable>
      </View>

      <View style={styles.grid}>
        {Array.from({ length: playerCount }, (_, index) => {
          const playerNumber = index + 1;
          const life = playerLives[playerNumber] ?? 40;

          return (
            <View key={playerNumber} style={styles.playerCard}>
              <Text style={styles.playerLabel}>Player {playerNumber}</Text>
              <Text style={styles.life}>{life}</Text>

              <View style={styles.controls}>
                <Button
                  label="-"
                  onPress={() => adjustLife(playerNumber, -1)}
                  style={styles.button}
                />
                <Button
                  label="+"
                  onPress={() => adjustLife(playerNumber, 1)}
                  style={styles.button}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  playerCard: {
    width: "45%",
    minWidth: 140,
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
  life: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#111",
  },
  controls: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    minWidth: 60,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#111",
  },
});
