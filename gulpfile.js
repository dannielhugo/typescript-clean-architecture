const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const debug = require('gulp-debug');
const Cache = require('gulp-file-cache');
const sequence = require('gulp-sequence');

const JSON_FILES = ['src/*.json', 'src/**/*.json'];

const tsProject = ts.createProject('tsconfig.json', {
  declaration: true
});

const cache = new Cache();

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
    .pipe(tslint.report());
});

gulp.task('assets', function () {
  return gulp.src(JSON_FILES)
    .pipe(gulp.dest('build'));
});

gulp.task('start', function () {
  const stream = nodemon({
    script: 'build/delivery/api/index.js',
    ext: 'ts json',
    verbose: true,
    env: {
      'NODE_ENV': 'development',
      'DEBUG': 'app:*',
    },
    delay: 2500,
    watch: 'src/**/*.ts',
    tasks: ['tslint', 'assets', 'scripts']
  });

  return stream
    .on('crash', () => {
      stream.emit('restart', 2);
    });
});

gulp.task('default', sequence(['tslint', 'scripts'], 'start'));