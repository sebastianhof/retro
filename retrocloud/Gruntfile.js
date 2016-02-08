module.exports = function (grunt) {

    grunt.initConfig({
        ts: {
            server: {
                src: [
                    'server/index.ts',
                    'server/actions/*.ts',
                    'server/devices/*.ts',
                    'server/devices/lib/*.ts',
                    'server/reducers/*.ts',
                    'server/stores/*.ts',
                    'server/models/*ts'
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
    grunt.registerTask('buildserver', ['ts:server']);

};