'use strict';

import baseConfig from './base';

let config = {
	appEnv: 'dev',
	rootUrl: baseConfig.devUrl
};

export default Object.freeze(Object.assign({}, baseConfig, config));
