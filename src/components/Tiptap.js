'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Bold from '@tiptap/extension-bold';

const Tiptap = props => {
    const editor = useEditor({
        content: props.defaultValue || '<p>Hello There! 🌎️</p>',
        extensions: [
            StarterKit,
            Underline,
            Bold,
        ],
        editorProps: {
            attributes: {
                class: 'flex flex-col w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-32',
            },
        },
    });

    const onChangeHandler = props.onChange(editor?.getHTML());

    return (
        <EditorContent onChange={onChangeHandler} editor={editor} {...props} />
    );
};

export default Tiptap;
