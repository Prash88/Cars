import React from "react"
import { Image, Alert, StyleSheet } from "react-native"
import { Card, CardItem, Body, Text, Left, Right, Button } from "native-base"
import i18n from "../config/i18n"
import { AVAILABILITY } from "../constants"
import IconPalatte from "./IconPalatte"

const Car = ({ data }) => 
  <Card>
    <CardItem cardBody>
      <Body>
        <Image
          source={data.img} 
          defaultSource={require("../../assets/default.jpg")} 
          style={styles.img} />
      </Body>
    </CardItem>
    <CardItem>
      <Left>
        <Text>{data.name}</Text>
      </Left>
      <Right>
        <Text>{data.id}</Text>
      </Right>
    </CardItem>
    <CardItem>
      <Left>
        <Text>
          {i18n.t("make")}: {data.make}
        </Text>
      </Left>
      <Right>
        <Text>{i18n.t(data.availability)}</Text>
      </Right>
    </CardItem>
    <CardItem>
      <Left>
        <Text>
          {i18n.t("model")}: {data.model}
        </Text>
      </Left>
      <Right>
        {data.availability === AVAILABILITY.IN_DEALERSHIP && (
          <Button block danger onPress={_buyButtonOnPress}>
            <Text>{i18n.t("buy")}</Text>
          </Button>
        )}
      </Right>
    </CardItem>
    <CardItem>
      <IconPalatte id={data.id} no={data.stars > 0 ? data.stars : 0} />
    </CardItem>
  </Card>;


const _buyButtonOnPress = () => 
  Alert.alert(i18n.t("buy"), i18n.t("contactDealer"), [{ text: i18n.t("okay") }]);

const styles = StyleSheet.create({
  img: { 
    height: 300, 
    width: "100%", 
    flex: 1,
    resizeMode: 'contain' 
  }
})

export default Car;