# Cookie

Cookie 的获取与设置，自动为 cookie 添加前缀，区分其他类型的 cookie

## Install

```js
npm install yma-cookie
```

## Usage

```js
import cookie from 'yma-cookie';

cookie.setOptions({
    path: '/', // 域
});

cookie.setConfig({
    ns: 'yma', // key 前缀
    raw: false, // key 使用原始字符
    json: true, // value 使用 JSONString
});

const uuid = cookie.get('uuid'); // 获取 key 为 yma_uuid 的 value 值
```

```js
import Cookie from 'yma-cookie';

const cookie = Cookie.create(config, options); // 创建新的 cookie 对象
```
