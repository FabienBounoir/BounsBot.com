import React from 'react';
import "./_animationimage.css";

class AnimationImage extends React.Component {
  state = {
    increment: 0,
    image: this.props.img,
    time: this.props.time
  }

  tick() {
    this.setState({
      increment: this.state.increment + 1 >= this.state.image.length ? (0) : (this.state.increment + 1),
    });
  }

  componentDidMount() {
    if (this.state.image.length > 1) {
      this.interval = setInterval(() => this.tick(), this.state.time || 7000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <img className="image" alt="Feature Element" src={this.state.image[this.state.increment]} />
    );
  }
}

export default AnimationImage;
