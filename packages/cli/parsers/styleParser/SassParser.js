"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StyleParser_1 = __importDefault(require("./StyleParser"));
const index_1 = require("../../consts/index");
const calculateAlias = require('../../packages/utils/calculateAlias');
class SassParser extends StyleParser_1.default {
    constructor(props) {
        super(props);
        this._postcssPlugins = this._postcssPlugins.concat([
            require('postcss-import')({
                resolve: function (importer, baseDir) {
                    if (!/\.s[ca]ss$/.test(importer)) {
                        importer = importer + '.scss';
                    }
                    return calculateAlias(props.filepath, importer);
                },
                plugins: this.platform !== 'h5' ? [
                    require('../../packages/postcssPlugins/postCssPluginRemoveRules')
                ] : []
            }),
            require('@csstools/postcss-sass'),
            ...this.platform !== 'h5' ? [
                require('../../packages/postcssPlugins/postCssPluginAddImport')({
                    extName: index_1.MAP[this.platform]['EXT_NAME'][this.type],
                    type: this.type
                }),
            ] : [
                require('../../packages/postcssPlugins/postCssPluginRpxToRem'),
                require('../../packages/postcssPlugins/postCssPluginAddStyleHash')
            ],
            require('../../packages/postcssPlugins/postCssPluginFixNumber'),
            require('../../packages/postcssPlugins/postCssPluginValidateStyle'),
            require('../../packages/postcssPlugins/postCssPluginTransformKeyFrames'),
            require('../../packages/postcssPlugins/postCssPluginRemoveComments')
        ]);
        this._postcssOptions = {
            from: this.filepath,
            syntax: require('postcss-scss')
        };
    }
}
exports.default = SassParser;
