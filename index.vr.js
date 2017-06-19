import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Box,
  PointLight,
  Animated,
  Plane
} from 'react-vr';

import BoxObject from './vr/components/BoxObject.js'

class TheBox extends React.Component {
  
  componentDidMount() {
    Animated.createAnimatedComponent(this)
  }
  render() {
    return (
      <Box 
                onEnter = {() => console.log(this.props.origin)}
                dimWidth = {.2}
                dimHeight = {.2}
                dimDepth = {.2}
                lit = {true}
                style = {{
                    color: '#3d3d3d',
                    transform: [
                      {translate: [this.props.origin, 0, -5]},
                      {rotateY: this.props.currentRotation}
                    ]
                }}
            />
    )
  }
}

export default class Portfolio extends React.Component {
  constructor() {
    super()
    this.state = {
      boxArray: [],
      rotation: 130
    }
    this.lastUpdate = Date.now();

    this.rotate = this.rotate.bind(this);
   
  }
  rotate() { 
      const now = Date.now(); 
      const delta = now - this.lastUpdate; 
      this.lastUpdate = now; 
      this.setState({ rotation: this.state.rotation + delta / 10 }); 
      this.frameHandle = requestAnimationFrame(this.rotate); 
     
    }
  componentDidMount() {
    let boxArray = []
    let origin = -5
    for (let i = 0; i < 50; i++) {
      let random = Math.floor(Math.random() * 3) + 1 
      console.log(random) 
      let direction = ''
      switch (random) {
        case 1: 
          direction = 'rotateX'
          break;
        case 2: 
          direction = 'rotateY'
          break;
        case 3: 
          direction = 'rotateZ'
          break;
        default:
          return;
      }
      boxArray.push({origin: origin, direction: direction})
        origin += .2
    }
    this.setState({
      boxArray: boxArray
    })
    this.rotate()

  }
  componentWillUnmount() { 
    if (this.frameHandle) { 
      cancelAnimationFrame(this.frameHandle); 
      this.frameHandle = null; 
    } 
  }
  checkForDirection(direction) {
    switch(direction) {
      case 'rotateX': 
        return {rotateX: this.state.currentlyRotating ? this.state.rotation : 0}
        break;
      case 'rotateY': 
        return {rotateY: this.state.currentlyRotating ? this.state.rotation : 0}
        break;
      case 'rotateZ': 
        return {rotateZ: this.state.currentlyRotating ? this.state.rotation : 0}
        break;
      default:
        return
    }
  }
  createBox(x, y, z, direction) {
    return <Box 
                dimWidth = {.2}
                dimHeight = {.2}
                onEnter = {() => this.setState({currentlyRotating: true})}
                
                dimDepth = {.2}
                lit = {true}
                texture = 'http://i.imgur.com/RnLvo5z.jpg'
                style = {{
                    color: '#3d3d3d',
                    transform: [
                      {translate: [x, y, z]},
                      this.checkForDirection(direction)
                    ]
                }}
            />
  }
  mapBoxes() {
    let boxArray = this.state.boxArray
    console.log(boxArray)
    boxArray.map((box) => {
      console.log(box.origin)
      this.createBox(0, 0, -2, 'rotateX')
    })
  }
  render() {
    let boxes = this.state.boxArray.map((box) => {
      console.log(box.origin)
      return this.createBox(box.origin, 0, -2, box.direction)
    })
    return (
      <View>
        <PointLight 
          intensity = {5}
          decay = {2}
        />
            
            {boxes}
            
            <Plane
              dimWidth = {20000}
              dimHeight = {20000}
              lit = {true}
              texture = 'http://i.imgur.com/OrmUyMD.jpg'
              style = {{
                transform: [
                  {translate: [0, -400, -20]},
                  {rotateX: -90}
                ]
              }}
            />
      </View>
    );
  }
};

AppRegistry.registerComponent('Portfolio', () => Portfolio);
