import React from 'react'

class NoMatchComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="">
				您输入的URL地址有误~
			</div>
        )
    }
}

export default NoMatchComponent
