import * as _ from "lodash";

export const isValidName = (name) => /^([A-Za-z$_]{1,})$/g.test(name);

export const fixRefName = (refName: string) => {
  if (!isValidName(refName)) {
    // specific replaces for TSOA 3.x
    if (refName.includes("."))
      refName = refName
        .replace(/Exclude_keyof[A-Za-z]{1,}/g, (match) => "ExcludeKeys")
        .replace(/%22\~AND\~%22/g, "And")
        .replace(/%22\~OR\~%22/g, "Or")
        .replace(/(\.?%22)|\./g, "_")
        .replace(/__+$/, "");

    if (refName.includes("-")) refName = _.startCase(refName).replace(/ /g, "");
  }

  return refName;
};
