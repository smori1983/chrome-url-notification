# Chrome URL Notification


[![Build Status](https://travis-ci.org/smori1983/chrome-url-notification.svg?branch=master)](https://travis-ci.org/smori1983/chrome-url-notification)
[![codecov](https://codecov.io/gh/smori1983/chrome-url-notification/branch/master/graph/badge.svg)](https://codecov.io/gh/smori1983/chrome-url-notification)

---------

![add](https://raw.githubusercontent.com/smori1983/chrome-url-notification/images/add.png)

![list](https://raw.githubusercontent.com/smori1983/chrome-url-notification/images/list.png)


## 主な用途

ウェブサービス開発のお供に。


## 使用方法

URLのパターンと表示したいメッセージを登録します。

`https://*.example.com/` のように、`*` を使用できます。

- 閲覧中のURLが登録されたパターンにマッチすると、メッセージが表示されます。
- 表示位置は上部または下部を選択可能。


## TODO

`position: fixed` な要素が既に存在するページとは相性が悪い。
