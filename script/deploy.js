const path = require('path')
const ghPages = require('gh-pages')
const git = require('git-rev-sync')
const chalk = require('chalk')
const moment = require('moment')

const config = {
  message: `${git.short()} - Update ${moment().format()} (${moment().utcOffset()})`,
  logger: (message) => console.log(message),
  repo: 'https://github.com/gzes00201/sentry_vue-test.git',
  branch: `build/release`,
  depth: 1
}

ghPages.publish(path.resolve('dist'), config, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`${chalk.blue('=== DEPLOY SUCCESS ===')}`)
})
