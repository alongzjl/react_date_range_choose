/**
 * @Author: Liao Hui
 * @Date:   2018-04-18T14:00:11+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T16:11:54+08:00
 */

'use strict';

import baseConfig from './base';

let config = {
    appEnv: 'dist',
    rootUrl: baseConfig.distUrl
};

export default Object.freeze(Object.assign({}, baseConfig, config));
