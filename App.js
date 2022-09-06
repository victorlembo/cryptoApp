import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ActivityIndicator,
  TextInput,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import themes from "./themes";
import React, { useState, useEffect } from "react";
import { getPrice, getGraphicPrice } from "./services/cryptoService";
import CryptoItem from "./components/CryptoItem";
import PureChart from "react-native-pure-chart";

const App = () => {
  const [crypto, setCrypto] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [visibleModal, setVisibleModal] = useState(false);

  const [selectedCrypto, setSelectedCrypto] = useState({});

  const [graphicData, setGraphicData] = useState([]);

  const loadingPrices = async () => {
    setLoading(true);
    const dataPrice = await getPrice();
    setCrypto(dataPrice);
    setLoading(false);
  };

  useEffect(() => {
    loadingPrices();
  }, []);

  const handleModal = async (coin) => {
    const apiData = await getGraphicPrice(coin.item.id);
    setGraphicData(apiData);
    setSelectedCrypto(coin.item);
    setVisibleModal(true);
  };

  const nothingFound = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ color: themes.colors.neutral.foreground }}>
          No search results found.
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={themes.colors.brand.azul} />
      <View style={styles.header}>
        <Image source={require("./img/logo.png")} style={styles.logo} />
        <Text style={styles.title}>CryptoVIEW</Text>
      </View>
      {loading && (
        <ActivityIndicator
          size="large"
          color={themes.colors.utility.contrast}
        />
      )}
      <TextInput
        placeholder="Filter..."
        autoFocus
        placeholderTextColor={themes.colors.neutral.foreground}
        onChangeText={(text) => setSearch(text)}
        style={styles.searchInput}
      />
      <FlatList
        style={styles.list}
        data={crypto.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLocaleLowerCase())
        )}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => (
          <CryptoItem coin={item} onPress={() => handleModal({ item })} />
        )}
        ListEmptyComponent={nothingFound()}
      />
      <Modal animationType="slide" transparent={true} visible={visibleModal}>
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <Image source={{ uri: selectedCrypto.image }} style={styles.logo} />
            <Text>Last 15 days {selectedCrypto.name} graphic</Text>
            <PureChart style={styles.pureChart} data={graphicData} type="line"/>
            <Pressable
              style={styles.buttonCloseModal}
              onPress={() => setVisibleModal(!visibleModal)}
            >
              <Text>X Close </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: themes.colors.brand.laranja,
    marginTop: 8,
    width: "70%",
  },
  container: {
    backgroundColor: themes.colors.neutral.background,
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    marginBottom: 8,
    justifyContent: "space-between",
  },
  logo: {
    width: 80,
    height: 53,
    resizeMode: "contain",
    marginTop: 8,
  },
  searchInput: {
    marginTop: 36,
    marginBottom: 20,
    height: 50,
    width: 200,
    color: themes.colors.neutral.foreground,
    backgroundColor: themes.colors.neutral.neutral100,
    borderBottomColor: themes.colors.utility.contrast,
    paddingRight: 16,
    paddingLeft: 16,
    borderBottomWidth: 2,
    textAlign: "left",
    borderRadius: 16,
  },
  list: {
    width: "90%",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  modalView: {
    margin: 8,
    backgroundColor: themes.colors.neutral.neutral100,
    borderRadius: 24,
    padding: 8,
    width: "90%",
    alignItems: "center",
  },
  buttonCloseModal: {
    marginTop: 16,
    marginRight: 16,
    borderRadius: 16,
    padding: 16,
    backgroundColor: themes.colors.utility.contrast,
  },
  pureChart: {
    width: "20%",
    height: 200,
  },
});

export default App;
