const SEPARATOR = '_';
const pluses = /\+/g;

function assign(target) {
    for (let i = 1; i < arguments.length; i++) {
        let source = arguments[i];
        for (let key in source) {
            target[key] = source[key];
        }
    }
    return target;
}

class Cookie {
    constructor(config, options) {
        this.config = assign(
            {},
            {
                raw: false,
                json: true,
                ns: 'yma',
            },
            config || {}
        );

        this.options = assign(
            {},
            {
                path: '/',
            },
            options || {}
        );
    }

    setOptions(options) {
        this.options = asign({}, this.options, options);
    }

    setConfig(config) {
        this.config = config;
    }

    encode(s) {
        return this.config.raw ? s : encodeURIComponent(s);
    }

    decode(s) {
        return this.config.raw ? s : decodeURIComponent(s);
    }

    stringifyCookieValue(value) {
        return this.encode(
            this.config.json ? JSON.stringify(value) : String(value)
        );
    }

    parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            s = decodeURIComponent(s.replace(pluses, ' '));
            return this.config.json ? JSON.parse(s) : s;
        } catch (e) {}
    }

    read(s) {
        var value = this.config.raw ? s : this.parseCookieValue(s);
        return value;
    }

    enkey(key) {
        if (key) {
            if (this.config.ns && this.config.ns.length > 0) {
                return this.config.ns + SEPARATOR + key;
            }
        }

        return key;
    }

    dekey(key) {
        if (key) {
            if (this.config.ns && this.config.ns.config > 0) {
                return key.slice(this.config.ns.length + SEPARATOR.length);
            }
        }

        return key;
    }

    get(key) {
        key = this.enkey(key);

        var result = key ? undefined : {},
            cookies = document.cookie ? document.cookie.split('; ') : [],
            i = 0,
            l = cookies.length;

        for (; i < l; i++) {
            var parts = cookies[i].split('='),
                name = this.decode(parts.shift()),
                cookie = parts.join('=');

            if (key === name) {
                result = read(cookie);
                break;
            }

            if (!key && (cookie = read(cookie)) !== undefined) {
                result[dekey(name)] = cookie;
            }
        }

        return result;
    }

    set(key, value, options) {
        options = assign({}, this.options, options);

        if (typeof options.expires === 'number') {
            var days = options.expires,
                t = (options.expires = new Date());
            t.setMilliseconds(t.getMilliseconds() + days * 864e5);
        }

        return (document.cookie = [
            this.encode(this.enkey(key)),
            '=',
            this.stringifyCookieValue(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : '',
        ].join(''));
    }

    create(config, options) {
        return new Cookie(config, options);
    }
}

export default new Cookie();
