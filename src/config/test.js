/**
 * @Author: Liao Hui
 * @Date:   2018-04-18T14:00:11+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T16:12:05+08:00
 */

'use strict';

import baseConfig from './base';

let config = {
    appEnv: 'test',
    rootUrl: baseConfig.qaUrl
};

export default Object.freeze(Object.assign(baseConfig, config));
