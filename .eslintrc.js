const path = require("path");
const typescriptEslintRecommended = require("@typescript-eslint/eslint-plugin").configs.recommended;

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ["react", "react-hooks"],
  extends: ["eslint-config-ali/react"],
  parser: "@babel/eslint-parser",
  globals: {
    Atomics: "readonly",
    window: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
    },
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    quotes: [1, "double"], //引号类型 `` "" ''
    semi: 2, // 语句强制分号结尾
    "prefer-const": 0,
    "prefer-promise-reject-errors": 0,
    eqeqeq: "off",
    radix: "off",
    "no-unused-vars": "off",
    "spaced-comment": "off",
    "no-nested-ternary": "off",
    "no-const-assign": 2, //禁止修改const声明的变量
    "no-dupe-keys": 2, //在创建对象字面量时不允许键重复
    "no-duplicate-case": 2, //switch中的case标签不能重复
    "no-dupe-args": 2, //函数参数不能重复
    "no-func-assign": 2, //禁止重复的函数声明
    "no-redeclare": 2, //禁止重复声明变量
    "no-undef": 2, //不能有未定义的变量
    "no-console": "off",
    "react/no-array-index-key": "off",
    "no-param-reassign": "off",
    "no-useless-constructor": 0,
    "react/jsx-uses-react": "off",
    "react/no-danger": 0, //防止使用危险的JSX属性
    "react/no-multi-comp": 2, //防止每个文件有多个组件定义
    "react/no-unknown-property": 2, //防止使用未知的DOM属性
    "react/self-closing-comp": "off",
    "react/react-in-jsx-scope": 2, //使用JSX时防止丢失React
    "react/no-unused-state": 0,
    "react/no-typos": 0,
    "react/prop-types": 0,
    "react/no-access-state-in-setstate": "off",
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "prefer-rest-params": "off",
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "import/newline-after-import": 0,
    "no-case-declarations": "off",
    "no-unreachable": 1, //不能有无法执行的代码
    "max-len": "off",
    "guard-for-in": 0,
  },
  settings: {
    "import/ignore": ["node_modules"],
    "import/resolver": {
      webpack: {
        config: path.join(__dirname, "./config/webpack.base.js"),
      },
    },
  },
  overrides: [
    {
      files: ["src/**/*.ts", "src/**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        project: "./tsconfig.json",
      },
      plugins: ["@typescript-eslint"],
      rules: Object.assign(typescriptEslintRecommended.rules, {
        // other customize rules
        "@typescript-eslint/no-explicit-any": "off",
      }),
    },
  ],
};
