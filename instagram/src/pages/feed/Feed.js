// @ts-nocheck
import React, { Component } from 'react';
import io from 'socket.io-client';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import api from '../../service/api';

import camera from '../../assets/camera.png';
import more from '../../assets/more.png';
import like from '../../assets/like.png';
import comment from '../../assets/comment.png';
import send from '../../assets/send.png';

export default class Feed extends Component {
   
  state = {
    feed: []
  }

  registerToSocket = () => {
    const socket = io('http://196.168.1.115:8888');
    socket.on('posts', x => {
      this.setState({ feed: [x, ...this.state.feed] });
    })
    socket.on('like', x => {
      this.setState({
        feed: this.state.feed.map(post => post._id === x._id ? x : post)
      });
    })
  }

  async componentDidMount() {
    this.registerToSocket();
    const response = await api.get('posts');
    this.setState({ feed: response.data })
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity onPress={ () => navigation.navigate('New')} >
        <Image source={camera} style={style.imageCamera} />
      </TouchableOpacity>
    )
  });

  handleLike(id) {
    api.post(`/posts/${id}/like`);
  }

  render() {
    return (
    <View style={style.container}>
        <FlatList
        data={this.state.feed}
        keyExtractor={post => post._id}
        renderItem={({item}) => (
          <View style={style.feedItem}>
            <View style={style.feedItemHeader}>
              <View style={style.userInfo}>
                <Text style={style.name}>{item.author}</Text>
                <Text style={style.place}>{item.place}</Text>
              </View>
              <Image source={more} />
            </View>
            <Image style={style.feedImage} source={{ uri: `http://192.168.1.115:8888/files/${item.image}` }} />
            <View style={style.feedItemFooter} >
              <View style={style.actions} >
                <TouchableOpacity style={style.action} onPress={ () => this.handleLike(item._id) }>
                  <Image source={like} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={style.action}>
                  <Image source={comment} />
                </TouchableOpacity>
                <TouchableOpacity style={style.action} onPress={() => { }}>
                  <Image source={send} />
                </TouchableOpacity>
              </View>
              <Text style={style.likes}>{item.likes} curtidas</Text>
              <Text style={style.description}>{item.description}</Text>
              <Text style={style.hashtags}>{item.hashtags}</Text>
            </View>
          </View>
        )}
        />
    </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  feedItem: {
    marginTop: 20
  },
  feedItemHeader: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {

  },
  name: {
    fontSize: 14,
    color: '#000'
  },
  place: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15
  },
  feedItemFooter: {
    paddingHorizontal: 15
  },
  actions: {
    flexDirection: 'row'
  },
  action: {
    marginRight: 8
  },
  likes: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000'
  },
  description: {
    lineHeight: 18,
    color: '#000'
  },
  hashtags: {
    color: '#CCC'
  },
  imageCamera: {
    width: 28,
    height: 26,
    marginRight: 20,
    backgroundColor: 'transparent'
  }
});