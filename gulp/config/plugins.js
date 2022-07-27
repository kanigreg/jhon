import replace from "gulp-replace";
import browserSync from 'browser-sync';
import newer from "gulp-newer";
import ifPlugin from 'gulp-if';

export const plugins = {
  replace,
  browserSync,
  newer,
  if: ifPlugin,
}
