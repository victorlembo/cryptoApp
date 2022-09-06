import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import themes from "../themes";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";

const CryptoItem = ({ coin, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.containerItem}>
      <View style={styles.description}>
        <View style={styles.viewImage}>
          <Image source={{ uri: coin.image }} style={styles.image} />
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.name}>{coin.name}</Text>
          <Text style={styles.symbol}>{coin.symbol}</Text>
          <Text style={styles.lastUpdate}>
            {moment(coin.last_updated).fromNow()}
          </Text>
        </View>
      </View>

      <View style={styles.info}>
        <View>
          <Text style={styles.price}>$ {coin.current_price.toFixed(2)}</Text>
          <Text
            style={[
              styles.change,
              coin.price_change_percentage_24h > 0
                ? styles.priceUp
                : styles.priceDown,
            ]}
          >
            {coin.price_change_percentage_24h.toFixed(2)} %
            {coin.price_change_percentage_24h > 0 ? (
              <MaterialIcons
                name="arrow-circle-up"
                size={16}
                color={themes.colors.utility.success}
              />
            ) : (
              <MaterialIcons
                name="arrow-circle-down"
                size={16}
                color={themes.colors.utility.danger}
              />
            )}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: themes.colors.neutral.foreground,
    paddingBottom: 8,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 16,
    marginTop: 16,
  },
  viewImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    margin: 8,
    width: 48,
    height: 48,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    color: themes.colors.neutral.neutral100,
  },
  symbol: {
    fontSize: 14,
    color: themes.colors.utility.contrast,
    textTransform: "uppercase",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: themes.colors.brand.azul,
  },
  change: {
    textAlign: "right",
    fontSize: 12,
    color: themes.colors.utility,
  },
  lastUpdate: {
    fontSize: 11,
    color: themes.colors.utility.info,
    textTransform: "lowercase",
  },
  description: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  info: {
    padding: 16,
    justifyContent: "center",
    alignContent: "center",
  },
  priceUp: {
    color: themes.colors.utility.success,
  },
  priceDown: {
    color: themes.colors.utility.danger,
  },
});

export default CryptoItem;
