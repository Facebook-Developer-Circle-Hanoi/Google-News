import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Linking, ActivityIndicator } from 'react-native';
import Button from './src/components/Button';
import Articles from './src/components/Articles';

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const fetch_data = async () => {
    setLoading(true);
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=a26b69e7a340479fa2b8d12a1435a4c1&page=${pageNumber}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(async response => {
      const data = await response.json();
      const newArticleList = filterForUniqueArticles(
        articles.concat(data.articles)
      );
      setArticles(newArticleList);
      setPageNumber(pageNumber + 1);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
    })
  }

  const filterForUniqueArticles = arr => {
    const cleaned = [];
    arr.forEach(itm => {
      let unique = true;
      cleaned.forEach(itm2 => {
        const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
        if (isEqual) unique = false;
      });
      if (unique) cleaned.push(itm);
    });
    return cleaned;
  };

  useEffect(() => {
    fetch_data();
  }, [])

  if(loading){
    return (
    <View style={[styles.container, {justifyContent: "center", alignContent: "center"}]}>
      <ActivityIndicator size="large" loading={loading} />
    </View>
    )
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      // showsVerticalScrollIndicator='false'
      data={articles}
      keyExtractor={item => item.title}
      onEndReached={() => fetch_data()}
      onEndReachedThreshold={1}
      ListFooterComponent={<ActivityIndicator size="large" loading={loading} />}
      renderItem={({item}) => {
        return(
          <Articles data={item}></Articles>
        )
      }}
    >
    </FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});