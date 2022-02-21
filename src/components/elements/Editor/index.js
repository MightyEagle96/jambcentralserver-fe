import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

class ControlledEditor extends Component {
  state = {
    editorState: undefined,
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          wrapperClassName='demo-wrapper'
          editorClassName='demo-editor'
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

// class ControlledEditor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editorState: EditorState.createEmpty(),
//     };
//   }

//   onEditorStateChange = (editorState) => {
//     this.setState({
//       editorState,
//     });
//   };

//   render() {
//     const { editorState } = this.state;
//     return (
//       <Editor
//         editorState={editorState}
//         wrapperClassName='wrapper-class'
//         editorClassName='editor-class'
//         toolbarClassName='toolbar-class'
//         editorStyle={{
//           borderColor: 'red',
//           borderWidth: 4,
//         }}
//         onEditorStateChange={this.onEditorStateChange}
//       />
//     );
//   }
// }

export default ControlledEditor;
