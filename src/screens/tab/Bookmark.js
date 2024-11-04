import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';

const Bookmark = ({navigation}) => {
  const bookmarks = useSelector(state => state.bookmarks.bookmarks);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => navigation.navigate('NewsDetails', {news: item})}>
      <Image source={{uri: item.media}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {bookmarks.length === 0 ? (
        <Text>No bookmarks found</Text>
      ) : (
        <FlatList
          data={bookmarks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  newsItem: {
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Bookmark;
