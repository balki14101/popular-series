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
          <MaterialIcons name="star" size={14} color="white" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  seriesitem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginTop: 8,
  },
  poster: {
    height: 100,
    width: 70,
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  rating: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
  },
  bgi: {
    // flex: 1,
    alignItems: 'stretch',
    height: 80,
  },
});

export default ListScreen;
