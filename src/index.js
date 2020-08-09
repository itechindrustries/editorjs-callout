/**
 * Build styles
 */
require('./index.css').toString();

/**
 * CodeTool for Editor.js
 *
 * @author CodeX (team@ifmo.su)
 * @copyright CodeX 2018
 * @license MIT
 * @version 2.0.0
 */

/* global PasteEvent */

/**
 * Code Tool for the Editor.js allows to include code examples in your articles.
 */
class CalloutTool {
  /**
   * Allow to press Enter inside the CodeTool textarea
   *
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * @typedef {object} CodeData — plugin saved data
   * @property {string} code - previously saved plugin code
   */

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {object} options - tool constricting options
   * @param {CodeData} options.data — previously saved plugin code
   * @param {object} options.config - user config for Tool
   * @param {object} options.api - Editor.js API
   */
  constructor({ data, config, api }) {
    this.api = api;

    this.placeholder = this.api.i18n.t(config.placeholder || CalloutTool.DEFAULT_PLACEHOLDER);

    this.CSS = {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      wrapper: 'ce-code',
      textarea: 'ce-code__prewrapper',
      emoji: 'ce-code__div'
    };

    this.nodes = {
      holder: null,
      textarea: null,
    };

    this.data = {
      code: data.code || '',
    };

    this.nodes.holder = this.drawView();
  }

  /**
   * Create Tool's view
   *
   * @returns {HTMLElement}
   * @private
   */
  drawView() {
    const wrapper = document.createElement('div'),
    textarea = document.createElement('pre');
    const emoji = document.createElement('div');
    const emojiwrapper = document.createElement('div');

    wrapper.classList.add(this.CSS.baseClass, this.CSS.wrapper);
    emojiwrapper.classList.add(this.CSS.textarea, this.CSS.input);
    emoji.classList.add(this.CSS.emoji);
    textarea.innerHTML = this.data.code;
    emoji.innerText = "💡"

    textarea.contentEditable = 'true';
    textarea.spellcheck = false;
    textarea.autocomplete="off";
    textarea.autocorrect="off";
    textarea.autocapitalize="off";
    textarea.dataset.placeholder = this.placeholder;

    // Tab Feature
    textarea.addEventListener("keydown", (e)=>{
      if(e.which === 9){
        var range = window.getSelection().getRangeAt(0); 
        var caretPosition= range.endOffset; 
  
        var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0"); 
        range.insertNode(tabNode); 
  
        range.setStartAfter(tabNode); 
        range.setEndAfter(tabNode);  
        e.preventDefault();
        e.stopPropagation();
      }
    })
    
    emojiwrapper.appendChild(emoji);
    emojiwrapper.appendChild(textarea);
    wrapper.appendChild(emojiwrapper);

    this.nodes.textarea = textarea;

    return wrapper;
  }

  /**
   * Return Tool's view
   *
   * @returns {HTMLDivElement} this.nodes.holder - Code's wrapper
   * @public
   */
  render() {
    return this.nodes.holder;
  }

  /**
   * Extract Tool's data from the view
   *
   * @param {HTMLDivElement} codeWrapper - CodeTool's wrapper, containing textarea with code
   * @returns {CodeData} - saved plugin code
   * @public
   */
  save(codeWrapper) {
    return {
      code: codeWrapper.querySelector('pre').innerHTML,
    };
  }

  /**
   * onPaste callback fired from Editor`s core
   *
   * @param {PasteEvent} event - event with pasted content
   */
  onPaste(event) {
    const content = event.detail.data;

    this.data = {
      code: content.textContent,
    };
  }

  /**
   * Returns Tool`s data from private property
   *
   * @returns {CodeData}
   */
  get data() {
    return this._data;
  }

  /**
   * Set Tool`s data to private property and update view
   *
   * @param {CodeData} data - saved tool data
   */
  set data(data) {
    this._data = data;

    if (this.nodes.textarea) {
      this.nodes.textarea.innerHTML = data.code;
    }
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30" style=" fill:currentColor;" width="20" height="20"><path d="M 15 0 C 13.35499 0 12 1.3549904 12 3 L 8 3 C 6.3550302 3 5 4.3550302 5 6 L 5 24 C 5 25.64497 6.3550302 27 8 27 L 22 27 C 23.64497 27 25 25.64497 25 24 L 25 6 C 25 4.3550302 23.64497 3 22 3 L 18 3 C 18 1.3549904 16.64501 0 15 0 z M 15 2 C 15.564129 2 16 2.4358706 16 3 C 16 3.5641294 15.564129 4 15 4 C 14.435871 4 14 3.5641294 14 3 C 14 2.4358706 14.435871 2 15 2 z M 8 5 L 12 5 L 12 6 C 12 6.552 12.448 7 13 7 L 17 7 C 17.552 7 18 6.552 18 6 L 18 5 L 22 5 C 22.56503 5 23 5.4349698 23 6 L 23 24 C 23 24.56503 22.56503 25 22 25 L 8 25 C 7.4349698 25 7 24.56503 7 24 L 7 6 C 7 5.4349698 7.4349698 5 8 5 z M 13.859375 10 L 14.046875 17 L 15.953125 17 L 16.140625 10 L 13.859375 10 z M 15.003906 19.373047 C 14.117906 19.373047 13.589844 19.846297 13.589844 20.654297 C 13.589844 21.447297 14.117906 21.919922 15.003906 21.919922 C 15.882906 21.919922 16.412109 21.448297 16.412109 20.654297 C 16.412109 19.846297 15.882906 19.373047 15.003906 19.373047 z"></path></svg>',
      title: 'Callout',
    };
  }

  /**
   * Default placeholder for CodeTool's textarea
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_PLACEHOLDER() {
    return 'Enter Your Callout!';
  }

  /**
   *  Used by Editor.js paste handling API.
   *  Provides configuration to handle CODE tag.
   *
   * @static
   * @returns {{tags: string[]}}
   */
  static get pasteConfig() {
    return {
      tags: [ 'pre' ],
    };
  }

  /**
   * Automatic sanitize config
   *
   * @returns {{code: boolean}}
   */
  static get sanitize() {
    return {
      code: true, // Allow HTML tags
    };
  }
}

module.exports = CalloutTool;
