import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const NewsHeader = ({title, author, date, isBookmarked, onBookmarkToggle}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>By {author || 'Unknown'}</Text>
      <Text style={styles.date}>{new Date(date).toLocaleString()}</Text>
      <Button
        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
        onPress={onBookmarkToggle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
    color: 'gray',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
});

export default NewsHeader;
