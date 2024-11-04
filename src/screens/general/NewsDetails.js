import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { addBookmark, removeBookmark } from '../../redux/actions/auth';

const NewsDetails = ({route}) => {
  const {news} = route.params;
  const dispatch = useDispatch();
  const bookmarks = useSelector(state => state.bookmarks.bookmarks);

  const isBookmarked = bookmarks.some(item => item.id === news.id);

  const handleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(news.id));
    } else {
      dispatch(addBookmark(news));
    }
  };

  return (
    <ScrollView style={styles.container}>
      {news.media && <Image source={{uri: news.media}} style={styles.image} />}
      <Text style={styles.title}>{news.title}</Text>
      <Text style={styles.author}>By {news.author || 'Unknown'}</Text>
      <Text style={styles.date}>
        {new Date(news.published_date).toLocaleString()}
      </Text>
      <Text style={styles.summary}>{news.summary}</Text>
      <Button
        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
        onPress={handleBookmark}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  author: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 15,
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default NewsDetails;
