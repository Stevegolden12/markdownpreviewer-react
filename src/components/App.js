import React, { Component } from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
import '../App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: "# Header (h1) \n## Subheader (h2)\n[Yahoo](https//www.yahoo.com)\n\n\I like to italicize <i>HTML tags<i>\n```\nThis is what inline code looks like```\n\n---\n\n`<code></code>`\n\n> Not sure I am a fan of this blockquotes\n\n![image](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)\n\nBe **Bold**!\n\n1. Be bold\n\n2. See rule 1\n\n* Repeat rule 2",
      preview: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      editor: event.target.value,
      preview: DOMPurify.sanitize(marked(this.state.editor))
    })
  }


  componentDidMount() {
    this.setState({
      preview: marked(this.state.editor)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.editor)
    if (this.state.preview !== marked(this.state.editor)) {
      this.setState({
        preview: marked(this.state.editor)
      })
    }
  }



  render() {
    return (
      <div>
        <h1 class="index__title">Markdown previewer</h1>
        <div id="editorWrapper">
          <div id="editorHead"><i class="fa fa-edit"></i> Editor</div>
          <textarea id="editor" onChange={this.handleChange}>{this.state.editor}</textarea>
        </div>
        <code id="previewWrapper">
          <div id="editorHead"><i class="fa fa-eye"></i>  Previewer</div>
          <div id="preview" dangerouslySetInnerHTML={{ __html: this.state.preview }}></div>
        </code>
      </div>
    );
  }
}

export default App;
