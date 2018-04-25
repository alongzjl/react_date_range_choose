/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T11:53:46+08:00
 */

import React from 'react';
import $ from 'jquery';
import classnames from 'classnames';
import './index.less';

class RyPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {}
        }
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentWillReceiveProps() {
        this.doResize()
    }

    doResize() {
        const $parent      = $(this.element)
        const parentWidth  = $parent.width()  - 8
        const parentHeight = $parent.height() - 8
        const parentBit    = parentWidth / parentHeight
        const childWidth   = this.props.config.width
        const childHeight  = this.props.config.height
        const childBit     = childWidth / childHeight

        let scale = 1, width, height

        debugger
        if (parentBit > childBit) {
            scale = parentHeight / childHeight;
            height = parentHeight;
            width = childWidth * scale;
        } else {
            scale = parentWidth / childWidth;
            width = parentWidth;
            height = childHeight * scale;
        }

        if (this.props.config.scale) {
            this.props.config.scale(scale);
        }

        this.setState({
            style: {
                width: width,
                height: height
            }
        });
    }

    render() {
        return (
            <section className="ry-roll-screen-preview-wrap" ref={(instance)=>{this.element = instance;}}>
                <div className="ry-roll-screen-preview" style={this.state.style}>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </section>
        );
    }
}

export default RyPreview;
