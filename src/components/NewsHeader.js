import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NewsHeader = ({title, author, date, isBookmarked, onBookmarkToggle}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>By {author || 'Unknown'}</Text>
      <Text style={styles.date}>{new Date(date).toLocaleString()}</Text>

      <TouchableOpacity onPress={onBookmarkToggle} style={styles.bookmarkIcon}>
        <Ionicons
          name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
          size={25}
          color={isBookmarked ? '#f57c00' : '#555'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    color: 'gray',
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default NewsHeader;
