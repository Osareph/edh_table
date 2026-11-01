import { StyleSheet, View, Text } from "react-native";
import { Button } from "@expo/ui";
import { TEST_IDS } from "@/constants/testIds";
import { router } from "expo-router";

export default function home() {
  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.kicker}>Commander tracker</Text>
        <Text style={styles.title} testID={TEST_IDS.HOME_TITLE}>
          EDH Table
        </Text>
        <Text style={styles.subtitle}>
          Track life, damage, poison, and the table in one place.
        </Text>

        <Button
          testID={TEST_IDS.HOME_BUTTON_START_GAME}
          label={"Start Game"}
          onPress={() => {
            router.push("/screen/numberPlayer");
          }}
          style={styles.primaryButton}
        />

        <Button
          testID={TEST_IDS.HOME_BUTTON_SETTINGS}
          label={"Settings"}
          onPress={() => {
            console.log("Settings button pressed");
          }}
          style={styles.secondaryButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf6ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  panel: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#1d4ed8",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.12,
    shadowRadius: 22,
    elevation: 8,
  },
  kicker: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#2563eb",
    marginBottom: 8,
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  primaryButton: {
    width: "100%",
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2563eb",
    backgroundColor: "#2563eb",
    marginBottom: 12,
  },
  secondaryButton: {
    width: "100%",
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#f8fafc",
  },
});
