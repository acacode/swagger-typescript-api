
const checkAndRenameModelName = name => {

  if (!/^([A-Za-z$_]{1,})$/g.test(name)) {
    // specific replaces for TSOA 3.x

    if (name.includes('.'))
      name = name
        .replace(/Exclude_keyof[A-Za-z]{1,}/g, match => 'ExcludeKeys')
        .replace(/%22\~AND\~%22/g, 'And')
        .replace(/%22\~OR\~%22/g, 'Or')
        .replace(/(\.?%22)|\./g, '_')
        .replace(/__+$/, '');
  }

  return name;
}

module.exports = {
  checkAndRenameModelName
}