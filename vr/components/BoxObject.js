import React, {Component} from 'react'
import {
    View,
    Box
} from 'react-vr'

class BoxObject extends Component {
    render() {
        return (
            <Box 
                dimWidth = {.01}
                dimHeight = {.01}
                dimDepth = {.01}
                wireframe = {true}
                style = {{
                    color: '#fff'
                }}
            />
        )
    }
}

export default BoxObject