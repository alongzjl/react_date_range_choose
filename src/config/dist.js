'use strict';

import baseConfig from './base';

let config = {
	appEnv: 'dist',
	rootUrl: baseConfig.distUrl,
};

export default Object.freeze(Object.assign({}, baseConfig, config));
