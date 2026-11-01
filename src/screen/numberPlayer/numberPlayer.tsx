import { StyleSheet, Text, View } from "react-native";
import { TEST_IDS } from "@/constants/testIds";
import { Button } from "@expo/ui";

import { useNumberPlayerScreen } from "@/hooks/useNumberPlayerScreen";

export default function numberPlayer() {
  const {
    buttonClicked,
    handleBack,
    handlePlayerCountSelect,
    handleStartGame,
    handleStartingLifeChange,
    startingLife,
  } = useNumberPlayerScreen();

  return (
    <View style={styles.view}>
      <View style={styles.panel}>
        <Text style={styles.title} testID={TEST_IDS.NUMBER_PLAYER_TITLE}>
          Choose Number of Players
        </Text>

        <View style={styles.buttonStack}>
          <Button
            testID={TEST_IDS.NUMBER_PLAYER_BUTTON_2}
            label={"2 Players"}
            onPress={() => handlePlayerCountSelect(2)}
            style={buttonClicked[2] ? styles.buttonClicked : styles.button}
          ></Button>
          <Button
            testID={TEST_IDS.NUMBER_PLAYER_BUTTON_3}
            label={"3 Players"}
            onPress={() => handlePlayerCountSelect(3)}
            style={buttonClicked[3] ? styles.buttonClicked : styles.button}
          ></Button>
          <Button
            testID={TEST_IDS.NUMBER_PLAYER_BUTTON_4}
            label={"4 Players"}
            onPress={() => handlePlayerCountSelect(4)}
            style={buttonClicked[4] ? styles.buttonClicked : styles.button}
          ></Button>
        </View>

        <View style={styles.startingLifeCard}>
          <Text style={styles.startingLifeLabel}>Starting life</Text>
          <View style={styles.startingLifeRow}>
            <Button
              label="-"
              onPress={() => handleStartingLifeChange(-1)}
              style={styles.lifeButton}
            />
            <Text style={styles.startingLifeValue}>{startingLife}</Text>
            <Button
              label="+"
              onPress={() => handleStartingLifeChange(1)}
              style={styles.lifeButton}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            testID={TEST_IDS.NUMBER_PLAYER_BACK_BUTTON}
            label={"Back"}
            onPress={handleBack}
            style={styles.secondaryButton}
          ></Button>
          <Button
            testID={TEST_IDS.NUMBER_PLAYER_START_BUTTON}
            label={"Start"}
            onPress={handleStartGame}
            style={styles.primaryButton}
          ></Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#eef4ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  panel: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 24,
    shadowColor: "#1e2a4a",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 22,
    elevation: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginBottom: 22,
  },
  buttonStack: {
    gap: 12,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 54,
    alignSelf: "center",
    borderColor: "#c7d2fe",
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "#f8faff",
  },
  buttonClicked: {
    backgroundColor: "#dbeafe",
    width: "100%",
    height: 54,
    alignSelf: "center",
    borderColor: "#60a5fa",
    borderRadius: 16,
    borderWidth: 1.5,
  },
  startingLifeCard: {
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 18,
    padding: 16,
    backgroundColor: "#f9fafb",
    marginBottom: 22,
  },
  startingLifeLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 10,
  },
  startingLifeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  startingLifeValue: {
    fontSize: 34,
    fontWeight: "800",
    color: "#111827",
    minWidth: 70,
    textAlign: "center",
  },
  lifeButton: {
    width: 46,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
  },
  primaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2563eb",
    backgroundColor: "#2563eb",
  },
});
