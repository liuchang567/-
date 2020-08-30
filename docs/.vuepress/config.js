const nav = require('./nav')
const sidebar = require('./sidebar')

module.exports = {
  title: '工作中的小妙招',
  description: '更新日常工作中好方法',
  head: [
    ['link', { rel: 'icon', href: '/logo.jpg' }]
  ],
  port: 9999,
  markdown: {
    lineNumbers: true
  },
  base: '/workx/',
  extraWatchFiles: [
    '.vuepress/nav.js', 
    '.vuepress/sidebar.js'
  ],
  themeConfig: {
    sidebarDepth: 2,
    smoothScroll: true,
    nav,
    sidebar,
    lastUpdated: '更新时间',
  }
}