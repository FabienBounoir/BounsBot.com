import React from 'react';
import "./_animationtext.css";
class AnimationText extends React.Component {
    state = {
        increment: 0,
        word: ["La Modération","Les Levels", "Les jeux","Les Réactions","La Radio","La Musique","Les Playlists","Les Renames"]
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
        <span className="visible">
          {this.state.word[this.state.increment]}
        </span>
      );
    }
}

export default AnimationText;
