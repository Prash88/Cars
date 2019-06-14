import React from "react"
import { connect } from "react-redux"
import { Button, Container, Content, Form, Text, Toast } from "native-base"
import { MAKE, YEAR, MODEL } from "../constants"
import SearchPicker from "../components/SearchPicker"
import { ACTIONS as CAR_ACTIONS } from "../actions/CarsActions"
import i18n from "../config/i18n"
import { StyleSheet } from "react-native"

class SearchScreen extends React.Component {
  INITIAL_STATE = {
    make: "",
    model: "",
    year: null,
    name: ""
  }

  constructor(props) {
    super(props)
    this.state = this.INITIAL_STATE
  }

  static navigationOptions = {
    title: i18n.t("fancyCars")
  }

  onSelect = (key, value) => {
    // reset model when selecting a new make
    if (key === "make" && this.state.make !== value) {
      this.setState({ [key]: value, model: "" })
    } else {
      this.setState({ [key]: value })
    }
  }

  handleSearchOnPress = () => {
    if (!this.state.make) {
      return Toast.show({
        text: i18n.t("selectMakdeAndModel"),
        buttonText: i18n.t("okay")
      })
    }
    const criteria = {
      make: this.state.make,
      model: this.state.model,
      year: this.state.year
    }
    this.props.searchCars(criteria)
    this.props.navigation.navigate("CarsScreen")
  }

  handleShowAllPress = () => {
    this.props.searchCars({})
    this.props.navigation.navigate("CarsScreen")
  }

  render() {
    return (
      <Container>
        <Content>
          <SearchPicker
            keyName="make"
            title={i18n.t("make")}
            values={MAKE}
            onSelect={this.onSelect}
          />
          <SearchPicker
            keyName="model"
            title={i18n.t("model")}
            values={MODEL[this.state.make]}
            enabled={!!this.state.make}
            onSelect={this.onSelect}
            reset={!this.state.model}
          />
          <SearchPicker
            keyName="year"
            title={i18n.t("year")}
            values={YEAR}
            onSelect={this.onSelect}
          />
          <Button 
            block 
            style={styles.button} 
            onPress={this.handleSearchOnPress}>
            <Text>{i18n.t("search")}</Text>
          </Button>
          <Button 
            block 
            light
            style={styles.button}  
            onPress={this.handleShowAllPress}>
            <Text>{i18n.t("showAll")}</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  ...CAR_ACTIONS
}

const styles = StyleSheet.create({
  button: {
    margin: 10
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen)
