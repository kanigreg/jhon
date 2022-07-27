import * as fs from 'node:fs/promises';
import { existsSync } from 'node:fs';

import ttf2woff2 from 'gulp-ttf2woff2';
import ttfToWoff from 'gulp-ttf2woff';

export const ttf2woff = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(ttfToWoff())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {}))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

const weightMap = {
  thin: 100,
  extralight: 200,
  light: 300,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

export const fontsStyle = async () => {
  if(existsSync(app.path.src.fontsFile)) {
    console.info('File \x1b[32m%s\x1b[0m is exist. Remove it to reload', app.path.src.fontsFile);
    return await Promise.resolve();
  }
  const files = await fs.readdir(app.path.build.fonts)
    .catch(({ message }) => {
      console.warn(message);
      return [];
    });
  const tasks = files.map((fontsFile) => {
    const [fontFileName, ..._rest] = fontsFile.split('.')
    const [fontName, fontWeightStr, ..._] = fontFileName.split('-');
    console.log([fontName, fontWeightStr].toString());
    const fontWeight = weightMap[fontWeightStr.toLowerCase()] || 400;

    const fontScssData = `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`;

    return fs.appendFile(app.path.src.fontsFile, fontScssData);
  });

  return await Promise.all(tasks);
}
