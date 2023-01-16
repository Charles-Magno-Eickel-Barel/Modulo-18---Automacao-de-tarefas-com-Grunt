module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        },
                        {
                            match: 'FOTO_LOGO',
                            replacement: '../src/image/logo/Final_Fantasy_VII_Logo (1).svg'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        },
                        {
                            match: 'FOTO_LOGO',
                            replacement: './image/logo/Final_Fantasy_VII_Logo (1).min.svg'
                        },
                        {
                            match: 'FOTO_SINOPSE',
                            replacement: './image/sinopse/final-fantasy-7.min.jpg'
                        },
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        },
        imagemin: {
            static: {
                options: {
                    optimizationLevel: 2,
                    svgoPlugins: [{removeViewBox: false}]
                },
                files: {
                    'dist/image/logo/Final_Fantasy_VII_Logo (1).min.svg': 'src/image/logo/Final_Fantasy_VII_Logo (1).svg',
                    'dist/image/sinopse/final-fantasy-7.min.jpg': 'src/image/sinopse/final-fantasy-7.jpg',
                    'dist/image/slide/slide1.min.jpg': 'src/image/slide/slide1.jpg',
                    'dist/image/slide/slide2.min.png': 'src/image/slide/slide2.png',
                    'dist/image/slide/slide3.min.png': 'src/image/slide/slide3.png'
                }
            }
        }
    })


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify','imagemin']);
}