import sharp from 'sharp';
import path from 'path';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log('Creating thumbnail for:', req.file.path);

  try {
    const uploads = path.join('uploads');
    const originalPath = req.file.path;
    const extension = path.extname(req.file.filename);
    const name = path.basename(req.file.filename, extension);
    const thumbnailPath = path.join(uploads, `${name}_thumb.png`);

    await sharp(originalPath)
      .resize(160, 160, {
        fit: 'cover',
        position: 'center',
      })
      .png()
      .toFile(thumbnailPath);

    console.log('Thumbnail created:', thumbnailPath);
    next();
  } catch (error) {
    console.error('Error creating thumbnail: ', error);
    next(error);
  }
};

export {createThumbnail};
