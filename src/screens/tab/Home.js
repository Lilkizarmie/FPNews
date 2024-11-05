import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';
import NewsList from '../../components/NewsList';
import routes from '../../constants/routes';

const TopBar = ({title}) => (
  <View style={styles.topBar}>
    <Text style={styles.topBarTitle}>{title}</Text>
  </View>
);

const Home = ({navigation}) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines',
          {
            params: {
              country: 'us',
              category: 'general',
            },
            headers: {
              Authorization: 'b0703fb9c6434153a4ae73d4cfb64d39',
            },
          },
        );
        console.log(response);
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
      <TopBar title="Latest News" />
      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" style={styles.loader} />
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    height: 60,
    backgroundColor: '#3D8361',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    elevation: 4,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default Home;
