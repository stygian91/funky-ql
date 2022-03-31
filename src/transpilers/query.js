import where from "./where";

const query = (ast) => {
  const whereAst = ast.where;

  if (whereAst) {
    const whereCode = where(whereAst);
    console.log(whereCode);
  }

};

export default query;
