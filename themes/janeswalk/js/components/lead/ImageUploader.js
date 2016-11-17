/**
 * ImageUploader
 *
 * You can upload your images with it.
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
const { createElement: ce } = React;

const ImageUploader = () => (
  ce('p', {}, 'Image uploader.')
);

export default ImageUploader;
