import { createStackNavigator, createAppContainer } from "react-navigation"
import CarsScreen from "../screens/CarsScreen"
import SearchScreen from "../screens/SearchScreen"
import { Platform } from "react-native"

const AppNavigator = createStackNavigator(
  {
    SearchScreen,
    CarsScreen
  },
  { headerMode: Platform.OS === "ios" ? "float" : "screen" }
)

export default createAppContainer(AppNavigator)
