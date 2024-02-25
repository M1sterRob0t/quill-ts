import Quill from 'quill';
import React, { forwardRef, useEffect, useRef } from 'react';

import * as QuillTableUI from 'quill-table-ui';
import * as ImageResize from 'quill-image-resize';
import { ImageDrop } from 'quill-image-drop-module';
import 'quill-table-ui/dist/index.css';
import './Editor.css';

Quill.register('modules/imageResize', ImageResize.default);
Quill.register('modules/imageDrop', ImageDrop);
Quill.register({
  'modules/tableUI': QuillTableUI.default
}, true)

const modules = {
  table: true,
  tableUI: true,
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', { align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['code'],
    ['clean'],
    ['table'],
  ],
  clipboard: {
    matchVisual: false,
  },
  imageResize: {}
};

/* const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'align',
  'code',
  'table',
]; */

// Editor is an uncontrolled React component
const Editor = forwardRef((_props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const editorContainer = container.appendChild(container.ownerDocument.createElement('div'));
    const quill = new Quill(editorContainer, {
        theme: 'snow',
        modules,
        // formats,
    });

    const objRef = ref as React.MutableRefObject<Quill | null>;
    objRef.current = quill;

    return () => {
      objRef.current = null;
      container.innerHTML = '';
    };
  }, []);

  return <div className="editor" ref={containerRef}></div>;
});

Editor.displayName = 'Editor';

export default Editor;
