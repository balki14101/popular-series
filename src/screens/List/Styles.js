import {StyleSheet} from 'react-native';

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
export default styles;
