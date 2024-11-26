'use client';

import React, { useState } from 'react';
import styles from './index.module.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import classNames from 'classnames';

interface RichTextInputProps {
  name: string;
  initialValue: string;
  onChange: (value: { target: { name: string; value: string } }) => void;
  placeholder: string;
  color?: string;
  maxHeight?: string;
  width?: string;
  border?: string;
  borderRadius?: string;
  className?: string;
  disabled?: boolean;
}

export const RichTextInput = ({
  name,
  initialValue,
  onChange,
  placeholder,
  color,
  maxHeight,
  width,
  border,
  borderRadius,
  className,
  disabled,
}: RichTextInputProps) => {
  const [editorText, setEditorText] = useState<string>(initialValue || '');

  const handleEditorChange = (value: string) => {
    if (disabled) return;

    setEditorText(value);
    onChange({ target: { name, value } });
  };

  return (
    <div className={styles['container']}>
      <ReactQuill
        style={{
          color,
          maxHeight,
          width,
          border,
          borderRadius,
        }}
        className={classNames(styles['container-editor'], className)}
        value={editorText}
        onChange={handleEditorChange}
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
          ],
        }}
        placeholder={placeholder}
        theme="snow"
        readOnly={disabled}
      />
    </div>
  );
};
