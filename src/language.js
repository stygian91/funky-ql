import Parsimmon from "parsimmon";

import terminals from "./parsers/terminals";
import select from "./parsers/select";
import where from "./parsers/where";
import arithmetic from "./parsers/arithmetic";

export default Parsimmon.createLanguage({
  ...terminals,
  ...select,
  ...arithmetic,
  ...where,
});
