import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import NewsList from '../../components/NewsList';
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

  const handlePressItem = item => {
    navigation.navigate(routes.NEWSDETAILS, {news: item});
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <NewsList newsData={newsData} onPressItem={handlePressItem} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default Home;
