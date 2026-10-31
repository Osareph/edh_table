import { Alert, StyleSheet, Text, View } from "react-native";
import { TEST_IDS } from "@/constants/testIds";
import { Button } from "@expo/ui";
import { router } from "expo-router";
import { useEdhTable } from "@/hooks/useEdhTable";

export default function numberPlayer() {
  const {
    numberOfPlayers,
    resetAll,
    setNumberOfPlayers,
    buttonClicked,
    setButtonClicked,
  } = useEdhTable();

  const handlePlayerCountSelect = (value: 2 | 3 | 4) => {
    setNumberOfPlayers(value);
    setButtonClicked(value, true);
  };

  const handleStartGame = () => {
    if (numberOfPlayers === 2 || numberOfPlayers === 3 || numberOfPlayers === 4) {
      router.navigate("/screen/edhTable");
      return;
    }

    Alert.alert("Choose players", "Please select how many players are in the game before starting.");
  };

  const handleBack = () => {
    resetAll();
    router.navigate("/screen/home");
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title} testID={TEST_IDS.NUMBER_PLAYER_TITLE}>
        Choose Number of Players
      </Text>
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
      <View style={styles.footer}>
        <Button
          testID={TEST_IDS.NUMBER_PLAYER_BACK_BUTTON}
          label={"Back"}
          onPress={handleBack}
          style={styles.button}
        ></Button>
        <Button
          testID={TEST_IDS.NUMBER_PLAYER_START_BUTTON}
          label={"Start"}
          onPress={handleStartGame}
          style={styles.button}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  button: {
    width: 200,
    height: 50,
    alignSelf: "center",
    borderColor: "black",
    borderRadius: 999,
    borderWidth: 1,
  },
  buttonClicked: {
    backgroundColor: "#d3d3d3",
    width: 200,
    height: 50,
    alignSelf: "center",
    borderColor: "black",
    borderRadius: 999,
    borderWidth: 1,
  },
  footer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 16,
    gap: 5,
  },
});