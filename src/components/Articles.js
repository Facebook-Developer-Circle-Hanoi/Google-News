import React, { Component } from 'react';
import {View, Image, StyleSheet, Text, Linking} from 'react-native';
import Theme from '../Theme/Color';
import Button from './Button';

class Article extends Component {
    constructor(props) {
        super(props)
    };

    render() {
        function trimWords(str, numWords, more = '...') {
            var countWords = str;
            countWords = countWords.replace(/(^\s*)|(\s*$)/gi, '');
            countWords = countWords.replace(/[ ]{2,}/gi, ' ');
            countWords = countWords.replace(/\n /, '\n');
            if (countWords.split(' ').length > numWords) {
              str = str.split(' ').splice(0, numWords).join(' ');
              str += more;
            }
            return str;
        }
        
        const openLink = url => {
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                Linking.openURL(url);
                } else {
                console.log(`Don't know how to open URL: ${url}`);
                }
            });
        };

        const item = this.props.data;

        return(
            <View style={[styles.news, styles.shadow]}>
                <Image style={styles.newsImage} source={{uri: item.urlToImage == null ? 'https://demos.creative-tim.com/material-kit-pro/assets/img/image_placeholder.jpg' : item.urlToImage}}/>
                <View style={styles.newsBoxTitle}>
                    <Text style={styles.newsTitle}>{trimWords(item.title, 7)}</Text>
                </View>
                <View style={styles.source}>
                    <Text style={styles.sourceText}>#{item.source.name}</Text>
                </View>
                <View style={{alignItems: "center"}}>
                    <Button onPress={()=>{openLink(item.url)}}></Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  news: {
    width: 380,
    height: 370,
    backgroundColor: '#fff',
    marginTop: 80,
    borderRadius: 8,
    position: "relative",
    paddingHorizontal: 15
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginTop: 10,
  },
  newsBoxTitle: {
    paddingHorizontal: 15
  },
  newsImage: {
    width: 350,
    height: 250,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f4f4f4',
    zIndex: 1,
    position: "relative",
    top: -30
  },
  source: {
    position: "absolute",
    backgroundColor: '#fff',
    zIndex: 2,
    left: 15,
    bottom: 115,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14
  },
  sourceText: {
    color: Theme.COLORS.ERROR,
    fontSize: 16,
    textTransform: 'uppercase'
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 5
  }
});

export default Article;