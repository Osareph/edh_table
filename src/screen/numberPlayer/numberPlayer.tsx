import { StyleSheet, Text, View } from "react-native";
import { TEST_IDS } from "@/constants/testIds";
import { Button } from "@expo/ui";
import { router } from "expo-router";
import { useEdhTable } from "@/hooks/useEdhTable";

let content;
export default function numberPlayer() {
  const { setNumberOfPlayers, buttonClicked, setButtonClicked } = useEdhTable();
  content = (
    <View style={styles.view}>
      <Text style={styles.title} testID={TEST_IDS.NUMBER_PLAYER_TITLE}>
        Choose Number of Players
      </Text>
      <Button
        testID={TEST_IDS.NUMBER_PLAYER_BUTTON_2}
        label={"2 Players"}
        onPress={() => {
          if (setNumberOfPlayers) {
            setNumberOfPlayers(2);
            setButtonClicked(2, !buttonClicked[2]);
          }
        }}
        style={buttonClicked[2] ? styles.buttonClicked : styles.button}
      ></Button>
      <Button
        testID={TEST_IDS.NUMBER_PLAYER_BUTTON_3}
        label={"3 Players"}
        onPress={() => {
          if (setNumberOfPlayers) {
            setNumberOfPlayers(3);
            setButtonClicked(3, !buttonClicked[3]);
          }
        }}
        style={buttonClicked[3] ? styles.buttonClicked : styles.button}
      ></Button>
      <Button
        testID={TEST_IDS.NUMBER_PLAYER_BUTTON_4}
        label={"4 Players"}
        onPress={() => {
          if (setNumberOfPlayers) {
            setNumberOfPlayers(4);
            setButtonClicked(4, !buttonClicked[4]);
          }
        }}
        style={buttonClicked[4] ? styles.buttonClicked : styles.button}
      ></Button>
      <View style={styles.footer}>
        <Button
          testID={TEST_IDS.NUMBER_PLAYER_BACK_BUTTON}
          label={"Back"}
          onPress={() => {
            router.navigate("/screen/home");
          }}
          style={styles.button}
        ></Button>
        <Button
          testID={TEST_IDS.NUMBER_PLAYER_START_BUTTON}
          label={"Start"}
          onPress={() => {
            router.navigate("/screen/edhTable");
          }}
          style={styles.button}
        ></Button>
      </View>
    </View>
  );
  return content;
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
