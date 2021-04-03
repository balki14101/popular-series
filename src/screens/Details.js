import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import ViewMoreText from 'react-native-view-more-text';

const BASE_IMAGE_URL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const BACKDROP_URL = 'https://www.themoviedb.org/t/p/original';

const EpisodeItem = props => {
  console.log(props);
  const episode = props.epi;
  // const number = props.episode_number
  return (
    <View style={{}}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: BASE_IMAGE_URL + episode.still_path}}
          resizeMode="contain"
          style={{
            width: 100,
            height: 50,
            marginBottom: 5,
            marginLeft: 5,
            borderRadius: 5,
          }}
        />
        <View style={{marginLeft: 10, justifyContent: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>
              {episode.episode_number}
            </Text>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>.</Text>

            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>
              {episode.name}
            </Text>
          </View>

          <Text style={{color: '#fff'}}>{episode.air_date}</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Feather name="download" size={30} color="#fff" />
        </View>
      </View>
      <Text style={{color: '#fff', marginLeft: 5}}>{episode.overview}</Text>
    </View>
  );
};

class Details extends React.Component {
  state = {
    seriesData: null,
    episodeData: null,
    castData: null,
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
      fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/season/1?api_key=628f811dd14b86f8fea17c431c364235&language=en-US`,
      )
        .then(response => response.json())
        .then(json => {
          console.log({RESPONSE: json});
          //yeah.....antha params what doing there
          // adding default params
          // so if nothing is passed it params to this screen, then the default params will be passed ... like this
          this.setState({episodeData: json});
        });
      fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/aggregate_credits?api_key=628f811dd14b86f8fea17c431c364235&language=en-US`,
      )
        .then(response => response.json())
        .then(json => {
          console.log({RESPONSE: json});
          //yeah.....antha params what doing there
          // adding default params
          // so if nothing is passed it params to this screen, then the default params will be passed ... like this
          this.setState({castData: json});
        });
    }
  };

  renderEpisode = (item, index) => {
    return <EpisodeItem epi={item} abc={false} xyz={'sjslf'} />;
  };

  renderViewMore = press => {
    return (
      <Text style={{color: '#fff'}} onPress={press}>
        more
      </Text>
    );
  };
  renderViewless = press => {
    return (
      <Text style={{color: '#fff'}} onPress={press}>
        less
      </Text>
    );
  };

  render() {
    console.log(':this is from render()', this.state);
    const seriesData = this.state.seriesData;
    const episodeData = this.state.episodeData;
    const castData = this.state.castData;
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
    const overview = seriesData ? seriesData.overview : '...';
    // const episodeName = episodeData ? `${episodeData.episodes.name}` : '...';

    if (seriesData == null || episodeData == null || castData == null) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <Image source={{uri: backdrop}} style={styles.backdrop} />
          <View style={styles.netflixlogoview}>
            <Fontisto name="netflix" size={20} color="#E50914"></Fontisto>
            <Text style={styles.seriestext}>SERIES</Text>
          </View>
          <Text style={styles.titletext}>{title}</Text>
          <View style={styles.ratingView}>
            <Text style={styles.ratingText}>{rating * 10}% Match</Text>
            <Text style={{marginLeft: 10, color: '#fff'}}>{year}</Text>
            <Text
              style={{
                marginLeft: 10,
                color: '#fff',
                backgroundColor: '#808080',
                paddingLeft: 3,
                paddingRight: 3,
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              18+
            </Text>
            <Text style={{marginLeft: 10, color: '#fff'}}>Season</Text>
            <Text style={{marginLeft: 10, backgroundColor: '#808080'}}>HD</Text>
          </View>
          <View style={styles.playDownloadView}>
            <TouchableOpacity style={styles.playButton}>
              <View style={{flexDirection: 'row'}}>
                <Fontisto name="play" size={17} />
                <Text style={{fontWeight: 'bold', marginLeft: 8}}>Play</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadButton}>
              <View style={{flexDirection: 'row'}}>
                <Feather name="download" size={17} />

                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    marginLeft: 5,
                  }}>
                  Download
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{padding: 5}}>
            <Text style={{color: 'white'}}>{overview}</Text>
            {/* <Text style={{color:'#fff'}}>{episodeName}</Text> */}
          </View>
          <View style={{marginLeft: 5}}>
            <ViewMoreText
              numberOfLines={1}
              renderViewMore={this.renderViewMore}
              renderViewless={this.renderViewless}>
              <Text style={{color: '#fff', fontSize: 12}}>Starring:</Text>
              <Text style={{color: '#fff', fontSize: 10}}>
                {castData.cast.map(item => item.name).join(',')}
              </Text>
            </ViewMoreText>
          </View>
          <View style={{marginLeft: 5, flexDirection: 'row'}}>
            <Text style={{color: '#fff', fontSize: 12}}>Creater:</Text>
            <Text style={{color: '#fff', fontSize: 10, marginTop: 2}}>
              {seriesData.created_by.map(item => item.name)}
            </Text>
          </View>
          <View>{episodeData.episodes.map(this.renderEpisode)}</View>
        </ScrollView>
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
    color: '#fff',
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
  netflixlogoview: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
  },
  seriestext: {
    color: '#E50914',
    marginLeft: 5,
    fontSize: 12,
  },
  titletext: {
    color: '#fff',
    marginTop: 5,
    marginLeft: 5,
    fontSize: 30,
    fontWeight: 'bold',
  },
  ratingView: {
    flexDirection: 'row',
    padding: 10,
  },
  ratingText: {
    color: 'lightgreen',
    fontWeight: 'bold',
    fontSize: 14,
  },
  playDownloadView: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  playButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 8,
    borderRadius: 3,
  },
  downloadButton: {
    backgroundColor: '#808080',
    marginTop: 4,
    alignItems: 'center',
    padding: 8,
    borderRadius: 3,
  },
  marginLeft: {
    marginLeft: 5,
  },
});
export default Details;
