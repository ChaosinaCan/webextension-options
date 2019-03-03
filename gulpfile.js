const gulp = require('gulp');

const paths = {
    styles: [
        'src/styles/**/*.css',
        'src/styles/**/*.svg',
    ],
};

gulp.task('styles', () => {
    return gulp.src(paths.styles)
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('default', gulp.series('styles'));

gulp.task('watch', gulp.series('default', function() {
    gulp.watch(paths.styles, gulp.series('styles'));
}));
