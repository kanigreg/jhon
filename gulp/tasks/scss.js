import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import autoPrefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(app.plugins.if (app.isBuild, groupCssMediaQueries()))
    .pipe(
      app.plugins.if (
        app.isBuild,
        autoPrefixer({
          grid: true,
          overrideBrowserList: ['last 3 versions'],
          cascade: true,
        })
      )
    )
    .pipe(app.plugins.if (app.isBuild, cleanCss()))
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream())
}
