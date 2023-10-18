# CHANGELOG


## v7.0.0

### Features

- Update for Chrome Extensions manifest V3 ([#97](https://github.com/smori1983/chrome-url-notification/pull/97))


## v6.4.0

### Features

- `bootstrap` (`v4.6`) ([#63](https://github.com/smori1983/chrome-url-notification/pull/63))
- `bootstrap-colorpicker` (`v3.4`) ([#63](https://github.com/smori1983/chrome-url-notification/pull/63))


## v6.3.0

### Features

- Introduce `joi` ([#73](https://github.com/smori1983/chrome-url-notification/pull/73))
- Remove `jquery-validation` ([#73](https://github.com/smori1983/chrome-url-notification/pull/73))

### Development

- Overall update for tests using `jsdom`


## v6.2.0

### Development

- Introduce `webpack`


## v6.1.0

### Development

- Refactoring
- Update dependent packages


## v6.0.2

### Bug Fixes

- Fix margin update code of top and bottom cases in display position ([#38](https://github.com/smori1983/chrome-url-notification/pull/38))


## v6.0.1

### Bug Fixes

- Prevent duplicate open of modal form ([#31](https://github.com/smori1983/chrome-url-notification/pull/31))


## v6.0.0

### Features

- Support additional choices for message display position ([#24](https://github.com/smori1983/chrome-url-notification/pull/24))


## v5.4.0

### Development

- Reimplement app codes
  - popup


## v5.3.0

### Development

- Reimplement options page


## v5.2.0

### Development

- Reimplement app codes
  - background
  - content
  - popup
- Introduce `jsdom`
- Introduce `sinon-chrome`
- Update `gulp` tasks
- Remove compiled files from source management


## v5.1.0

### Features

- Toggle message area of matched page in conjunction with the browser action
- Show badge text based on current status of pattern


## v5.0.0

### Features

- Introduce browser action
  - Show status change menu for pattern matched pages
  - Show link to options page for all pages


## v4.1.0

### Development

- Improve migration
- Improve storage
- Improve validation


## v4.0.0

### Features

- Introduce 'status' field for each pattern
  - User can disable pattern temporarily

### Development

- Introduce `istanbul`
- Introduce `codecov`


## v3.3.0

### Features

- Show 'display position' in pattern list
- The id attribute of DOM element injected by `content.js` become more conflict free


## v3.2.0

### Development

- Change test framework to `mocha`
- Introduce Travis CI


## v3.1.0

### Development

- Refactoring
- Use jquery validation
- Fix jsonschema build code for data import


## v3.0.1

### Development

- Fix import json validation


## v3.0.0

### Features

- i18n
  - en
  - ja


## v2.3.0

### Development

- Update `jquery`
- Update `jquery-validation`
- Update `qunit`
- Update `bootstrap`
- Update `bootstrap-colorpicker`
- Update `clipboard`


## v2.2.0

### Development

- Add icons
- Add JSDoc comments
- Refactoring


## v2.1.0

### Development

- Update version constraints of `package.json`
- Update `gulp` (`v4`)
- Update `eslint` rules


## v2.0.0

### Features

- User can select the position of notification bar (top or bottom)


## v1.0.0

- Initial release
