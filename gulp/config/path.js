import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    scss: `${srcFolder}/scss/style.scss`,
    fontsFile: `${srcFolder}/scss/fonts.scss`,
    html: `${srcFolder}/*.html`,
    images: `${srcFolder}/img/*.{jpg png jpeg gif webp svg}`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/img/*.{jpg png jpeg gif webp svg}`,
  },
  clean: buildFolder,
  buildFolder,
  srcFolder,
  rootFolder,
};
