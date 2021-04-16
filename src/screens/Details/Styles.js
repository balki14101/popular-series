import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
  },
  row: {
    flexDirection: 'row',
  },
  white: {color: '#fff'},
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
  year: {marginLeft: 10, color: '#fff'},
  age: {
    marginLeft: 10,
    color: '#fff',
    backgroundColor: '#808080',
    paddingLeft: 3,
    paddingRight: 3,
    fontWeight: 'bold',
    fontSize: 15,
  },
  season: {marginLeft: 10, color: '#fff'},
  hd: {marginLeft: 10, backgroundColor: '#808080'},
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
  play: {fontWeight: 'bold', marginLeft: 8},
  downloadButton: {
    backgroundColor: '#808080',
    marginTop: 4,
    alignItems: 'center',
    padding: 8,
    borderRadius: 3,
  },
  download: {
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 5,
  },
  cast: {color: '#fff', fontSize: 12},
  castContent: {color: '#fff', fontSize: 10},
  creater: {flexDirection: 'row', marginLeft: 5},
  createrContent: {color: '#fff', fontSize: 10, marginTop: 2},
  marginLeft: {
    marginLeft: 5,
  },
  optionsView: {
    marginTop: 10,
    flexDirection: 'row',
  },
  optionsName: {
    marginLeft: 40,
    fontSize: 10,
    color: 'white',
  },
  episodeImage: {
    width: 100,
    height: 50,
    marginBottom: 5,
    marginLeft: 5,
    borderRadius: 5,
  },
  episodeContentView: {
    backgroundColor: 'red',
    flex: 1,
    marginLeft: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  episodeName: {color: '#fff', fontWeight: 'bold', fontSize: 15},
  episodeOverview: {color: '#fff', marginLeft: 5},
  whiteAndBold: {color: '#fff', fontWeight: 'bold'},
});

export default styles;
