// TODO
class Language {
    init() {
        cc.log("bb.Language.init", cc.sys.languageCode);
        // const i18n = require('LanguageData');
        var code = cc.sys.languageCode;
        //至少需要提供en一种
        if (!this.exist(code)) {
            if (code.indexOf('tw') >= 0) {
                if (this.exist('zh-tw')) {
                    code = 'zh-tw';
                } else {
                    code = 'en';
                }
            }
            else if (code.indexOf('zh') >= 0) {
                if (this.exist('zh-cn')) {
                    code = 'zh-cn';
                } else if (this.exist('zh')) {
                    code = 'zh';
                } else {
                    code = 'en';
                }
            } else {
                code = 'en';
            }
        }
        // i18n.init(code);
    };
    exist(code: string) {
        return false;
        // return window.i18n.languages[code]
    }
}

export default new Language;