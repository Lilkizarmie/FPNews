import React from 'react';
import {ScrollView, Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addBookmark, removeBookmark} from '../../redux/actions/auth';
import NewsHeader from '../components/NewsHeader';
import NewsContent from '../components/NewsContent';

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
      <NewsHeader
        title={news.title}
        author={news.author}
        date={news.published_date}
        isBookmarked={isBookmarked}
        onBookmarkToggle={handleBookmark}
      />
      <NewsContent summary={news.summary} />
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
    marginBottom: 10,
  },
});

export default NewsDetails;
