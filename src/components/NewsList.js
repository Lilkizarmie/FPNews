import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import NewsItem from './NewsItem';

const NewsList = ({newsData, onPressItem}) => {
  return (
    <FlatList
      data={newsData}
      keyExtractor={item => item.url}
      renderItem={({item}) => (
        <NewsItem
          title={item.title}
          image={item.urlToImage || 'default_image_url'}
          topic={item.source.name}
          publicationDate={item.publishedAt}
          onPress={() => onPressItem(item)}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
});

export default NewsList;
