import React from 'react';
import "./_animationimage.css";

class AnimationImage extends React.Component {
    state = {
        increment: 0,
        image: this.props.img
    }
  
    tick() {
        this.setState({
            increment: this.state.increment + 1 >= this.state.image.length ? (0) : (this.state.increment + 1),
        });
    }
    
    componentDidMount() {
      this.interval = setInterval(() => this.tick(), 7000);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  
    render() {
      return (
          <img className="image" alt="logo" src= { this.state.image[this.state.increment] }/>
      );
    }
}

export default AnimationImage;
