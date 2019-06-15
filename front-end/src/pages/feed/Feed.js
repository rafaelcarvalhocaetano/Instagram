import React, { Component } from 'react';
import io from 'socket.io-client';
import api from '../../services/api';

import './Feed.css';

import more from '../../assets/more.svg';
import like from '../../assets/like.svg';
import comment from '../../assets/comment.svg';
import send from '../../assets/send.svg';

class Feed extends Component {
  state = {
    feed: []
  };

  registreToSocket() {
    const socket = io('http://localhost:8888');
    socket.on('posts', x => {
      this.setState({feed: [x, ...this.state.feed]});
    })
     socket.on('like', x => {
      this.setState({
        feed: this.state.feed.map(post => post._id === x._id ? x : post)
      });
    })
  }

  async componentDidMount() {
    this.registreToSocket();
    const response = await api.get("posts");
    this.setState({ feed: response.data });
  }

  handleLike(id) {
    api.post(`/posts/${id}/like`);
  }

  render() {
    return (
      <section id="post-list">
        {this.state.feed.map((x, i) => (
          <article key={x._id}>
            <header>
              <div className="user-info">
                <span>{x.author}</span>
                <span className="place">{x.place}</span>
              </div>
              <img src={more} alt="more" />
            </header>
            <img src={`http://localhost:8888/files/${x.image}`} alt="logo" />
            <footer>
              <div className="actions">
                <button type="button" onClick={() => this.handleLike(x._id)} >
                  <img src={like} alt="" className={x.likes > 0 ? 'ccv': ''}/>
                </button>
                <img src={comment} alt="" />
                <img src={send} alt="" />
              </div>
              <strong>{x.likes} curtidas</strong>
              <p>
                {x.description}
                <span>{x.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}

export default Feed;