// git@github.com:q269384828/blcok-note-vue-demo.git
import ghpages from 'gh-pages';

ghpages.publish('dist', {
  branch: 'gh-pages',
  repo: 'https://github.com/q269384828/blcok-note-vue-demo.git',
}, (e) => {
  // eslint-disable-next-line no-console
  console.log('success', e);
});
