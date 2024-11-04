import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const NewsItem = ({title, image, topic, publicationDate, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.topic}>{topic}</Text>
        <Text style={styles.date}>
          {new Date(publicationDate).toDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  topic: {
    fontSize: 14,
    color: '#888',
  },
  date: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
  },
});

export default NewsItem;
