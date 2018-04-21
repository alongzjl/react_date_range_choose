/**
 * @Author: Liao Hui
 * @Date:   2018-04-18T14:00:11+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-18T19:10:10+08:00
 */

import React, {Component, PropTypes} from 'react';

class TextInputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleInput(e) {
        let text = e.target.value;

        this.props.onInput(text);
    }

    render() {
        let {placeholder, text, pattern, className} = this.props;

        return (
            <input type="text"
                   pattern={pattern}
                   value={text}
                   className={className}
                   placeholder={placeholder}
                   onChange={(e) => this.handleInput(e)}/>
        );
    }
}

export default TextInputComponent;
