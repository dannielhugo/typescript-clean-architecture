const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const debug = require('gulp-debug');
const Cache = require('gulp-file-cache');
const sequence = require('gulp-sequence');
const clean = require('gulp-clean');
const typedoc = require('gulp-typedoc');

const JSON_FILES = ['src/*.json', 'src/**/*.json'];

const tsProject = ts.createProject('tsconfig.json', {
  declaration: true
});

const cache = new Cache();

gulp.task('clean', () => {
  return gulp.src('build', {
      read: false
    })
    .pipe(clean());
});

gulp.task('scripts', ['assets'], () => {
  const tsResult = gulp.src('src/**/*.ts')
    .pipe(cache.filter())
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(cache.cache())
    .pipe(gulp.dest('build'));
});

gulp.task('tslint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report({
      emitError: false,
      allowWarnings: true
    }));
});

gulp.task('assets', ['clean'], () => {
  return gulp.src(JSON_FILES)
    .pipe(gulp.dest('build'));
});

gulp.task("typedoc", () => {
  return gulp
    .src(["src/application/**/*.ts"])
    .pipe(typedoc({
      module: "commonjs",
      target: "es6",
      out: "docs/typedoc/",
      name: "Typescript Clean Architecture"
    }));
});

gulp.task('start', () => {
  const stream = nodemon({
    script: 'build/deliveries/api/index.js',
    ext: 'ts json',
    verbose: true,
    env: {
      'NODE_ENV': 'development',
      'DEBUG': 'app:*',
    },
    delay: 2500,
    watch: 'src/**/*.ts',
    tasks: ['tslint', 'scripts']
  });

  return stream
    .on('crash', () => {
      stream.emit('restart', 2);
    });
});

gulp.task('default', sequence(['tslint', 'scripts'], 'start'));
gulp.task('doc', sequence('tslint', 'typedoc'));
gulp.task('build', sequence(['tslint', 'scripts'], 'typedoc'));