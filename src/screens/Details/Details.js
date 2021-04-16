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

// import PickerComponent from './PickerComponent';
import styles from './Styles';

import {Picker} from '@react-native-picker/picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import ViewMoreText from 'react-native-view-more-text';
import {nativeViewProps} from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';

const BASE_IMAGE_URL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const BACKDROP_URL = 'https://www.themoviedb.org/t/p/original';

const EpisodeItem = props => {
  console.log(props);
  const episode = props.epi;
  // const number = props.episode_number

  return (
    <View style={{padding: 16}}>
      <View style={styles.row}>
        <Image
          source={{uri: BASE_IMAGE_URL + episode.still_path}}
          resizeMode="cover"
          style={styles.episodeImage}
        />
        <View style={styles.episodeContentView}>
          <View style={styles.row}>
            <Text style={styles.whiteAndBold}>{episode.episode_number}</Text>
            <Text style={styles.whiteAndBold}>.</Text>

            <Text style={styles.episodeName}>{episode.name}</Text>
          </View>

          <Text style={styles.white}>{episode.air_date}</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Feather name="download" size={30} color="#fff" />
        </View>
      </View>
      <View style={{}}>
        <Text numberOfLines={2} style={styles.episodeOverview}>
          {episode.overview}
        </Text>
      </View>
    </View>
  );
};

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesData: null,
      episodeData: null,
      castData: null,
      name: '',
      selectedSeasonNumber: null,
    };

    this.seriesId = props.route?.params?.seriesId;
  }

  componentDidMount = () => {
    // make API calls, other tasks, etc
    console.log('this is from did mount');
    // params can be null here
    // And it is null here, because it is the first screen and the params are not passed from any other screens

    // So have to put a null check here
    // console.log({params});

    // Error is because, in the below line it is
    if (this.seriesId != null) {
      fetch(
        `https://api.themoviedb.org/3/tv/${this.seriesId}?api_key=628f811dd14b86f8fea17c431c364235&language=en-US`,
      )
        .then(response => response.json())
        .then(json => {
          this.updateSelectedSeason(json.seasons[0].season_number);

          console.log({RESPONSE: json});
          //yeah.....antha params what doing there
          // adding default params
          // so if nothing is passed it params to this screen, then the default params will be passed ... like this
          this.setState({seriesData: json});
        });

      fetch(
        `https://api.themoviedb.org/3/tv/${this.seriesId}/aggregate_credits?api_key=628f811dd14b86f8fea17c431c364235&language=en-US`,
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
      <Text style={styles.white} onPress={press}>
        more
      </Text>
    );
  };
  renderViewless = press => {
    return (
      <Text style={styles.white} onPress={press}>
        less
      </Text>
    );
  };

  updateSelectedSeason = value => {
    this.setState({selectedSeasonNumber: value});
    fetch(
      `https://api.themoviedb.org/3/tv/${this.seriesId}/season/${value}?api_key=628f811dd14b86f8fea17c431c364235&language=en-US`,
    )
      .then(response => response.json())
      .then(json => {
        console.log({RESPONSE: json});
        //yeah.....antha params what doing there
        // adding default params
        // so if nothing is passed it params to this screen, then the default params will be passed ... like this
        this.setState({episodeData: json});
      });
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
            <Text style={styles.year}>{year}</Text>
            <Text style={styles.age}>18+</Text>
            <Text style={styles.season}>Season</Text>
            <Text style={styles.hd}>HD</Text>
          </View>

          <View style={styles.playDownloadView}>
            <TouchableOpacity style={styles.playButton}>
              <View style={styles.row}>
                <Fontisto name="play" size={17} />
                <Text style={styles.play}>Play</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadButton}>
              <View style={styles.row}>
                <Feather name="download" size={17} />

                <Text style={styles.download}>Download</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{padding: 5}}>
            <ViewMoreText
              numberOfLines={3}
              renderViewMore={this.renderViewMore}
              renderViewless={this.renderViewless}>
              <Text style={styles.white}>{overview}</Text>
            </ViewMoreText>
            {/* <Text style={{color:'#fff'}}>{episodeName}</Text> */}
          </View>
          <View style={styles.marginLeft}>
            <ViewMoreText
              numberOfLines={1}
              renderViewMore={this.renderViewMore}
              renderViewless={this.renderViewless}>
              <Text style={styles.cast}>Starring:</Text>
              <Text style={styles.castContent}>
                {castData.cast.map(item => item.name).join(',')}
              </Text>
            </ViewMoreText>
          </View>
          <View style={styles.creater}>
            <Text style={styles.cast}>Creater:</Text>
            <Text style={styles.createrContent}>
              {seriesData.created_by.map(item => item.name)}
            </Text>
          </View>

          <View style={styles.optionsView}>
            <View style={{marginLeft: 40}}>
              <TouchableOpacity>
                <MaterialIcon name="add" color="white" size={30}></MaterialIcon>
              </TouchableOpacity>
            </View>
            <View style={{marginLeft: 40}}>
              <TouchableOpacity>
                <MaterialIcon
                  name="thumb-up"
                  color="white"
                  size={30}></MaterialIcon>
              </TouchableOpacity>
            </View>
            <View style={{marginLeft: 40}}>
              <TouchableOpacity>
                <MaterialIcon
                  name="share"
                  color="white"
                  size={30}></MaterialIcon>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.optionsView}>
            <Text style={styles.optionsName}>My List</Text>
            <Text style={styles.optionsName}>Rate</Text>
            <Text style={styles.optionsName}>Share</Text>
          </View>
          <View
            style={{
              backgroundColor: '#505251',
              width: '50%',
              borderRadius: 5,
              margin: 5,
              marginTop: 20,
            }}>
            {/* <PickerComponent></PickerComponent> */}

            <Picker
              mode="dropdown"
              style={{
                height: 40,
                color: '#fff',
                fontWeight: 'bold',
              }}
              // itemStyle={{color: 'blue'}}
              selectedValue={this.state.selectedSeasonNumber}
              onValueChange={this.updateSelectedSeason}>
              {this.state.seriesData.seasons.map(season => {
                return (
                  <Picker.Item
                    label={season.name}
                    value={season.season_number}
                  />
                );
              })}
            </Picker>
          </View>

          <View>{episodeData.episodes.map(this.renderEpisode)}</View>
        </ScrollView>
      </View>
    );
  }
}

export default Details;
