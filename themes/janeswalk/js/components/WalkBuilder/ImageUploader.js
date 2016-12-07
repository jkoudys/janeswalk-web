/**
 * ImageUploader
 *
 * You can upload your images with it.
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { createElement as ce, Component } from 'react';
/*
      handleUpload: (e) => {
        const body = new FormData();

        if (e.currentTarget.files) {
          // TODO: Update to support uploading multiple files at once
          // TODO: display a spinner w/ the local file as the BG until
          // TODO: Move to flux
          // Load one file
          body.append('Filedata', e.currentTarget.files[0]);

          // Form validation token, generated by concrete5
          body.append('ccm_token', this.props.valt);

          fetch(`${CCM_TOOLS_PATH}/files/importers/quick`, {
            method: 'POST',
            credentials: 'include',
            body,
          })
          .then(res => res.json())
          .then(data => {
              const thumbnails = this.props.valueLink.value;
              thumbnails.push(data);
              this.props.valueLink.requestChange(thumbnails);
          })
          .catch(({ message }) => console.err(`Error uploading image: ${message}`));
        }
      },
*/
const ImageUploader = () => (
  ce('p', {}, 'Image uploader.')
);

export default ImageUploader;