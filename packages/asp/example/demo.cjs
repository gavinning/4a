const asp = require('../dist/index.cjs').default

asp.gray('message', { app: '@4a/asp' })
asp.log('message', { app: '@4a/asp' })
asp.debug('message', { app: '@4a/asp' })
asp.info('message', { app: '@4a/asp' })
asp.warn('message', { app: '@4a/asp' })
asp.error('message', { app: '@4a/asp' })

asp.pretty().error('message', { app: '@4a/asp' })
asp.error('message', { app: '@4a/asp' })
