import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';

import styles from './Styles';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BASE_IMAGE_URL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';

const SeriesItem = ({data, onSeriesPress}) => {
  const poster = BASE_IMAGE_URL + data.poster_path;
  return (
    <TouchableOpacity
      onPress={() => {
        onSeriesPress(data.id);
      }}
      style={styles.seriesitem}>
      <Image source={{uri: poster}} resizeMode="cover" style={styles.poster} />
      <View>
        <Text style={styles.title}>{data.name} </Text>
        <View style={{flexDirection: 'row', marginLeft: 5}}>
          <MaterialIcons name="star" size={14} color="gold" />
          <Text style={styles.rating}>{data.vote_average}</Text>
        </View>
        <Text></Text>
      </View>
    </TouchableOpacity>
  );
};

class ListScreen extends React.Component {
  state = {
    popularList: [],
  };

  componentDidMount = () => {
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=628f811dd14b86f8fea17c431c364235&language=en-US&page=1`,
    )
      .then(response => response.json())
      .then(json => {
        console.log({RESPONSE: json});
        this.setState({popularList: json.results});
      });
  };
  gotoDetailsScreen = seriesId => {
    this.props.navigation.navigate('Detail', {seriesId});
    // this.props.navigation.navigate('Picker', {seriesId});
  };
  renderSeriesItem = ({item}) => {
    return <SeriesItem data={item} onSeriesPress={this.gotoDetailsScreen} />;
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.popularList}
          renderItem={this.renderSeriesItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export default ListScreen;
