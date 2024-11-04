import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import NewsItem from './NewsItem';

const NewsList = ({newsData, onPressItem}) => {
  return (
    <FlatList
      data={newsData}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <NewsItem
          title={item.title}
          image={item.media || 'default_image_url'}
          topic={item.topic}
          publicationDate={item.published_date}
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
