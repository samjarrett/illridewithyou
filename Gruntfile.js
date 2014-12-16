var timer = require("grunt-timer");

module.exports = function (grunt) {

	timer.init(grunt, {
		deferLogs: false,
		friendlyTime: false,
		color: "blue"
	});

	require('jit-grunt')(grunt, {
		"sculpin-generate": 'grunt-sculpin',
		"sculpin-watch": 'grunt-sculpin'
	});

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		sass: {
			develop: {
				options: {
					outputStyle: 'expanded'
				},
				files: {
					"source/design/css/global.css": "source/design/scss/global.scss"
				}
			},
			build: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					"source/design/css/global.css": "source/design/scss/global.scss"
				}
			}
		},

		"bower-install-simple": {
			options: {
				color: true,
				directory: "source/design/bower"
			},

			"develop": {
				options: {
					production: false
				}
			},

			"build": {
				options: {
					production: true
				}
			}
		},

		uglify: {
			options: {
				compress: {
					drop_console: true
				},
				mangle: {
					except: [
						'jQuery',
						'Backbone',
						'Spinner',
						'$',
						'enquire',
						'respond',
						'Bootstrap',
						'Maplace'
					]
				}
			}
		},

		//* =============================================
		//Section: WATCH
		//================================================ */
		watch: {
			options: {
				livereload: true,
				options: {
					nospawn: true
				}
			},
			less: {
				options: {
					livereload: false
				},
				files: [
					'source/design/scss/**/*.scss'
				],
				tasks: ['sass:develop']
			},
			output: {
				files: ['output_dev/design/css/global.css', 'output_dev/**/*.html', '!output_dev/design/**/*.html'],
				tasks: []
			},
			tpl: {
				files: ['source/**/*.html', 'source/**/*.twig', 'Gruntfile.js', 'package.json', 'app/config/sculpin_site.yml'],
				options: {
					livereload: false
				}
			},
			js: {
				files: ['source/design/scripts/*.js'],
				tasks: ['copy:js','jshint']
			}
		},
		'sculpin-generate': {
			options: {
				bin: 'php sculpin.phar'
			},
			develop: {

			},
			build: {
				args: {
					env: 'prod',
					url: 'http://www.squareweave.com.au'
				}
			}
		},
		'sculpin-watch': {
			options: {
				bin: 'php sculpin.phar'
			},
			develop: {
				args: {
					'server': true
				}
			}
		},
		concurrent: {
			watchers: {
				tasks: ['sculpin-watch','watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});

	/*
	 ==================
	 * Here are the important tasks!
	 ==================
	 * */


	/*
	 * `grunt develop`: this task runs the watch so your assets update live, your site will be accessible at http://localhost:8000.
	 * */
	grunt.registerTask('develop', [], function () {
		grunt.task.run('bower-install-simple:develop', 'sass:develop','concurrent:watchers');
	});

	/*
	 * `grunt build`: this task creates a production ready version of theme with 1 js file and minified css.
	 * */
	grunt.registerTask('build', [], function () {
		grunt.loadNpmTasks('grunt-usemin');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.task.run('bower-install-simple:build', 'sass:build','sculpin-generate:build','copy:bower_build','useminPrepare','usemin','concat', 'uglify','htmlmin', 'cssmin', 'bless');
	});

	/*
	 * `grunt preview`: this task creates a production ready build and then allows it to be seen @ http://localhost:8000
	 * */
	grunt.registerTask('preview', [], function () {
		grunt.task.run('build', 'copy:build_to_dev','message:preview','sculpin-serve');
	});


};