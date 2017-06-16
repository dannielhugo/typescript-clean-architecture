const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const debug = require('gulp-debug');

const JSON_FILES = ['src/*.json', 'src/**/*.json'];

const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('tslint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report());
});

gulp.task('watch', ['scripts'], () => {
  return gulp.watch('src/**/*.ts', ['tslint', 'scripts']);
});

gulp.task('assets', function () {
  return gulp.src(JSON_FILES)
    .pipe(gulp.dest('dist'));
});

gulp.task('start', ['scripts', 'assets'], function () {
  nodemon({
    script: 'dist/delivery/api/index.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development',
      'DEBUG': 'app:*'
    }
  });
});

gulp.task('default', ['watch', 'tslint', 'assets', 'start']);
