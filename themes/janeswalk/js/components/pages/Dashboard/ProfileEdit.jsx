export default ({ edit: { valt, action, fields } }) => (
  <div className="profileEdit">
    <form method="post" action={action} id="profile-edit-form" encType="multipart/form-data">
      <input type="hidden" name="ccm_token" value={valt} />
      <fieldset dangerouslySetInnerHTML={{ __html: fields.join('') }} />
      <input type="submit" className="btn ccm-input-submit" id="save" name="save" value="Save" />
    </form>
  </div>
);
