const formatMap = {
	px: {
		fontSize:          1,
		width:             1,
		height:            1,
		paddingTop:        1,
		paddingRight:      1,
		paddingBottom:     1,
		paddingLeft:       1,
		top:               1,
		right:             1,
		bottom:            1,
		left:              1,
		marginTop:         1,
		marginRight:       1,
		marginBottom:      1,
		marginLeft:        1,
		borderWidth:       1,
		borderTopWidth:    1,
		borderRightWidth:  1,
		borderBottomWidth: 1,
		borderLeftWidth:   1,
		lineHeight:        1
	},
	complex: {
		margin:       1,
		padding:      1,
		borderRadius: 1,
		boxShadow:    1,
		textShadow:   1,
		transform:    1,
		border:       1,
		borderTop:    1,
		borderRight:  1,
		borderBottom: 1,
		borderLeft:   1
	},
	color: {
		color:           1,
		borderColor:     1,
		backgroundColor: 1
	},
	image: {
		backgroundImage: 1
	},
	px2: {
		lineHeight: 1
	},
	numberTemplate: {
		translateX: 'translateX({{val}}px)',
		translateY: 'translateY({{val}}px)',
		scale:      'scale({{val}})',
		scaleX:     'scaleX({{val}})',
		scaleY:     'scaleY({{val}})',
		rotate:     'rotate({{val}}deg)',
		rotateX:    'rotateX({{val}}deg)',
		rotateY:    'rotateY({{val}}deg)',
		skewX:      'skewX({{val}})',
		skewY:      'skewY({{val}})'
	}
}

module.exports = formatMap