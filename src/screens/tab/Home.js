import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import routes from '../../constants/routes';

const Home = ({navigation}) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://newscatcher-api.newscatcherapi.com/v2/latest_headlines',
          {
            headers: {
              'x-api-key': 'YOUR_RAPIDAPI_KEY',
            },
          },
        );
        setNewsData(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => navigation.navigate(routes.NEWSDETAILS, {news: item})}>
      <Image source={{uri: item.media}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>
        {new Date(item.published_date).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={newsData}
          renderItem={renderItem}
          keyExtractor={item => item._id}
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
    height: 200,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Home;
