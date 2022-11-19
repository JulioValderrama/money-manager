# TYPESCRIPT

//- Setup Node.js package.json

//- Using the -y flag when creating a package.json will simply approve all the defaults.
npm init -y
npm install typescript --save-dev
npm install @types/node --save-dev

//- Create a tsconfig.json
npx tsc --init --rootDir src --outDir build \ --esModuleInterop --resolveJsonModule --lib es6 \ --module commonjs --allowJs true --noImplicitAny true

//- tsconfig.json
{
  "compilerOptions": {
    "target": "es5",                          
    "module": "commonjs",                    
    "lib": ["es6"],                     
    "allowJs": true,
    "outDir": "build",                          
    "rootDir": "src",
    "strict": true,         
    "noImplicitAny": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
}

npm install --save-dev ts-node nodemon

//- Add a nodemon.json config.
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node ./src/index.ts"
}

//- Let's add a script for that.
"start:dev": "nodemon", //- By running npm run start:dev, nodemon will start our app using ts-node ./src/index.ts, watching for changes to .ts and .js files from within /src.

npm install --save-dev rimraf

//-And then, add this to your package.json
"build": "rimraf ./build && tsc", //-Now, when we run npm run build, rimraf will remove our old build folder before the TypeScript compiler emits new code to dist.
"start": "npm run build && node build/index.js"

Scripts overview
npm run start:dev
Starts the application in development using nodemon and ts-node to do cold reloading.

npm run build
Builds the app at build, cleaning the folder first.

npm run start
Starts the app in production by first building the project with npm run build, and then executing the compiled JavaScript at build/index.js.

ESLINT

npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

//- Create an .eslintrc file.
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}

//- Create an .eslintignore
node_modules
build

//- Adding a lint script
{
  "scripts": {
    ...
    "lint": "eslint . --ext .ts",
  }
}

PRETTIER WITH ESLINT

npm install --save-dev prettier

//- A basic .prettierrc setting is the following
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 100,
  "bracketSpacing": true,
  "endOfLine": "auto",
  "tabWidth": 2
}

{
"scripts": {
  ...
  "prettier": "prettier --config .prettierrc src/**/*.ts --write""
}

//- the settings.JSON file, if it's not already added, add the following lines to the root of the object.

// Default (format when you paste)
"editor.formatOnPaste": true,
// Default (format when you save)
"editor.formatOnSave": true,

npm install --save-dev eslint-config-prettier eslint-plugin-prettier

//- eslint-config-prettier: Turns off all ESLint rules that have the potential to interfere with Prettier rules.
//- eslint-plugin-prettier: Turns Prettier rules into ESLint rules.

JASMINE

npm i --save-dev jasmine
npm i --save-dev jasmine-spec-reporter
npm i --save-dev @types/jasmine
npm i --save-dev supertest
npm i --save-dev @types/supertest
npm i --save-dev eslint-plugin-jasmine


//- Lastly, we need to make an adjustment to the .eslintrc
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "prettier",
    "jasmine"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "env": {
    "node": true,
    "es6": true,
    "jasmine": true
  },
  "ignorePatterns": ['.eslintrc.js', 'tsconfig.json', '.prettierrc', 'package.json', 'package-lock.json', 'assets', 'jasmine.json', '/build'],
  "rules": {
    "@typescript-eslint/no-empty-function": 0,
    "no-console": 0,
    "prettier/prettier": [1, { "endOfLine": "auto" } ],
    "quotes": [ 1, "single", { "avoidEscape": true } ],
    "no-var": 1,
    "prefer-const": 2,
    "no-multiple-empty-lines": 0
  }
}

<str>EXPRESS<str>

npm i express
npm i --save-dev @types/express


  "scripts": {
    "start:dev": "nodemon",
    "build": "rimraf ./build && tsc",
    "start": "npm run build && node build/index.js",
    "jasmine": "jasmine",
    "test": "npm run build && npm run jasmine",
    "lint": "eslint . --ext .ts",
    "prettier": "prettier --config .prettierrc src/**/*.ts --write",
    "prettierLint": "prettier --config .prettierrc src/**/*.ts --write && eslint . --ext .ts --fix"
  },


GIT REPOSITORY

git init

//- Create a .gitignore

