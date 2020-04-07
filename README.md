# ✨ Event Sourcing Generator  
Create common class structures needed in the event-sourcing-nestjs package https://www.npmjs.com/package/event-sourcing-nestjs

[![](https://badgen.net/npm/v/event-sourcing-generator)](https://www.npmjs.com/package/event-sourcing-generator) ![](https://badgen.net/npm/license/event-sourcing-generator) ![](https://badgen.net/bundlephobia/min/event-sourcing-generator) ![](https://badgen.net/npm/dt/event-sourcing-generator) ![Schematics CI](https://github.com/ArkerLabs/event-sourcing-generator/workflows/Schematics%20CI/badge.svg) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


## ⭐️ Install
```
$ npm install -g event-sourcing-generator
```

## 📖 Basic Usage
Open your favorite bash tool and type:
```
es-generator
```

The help will inmediately popup to guide you in the generation process.

The avaliable stuctures to generate are:
- Event: Generates the event and optionally the handler and the updater.
- Command: Generates the command and its handler.
- Querry: Generates the query and its handler.


## 🛠 Configure the CLI
The following bash command  will show you the avaliable settings to configure.

```
es-generator config
```

To configure one of the settings just type: 
```
es-generator config <setting>
```

To view the config type:
```
es-generator config list
```


## 🧪 Tests
```
npm run test
```


## 🏦 Build with
- Nodejs 10

## 🤝 Contributing
Pull requests are the greatest contributions, so be sure they are focused in scope, and do avoid unrelated commits.

- Fork it!
- Clone your fork: git clone https://github.com/<your-username>/repo-name
- Navigate to the newly cloned directory: cd repo-name
- Create a new branch for the new feature: git checkout -b my-new-feature
- Install the tools necessary for development: npm install
- Make your changes.
- Commit your changes, make sure you follow the conventional commit standard https://www.conventionalcommits.org/en/v1.0.0/. 
- For constructing commits with the specified needs we recommend the git-cz package. https://www.npmjs.com/package/git-cz.
- Push to the branch: git push origin my-new-feature
- Submit a pull request with full remarks documenting your changes.


## 📝 Author  
ArkerLabs


## ‎‍⚖️ License  
This project is licensed under the  MIT License - see the LICENSE.md file for details
