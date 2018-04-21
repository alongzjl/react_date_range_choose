'use strict';

import baseConfig from './base';

let config = {
	appEnv: 'qa',
	rootUrl: baseConfig.qaUrl,
};

export default Object.freeze(Object.assign(baseConfig, config));
