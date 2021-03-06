module.exports = function(grunt) {

  var requirejsOptions = require('./js/config'),
      docs = {};

  for (var key in requirejsOptions.paths) {
    docs['docs/dev/' + requirejsOptions.paths[key] + '.js'] = [requirejsOptions.paths[key] + '.js'];
  }
  docs['docs/dev/bower_components/requirejs/require.js'] = 'bower_components/requirejs/require.js';
  docs['docs/dev/js/config.js'] = 'js/config.js';

  requirejsOptions.optimize = 'none';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js', 'tests/*.js']
    },
    karma: {
      options: {
        configFile: 'tests/karma.conf.js',
        runnerPort: 9999,
        browsers: ['Chrome']
      },
      dev: {
        autoWatch: true
      },
      ci: {
        singleRun: true,
        reporters: ['dots', 'junit', 'coverage'],
        junitReporter: {
          outputFile: 'test-results.xml'
        },
        coverageReporter: {
          type : 'cobertura',
          dir : 'coverage/'
        }
        // TODO: SauceLabs stuff comes here
      }
    }

    // TODO: minimize javascript if needed
    //uglify: {
    //  toolbar: {
    //    files: {
    //      'build/toolbar_init.min.js': ['js/iframe_init.js']
    //    }
    //  },
    //  docs: {
    //    files: docs
    //  }
    //},

    // TODO: create bundle for specific python packages that uses them
    //requirejs: {
    //  options: requirejsOptions,
    //  widgets: {
    //    options: {
    //      name: 'node_modules/almond/almond.js',
    //      include: 'mockupextra-bundles-widgets',
    //      insertRequire: ['collectivemockup-bundles-widgets'],
    //      out: 'build/widgets.min.js',
    //      excludeShallow: ['jquery']
    //    }
    //  }
    //},

    // TODO: include less styles if needed
    //less: {
    //  widgets: {
    //    options: {
    //      paths: ['less']
    //    },
    //    files: {
    //      'build/widgets.css': 'less/widgets.less'
    //    }
    //  },
    //  toolbar: {
    //    options: {
    //      paths: ['less']
    //    },
    //    files: {
    //      'build/toolbar.css': 'less/toolbar.less',
    //      'build/toolbar_init.css': 'less/iframe_init.less'
    //    }
    //  },
    //  docs: {
    //    options: {
    //      paths: ['less']
    //    },
    //    files: {
    //      'docs/dev/docs.css': 'less/docs.less'
    //    }
    //  }
    //},

    // TODO: minimize css if needed
    //cssmin: {
    //  widgets: {
    //    expand: true,
    //    cwd: 'build/',
    //    src: ['widgets.css'],
    //    dest: 'build/',
    //    ext: '.min.css',
    //    report: 'min'
    //  },
    //  toolbar: {
    //    expand: true,
    //    cwd: 'build/',
    //    src: ['toolbar.css', 'toolbar_init.css'],
    //    dest: 'build/',
    //    ext: '.min.css',
    //    report: 'min'
    //  },
    //  docs: {
    //    expand: true,
    //    cwd: 'docs/dev/',
    //    src: ['docs.css'],
    //    dest: 'docs/dev/',
    //    ext: '.min.css',
    //    report: 'min'
    //  }
    //}
  });

  //grunt.loadNpmTasks('grunt-contrib-less');
  //grunt.loadNpmTasks('grunt-contrib-requirejs');
  //grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['jshint', 'karma:dev' ]);

};
