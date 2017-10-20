# ah-mongo-plugin

ActionHero.js initializer plugin. It allows to connection to MongoDB using mongoose.js and its schemes/models.

## Installation

* To install

```bash
npm i ah-mongo-plugin --save
```

* Configure it in `config/mongo.js`

* Make it enabled in `config/plugin.js` of your AH project

```bash
exports['default'] = {
  plugins: (api) => {
    return {
      'ah-mongo-plugin': {
        path: path.join(api.projectRoot , 'node_modules', 'ah-mongo-plugin'),
        initializers: true
      }
    }
  }
}
```
