'use strict';

var
  runSequence = require('run-sequence'),
  spawn = require('child_process').spawn
  ;

/*
 * Monitor
 */

function run(tasks) {
  return function() {
    runSequence(tasks);
  };
}

function watchForChanges(production) {
  var suffix = production ? 'prod' : 'dev';

  /*
   * Watch for CSS
   */
  plugins.watch(config.css.watch, run('css'));

  /*
   * Watch for JS
   */
  plugins.watch(config.js.watch, run('js:' + suffix));

  process.nextTick(function() {
    plugins.util.log();
    plugins.util.log(
      plugins.util.colors.red(production ? '[PRODUCTION]' : '') +
      plugins.util.colors.yellow(!production ? '[Development]' : ''),
      'Monitoring Quasar Framework...'
    );
    plugins.util.log();
  });
}

function launch(args, done) {
  args.push('-d');
  spawn('quasar', args, {cwd: config.preview.src, stdio: 'inherit'})
    .on('error', function() {
      console.log('\n!!! You need quasar-cli installed (npm install -g quasar-cli) !!!\n');
      process.exit(1);
    })
    .on('close', function(code) {
      done();

      if (code) {
        console.log(plugins.util.colors.red('\n!!! [FAILURE] Quasar CLI errored out. Check for code errors above. Bailing !!!\n'));
      }

      process.exit(code);
    });
}


['dev', 'prod'].forEach(function(type) {

  var suffix = type === 'prod' ? ':prod' : '';
  var cmd = type === 'prod' ? ['-p'] : [];

  gulp.task('monitor' + suffix, [type], function() {
    config.bailOnError = false;
    watchForChanges(type === 'prod');
  });
  gulp.task('preview' + suffix, ['monitor' + suffix], function(done) {
    launch(['preview'].concat(cmd), done);
  });
  gulp.task('responsive' + suffix, ['monitor' + suffix], function(done) {
    launch(['responsive'].concat(cmd), done);
  });

  gulp.task('fullwrap' + suffix, [type], function(done) {
    launch(['build'].concat(cmd), function() {
      launch(['wrap', 'run'], done);
    });
  });

});

gulp.task('wrap', function(done) {
  launch(['wrap', 'run'], done);
});
