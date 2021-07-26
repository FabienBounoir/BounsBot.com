import React from 'react';

class AnimationText extends React.Component {
    state = {
        increment: 0,
        word: ["La Modération","Les Levels","Les Réactions","La Radio","La Musique","Les Playlists"]
    }
  
    tick() {
        this.setState({
            increment: this.state.increment + 1 >= this.state.word.length ? (0) : (this.state.increment + 1),
        });
    }
  
    componentDidMount() {
      this.interval = setInterval(() => this.tick(), 3000);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  
    render() {
      return (
        <span class="visible">
          {this.state.word[this.state.increment]}
        </span>
      );
    }
}

export default AnimationText;
