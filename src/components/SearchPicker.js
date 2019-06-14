import React, { Component } from "react"
import { Icon, Picker, Form } from "native-base"
import { StyleSheet } from "react-native"
import i18n from "../config/i18n"

class PickerWithIcon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  onValueChange(value) {
    // set parent's state
    this.props.onSelect(this.props.keyName, this.props.values[value])
    this.setState({
      selected: value
    })
  }

  render() {
    return (
      <Form>
        <Picker
          mode="dropdown"
          iosHeader={`${i18n.t("select")} ` + this.props.title}
          iosIcon={<Icon name="md-star" />}
          style={styles.picker}
          selectedValue={this.props.reset ? null : this.state.selected}
          onValueChange={this.onValueChange.bind(this)}
          placeholder={this.props.title}
          enabled={this.props.enabled === undefined ? true : this.props.enabled}
        >
          {this.props.values &&
            this.props.values.map((data, index) => (
              <Picker.Item label={data} value={index} key={data} />
            ))}
        </Picker>
      </Form>
    )
  }
}

const styles = StyleSheet.create({
  picker: {
    width: "100%"
  }
})

export default PickerWithIcon
