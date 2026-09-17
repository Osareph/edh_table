import { StyleSheet, View, Text } from "react-native";
import { Button } from "@expo/ui";
import { TEST_IDS } from "@/constants/testIds";
import { router } from "expo-router";

export default function home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title} testID={TEST_IDS.HOME_TITLE}>
        EDH Table
      </Text>

      <Button
        testID={TEST_IDS.HOME_BUTTON_START_GAME}
        label={"START GAME"}
        onPress={() => {
          router.push("/screen/numberPlayer");
        }}
        style={styles.button}
      />

      <Button
        testID={TEST_IDS.HOME_BUTTON_SETTINGS}
        label={"SETTINGS"}
        onPress={() => {
          console.log("Settings button pressed");
        }}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    width: 220,
    height: 48,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
    borderRadius: 999,
    borderWidth: 1,
  },
});
