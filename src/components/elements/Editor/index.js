import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        editorStyle={{
          border: '1px solid silver',
          paddingLeft: 5,
          fontSize: 12,
          borderRadius: 5,
          minHeight: 150,
        }}
        onEditorStateChange={this.onEditorStateChange}
        placeholder='Start Typing ...'
      />
    );
  }
}

export default ControlledEditor;
