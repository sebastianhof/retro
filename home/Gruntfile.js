module.exports = function (grunt) {

    grunt.initConfig({
        ts: {
            default: {
                src: [
                    'server/index.ts',
                    'server/api/*.ts',
                    'server/datastores/*.ts',
                    'server/devices/*.ts',
                    'server/lib/*.ts',
                    'server/models/*.ts',
                    'server/retro/*.ts'
                ],
                options: {
                    module: 'commonjs',
                    sourceMap: false,
                    declaration: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('buildserver', ['ts']);

};