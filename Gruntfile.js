// Dependencies can go here if you want
// Great insight: https://quickleft.com/blog/grunt-js-the-basics/
// Sample: http://gruntjs.com/sample-gruntfile
// Tips: https://quickleft.com/blog/grunt-js-tips-tricks/

module.exports = function(grunt) {
    // Setup configuration...
    // Load tasks...
    // Define tasks...

    grunt.initConfig({
			browserify: {
	       dist: {
	         options: {
	           transform: [["babelify", { "stage": 0 }]]
	         },
	         files: {
	           "build/bundle.js": "src/main.js"
	         }
	       }
			 },

        jshint: {
            scripts: {
                src: ['scripts/**.js', 'lib/**.js']
            },

            tests: { // We can have more than one jshint task, this ones called `jshint:tests`
                src: 'tests/**.js'
            }
        },

        uglify: {
            scripts: {
                expand: true,
                cwd: 'scripts/',
                src: '**.js',
                dest: 'build/',
                ext: '.min.js'
            }
        },

        less: {
            styles: {
                files: {
                    'build/styles/app.css': 'styles/app.less'
                }
            }
        },

        watch: {
            scripts: {
                files: 'scripts/**.js',
                task: 'jshint:scripts'
            },

            styles: {
                files: 'styles/**.less',
                task: 'less:styles'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify','jshint', 'less']);
    grunt.registerTask('build', ['jshint', 'uglify', 'less']);

};