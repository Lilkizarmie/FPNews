import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NewsContent = ({author, date, summary}) => {
  return (
    <View>
      <Text style={styles.author}>By {author || 'Unknown'}</Text>
      <Text style={styles.date}>{new Date(date).toLocaleString()}</Text>
      <Text style={styles.summary}>{summary}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default NewsContent;
