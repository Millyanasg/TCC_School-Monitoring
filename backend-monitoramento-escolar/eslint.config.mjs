import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import _import from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/.eslintrc.js"],
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
)), {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        prettier: fixupPluginRules(prettier),
        import: fixupPluginRules(_import),
        "unused-imports": unusedImports,
    },

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },

        parser: tsParser,
        ecmaVersion: 2021,
        sourceType: "module",

        parserOptions: {
            parser: "@typescript-eslint/parser",
            project: "./tsconfig.json",
            tsconfigRootDir: "./",
        },
    },

    settings: {
        "import/resolver": {
            typescript: {
                project: "./tsconfig.json",
            },

            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                moduleDirectory: ["node_modules", "src/"],
            },
        },
    },

    rules: {
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",

        "@/lines-between-class-members": ["warn", "always", {
            exceptAfterSingleLine: true,
        }],

        "padding-line-between-statements": "off",

        "@/padding-line-between-statements": ["warn", {
            blankLine: "any",
            prev: "import",
            next: "*",
        }, {
                blankLine: "any",
                prev: "*",
                next: "singleline-const",
            }, {
                blankLine: "any",
                prev: "*",
                next: "singleline-let",
            }, {
                blankLine: "any",
                prev: "*",
                next: "singleline-var",
            }, {
                blankLine: "always",
                prev: "*",
                next: "block-like",
            }, {
                blankLine: "always",
                prev: "*",
                next: "multiline-block-like",
            }, {
                blankLine: "always",
                prev: "*",
                next: "multiline-expression",
            }, {
                blankLine: "always",
                prev: "*",
                next: "multiline-const",
            }, {
                blankLine: "always",
                prev: "*",
                next: "multiline-let",
            }, {
                blankLine: "always",
                prev: "*",
                next: "multiline-var",
            }, {
                blankLine: "always",
                prev: "*",
                next: "export",
            }, {
                blankLine: "always",
                prev: "block-like",
                next: "*",
            }, {
                blankLine: "always",
                prev: "multiline-block-like",
                next: "*",
            }, {
                blankLine: "always",
                prev: "multiline-expression",
                next: "*",
            }, {
                blankLine: "always",
                prev: "multiline-const",
                next: "*",
            }, {
                blankLine: "always",
                prev: "multiline-let",
                next: "*",
            }, {
                blankLine: "always",
                prev: "multiline-var",
                next: "*",
            }],

        "prettier/prettier": ["warn", {
            endOfLine: "auto",
            trailingComma: "all",
        }],

        "unused-imports/no-unused-imports": "warn",

        "sort-imports": ["warn", {
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
            allowSeparatedGroups: false,
        }],

        "import/no-unresolved": "error",
        "import/newline-after-import": "warn",

        "import/order": ["warn", {
            groups: [
                "builtin",
                "external",
                "internal",
                ["sibling", "parent"],
                "index",
                "unknown",
            ],

            "newlines-between": "always",

            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },
        }],
    },
}];