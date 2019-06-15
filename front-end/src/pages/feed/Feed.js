import React, { Component } from 'react';

import api from '../../services/api';

import './Feed.css';

import more from '../../assets/more.svg';
import like from '../../assets/like.svg';
import comment from '../../assets/comment.svg';
import send from '../../assets/send.svg';


class Feed extends Component {

  state = {
    feed: [],
  };

  async componentDidMount() {
    const response = await api.get('posts');
    this.setState({ feed: response.data });
  }

  render() {
    return (
      <section id="post-list">
        {this.state.feed.map(x => (
          <article>
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
                <img src={like} alt="" />
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
        ))};
      </section>
    );
  }
}

export default Feed;