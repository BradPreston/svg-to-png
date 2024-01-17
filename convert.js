import fs from 'fs';
import sharp from "sharp";

/**
 * Converts all SVGs in a directory and outputs them as PNGs in a new target directory
 * @param {string} from SVG directory
 * @param {string} to target PNG directory
 * @param {number} size width of new PNG (square aspect ratio)
 */
export default function convert(from, to, size) {
  // read the files from the SVG directory
  const files = fs.readdirSync(from);
  // loop over each file
  for (const file of files) {
    // grab the name of the file for the PNG directory
    const [name] = file.split(".");
    // convert the file to PNG and place it in the target directory
    sharp(`${from}/${file}`)
      // keep the image below 50px
      .resize({
        width: size,
        height: size,
        fit: 'inside'
      })
      .toFile(`${to}/${name}.png`, function(err) {
        if (!err) return;
        throw Error(err.message)
      });
    console.log("Complete!");
  }
}

