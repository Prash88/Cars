import React from "react"
import { Card, CardItem, Body, Text, Left, Right, Button, Icon } from "native-base"
import { View } from "react-native"
import { ACTIONS as CAR_ACTIONS } from "../actions/CarsActions"
import { connect } from "react-redux"

const IconPalatte = ({ id, no, addStars }) => {
  let stars = []
  for (let i = 0; i <= no; i++) {
    stars.push(<Icon key={i} onPress={() => addStars(id, i)} name={"md-star"}></Icon>)
  }
  for (let i = no + 1; i < 5; i++) {
    stars.push(<Icon key={i} onPress={() => addStars(id, i)} name={"md-star-outline"}></Icon>)
  }
  return (
    <CardItem>
      {stars}
    </CardItem>
  )
} 

const mapDispatchToProps = dispatch => {
  return { 
    addStars: (id, stars) => dispatch(CAR_ACTIONS.addStars(id, stars)),
  }
};

const mapStateToProps = state => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IconPalatte);
