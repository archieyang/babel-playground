import babel from "@babel/core";
import * as t from "@babel/types";

const output = babel.transformFileSync("View.jsx", {
  sourceType: "module",
  ast: true,
  plugins: [
    "@babel/plugin-syntax-jsx",
    function myCustomPlugin() {
      return {
        visitor: {
          JSXExpressionContainer(path) {
            const parentNode = path.parentPath.node;
            
            if (
              parentNode &&
              parentNode.openingElement &&
              parentNode.openingElement.name &&
              (parentNode.openingElement.name.name === "h1" ||
                parentNode.openingElement.name.name === "p")
            ) {
              let prev = t.cloneNode(path.node.expression, true);

              for (let i = 0; i < 9; i++) {
                const newNode = t.cloneNode(path.node.expression, true);
                prev = t.binaryExpression("+", prev, newNode);
              }

              path.node.expression = prev;
              path.skip();
            }

          },
        },
      };
    },
  ],
});

console.log(JSON.stringify(output.code));