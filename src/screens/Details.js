import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';

const BASE_IMAGE_URL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const BACKDROP_URL = 'https://www.themoviedb.org/t/p/original';

class Details extends React.Component {
  state = {
    seriesData: null,
  };

  componentDidMount = () => {
    // make API calls, other tasks, etc
    console.log('this is from did mount');
    const params = this.props.route?.params;
    // params can be null here
    // And it is null here, because it is the first screen and the params are not passed from any other screens

    // So have to put a null check here
    // console.log({params});

    // Error is because, in the below line it is
    if (params != null) {
      const seriesId = params.seriesId;
      fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}?api_key=628f811dd14b86f8fea17c431c364235&language=en-US`,
      )
        .then(response => response.json())
        .then(json => {
          console.log({RESPONSE: json});
          //yeah.....antha params what doing there
          // adding default params
          // so if nothing is passed it params to this screen, then the default params will be passed ... like this
          this.setState({seriesData: json});
        });
    }
  };
  render() {
    console.log(':this is from render()', this.state);
    const seriesData = this.state.seriesData;
    //const params = this.props.route?.params; // const params = this.props.route ? this.props.route.params;
    const backdrop = seriesData
      ? BACKDROP_URL + seriesData.backdrop_path
      : '-...';
    const poster = seriesData
      ? BASE_IMAGE_URL + seriesData.poster_path
      : '-...';
    const title = seriesData ? seriesData.original_name : '-.......';
    const rating = seriesData ? seriesData.vote_average : '-...';
    const year = seriesData ? seriesData.first_air_date : '...';

    return (
      <View style={styles.container}>
        <Image source={{uri: backdrop}} style={styles.backdrop} />
        <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 5}}>
          <Fontisto name="netflix" size={20} color="#E50914"></Fontisto>
          <Text
            style={{
              color: '#E50914',
              marginLeft: 5,
              fontSize: 12,
            }}>
            SERIES
          </Text>
        </View>
        <Text
          style={{
            color: '#E50914',
            marginTop: 5,
            marginLeft: 5,
            fontSize: 30,
            fontWeight: 'bold',
          }}>
          The Witcher
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'lightgreen', fontWeight: 'bold', fontSize: 14}}>
            {rating * 10}% Match
          </Text>
          <Text style={{color: 'white'}}>{year}</Text>
          {/* <Text style={{colour: 'lightgreen'}}>{rating}</Text> */}
          <Text></Text>
        </View>
        <Image source={{uri: poster}} style={styles.image}></Image>
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
  },
  text: {
    color: 'black',
  },
  image: {
    height: 300,
    width: 200,
  },
  backdrop: {
    marginTop: 15,
    alignItems: 'stretch',
    // width: 700,
    height: 180,
  },
});
export default Details;
