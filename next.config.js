const path = require('path')

module.exports = {
  images: {
    domains: ['image.tmdb.org', 'rb.gy'],
  },
  webpack(config) {
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components')
    config.resolve.alias['@pages'] = path.resolve(__dirname, 'pages')
    config.resolve.alias['@styles'] = path.resolve(__dirname, 'styles')

    return config
  },
}
