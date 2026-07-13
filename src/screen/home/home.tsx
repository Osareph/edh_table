import { StyleSheet, View } from "react-native";
import { Button } from "@expo/ui";
import { TEST_IDS } from "@/constants/testIds";

let content;
export default function home() {
  content = (
    <View style={styles.view}>
      <Button
        testID={TEST_IDS.HOME_BUTTON}
        label={"Done"}
        onPress={() => {
          console.log("press button");
        }}
      ></Button>
    </View>
  );

  return content;
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    alignContent: "flex-end",
    justifyContent: "center",
  },
});
