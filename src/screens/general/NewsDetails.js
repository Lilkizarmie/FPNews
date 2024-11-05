import React from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addBookmark, removeBookmark} from '../../redux/actions/auth';
import NewsHeader from '../../components/NewsHeader';
import NewsContent from '../../components/NewsContent';
import Icon from 'react-native-vector-icons/Ionicons';

const NewsDetails = ({route}) => {
  const {news} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const bookmarks = useSelector(state => state.bookmarks.bookmarks);

  const isBookmarked = bookmarks.some(item => item.url === news.url);

  const handleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(news.url));
    } else {
      dispatch(addBookmark(news));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>News Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {news.urlToImage && (
          <Image source={{uri: news.urlToImage}} style={styles.image} />
        )}
        <NewsHeader
          title={news.title}
          author={news.source.name}
          date={news.publishedAt}
          isBookmarked={isBookmarked}
          onBookmarkToggle={handleBookmark}
        />
        <NewsContent
          author={news.source.name}
          date={news.publishedAt}
          summary={news.description || news.content || 'No content available.'}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
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
