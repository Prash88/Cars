import React from "react"
import { connect } from "react-redux"
import { FlatList, View, StyleSheet, Alert } from "react-native"
import Car from "../components/Car"
import { ACTIONS as CAR_ACTIONS } from "../actions/CarsActions"
import SearchPicker from "../components/SearchPicker"
import { SORT_OPTIONS } from "../constants"
import { Spinner } from "native-base"
import i18n from "../config/i18n"

class CarsScreen extends React.Component {
  static navigationOptions = {
    title: i18n.t("cars")
  }

  _onSelect = (key, value) => {
    const newCriteria = { ...this.props.criteria, [key]: value }
    this.props.searchCars(newCriteria)
  }

  _renderItem = ({ item }) => {
    return <Car data={item} />
  }

  _keyExtractor = car => car.id.toString()

  _fetchMoreCars = () => {
    if (this.props.cars.length >= 10) {
      this.props.getMoreCars()
    }
  }

  _toSearchScreen = () => {
    this.props.navigation.navigate("SearchScreen")
  }

  render() {
    if (this.carsError) {
      Alert.alert(i18n.t("error"), i18n.t("tryAgainMessage"), [
        { text: i18n.t("tryAgain"), onPress: this._toSearchScreen }
      ])
    } else if (this.props.cars.length === 0) {
      Alert.alert("Oops", i18n.t("noMatchingResults"), [
        { text: i18n.t("tryAgain"), onPress: this._toSearchScreen }
      ])
    }
    return (
      <React.Fragment>
        <SearchPicker
          keyName="sortBy"
          title={i18n.t("sortBy")}
          values={SORT_OPTIONS}
          onSelect={this._onSelect}
          enabled={!this.props.isLoadingCars}
        />
        {this.props.isLoadingCars ? (
          <View style={styles.spinner}>
            <Spinner />
          </View>
        ) : (
          <FlatList
            data={this.props.cars}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            initialNumToRender={3}
            onEndReached={this._fetchMoreCars}
            onEndReachedThreshold={5}
          />
        )}
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: "center"
  }
})

const mapStateToProps = state => ({
  cars: state.Cars.cars,
  isLoadingCars: state.Cars.isLoadingCars,
  carsError: state.Cars.carsError,
  criteria: state.Cars.criteria
})

const mapDispatchToProps = {
  ...CAR_ACTIONS
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarsScreen)
