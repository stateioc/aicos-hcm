// SPACE-AICOS is pleased to support the open source community by making
// SPACE-AICOS available.
// Copyright (C) 2026 China Academy of Information and Communications Technology (CAICT).
// All rights reserved.
// Licensed under the MIT License (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://opensource.org/licenses/MIT
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on
// an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.homepage %> */\n'
        },
        unwrap: {
            options: {
                base: './src',
                globalBase: './src/global_modules',
                name: 'dialog',
                namespace: 'window',
                banner: '<%= meta.banner %>'
            },
            'dialog.js': {
                src: './src/dialog.js',
                dest: './dist/dialog.js'
            },
            'dialog-plus.js': {
                src: './src/dialog-plus.js',
                dest: './dist/dialog-plus.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            'dialog.js': {
                src: './dist/dialog.js',
                dest: './dist/dialog-min.js'
            },
            'dialog-plus.js': {
                src: './dist/dialog-plus.js',
                dest: './dist/dialog-plus-min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-unwrap');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['unwrap', 'uglify']);

};