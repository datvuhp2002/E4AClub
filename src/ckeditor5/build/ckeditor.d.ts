/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
"use client";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import { Autosave } from "@ckeditor/ckeditor5-autosave";
import {
  Bold,
  Code,
  Italic,
  Underline,
} from "@ckeditor/ckeditor5-basic-styles";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { CKBox } from "@ckeditor/ckeditor5-ckbox";
import { CloudServices } from "@ckeditor/ckeditor5-cloud-services";
import { CodeBlock } from "@ckeditor/ckeditor5-code-block";
import type { EditorConfig } from "@ckeditor/ckeditor5-core";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { FindAndReplace } from "@ckeditor/ckeditor5-find-and-replace";
import {
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
} from "@ckeditor/ckeditor5-font";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Highlight } from "@ckeditor/ckeditor5-highlight";
import { GeneralHtmlSupport } from "@ckeditor/ckeditor5-html-support";
import {
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
} from "@ckeditor/ckeditor5-image";
import { Indent } from "@ckeditor/ckeditor5-indent";
import { Link } from "@ckeditor/ckeditor5-link";
import { List } from "@ckeditor/ckeditor5-list";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import { Style } from "@ckeditor/ckeditor5-style";
import {
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
} from "@ckeditor/ckeditor5-table";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import { Undo } from "@ckeditor/ckeditor5-undo";

declare class Editor extends ClassicEditor {
  static builtinPlugins: (
    | typeof Alignment
    | typeof Autoformat
    | typeof Autosave
    | typeof BlockQuote
    | typeof Bold
    | typeof CKBox
    | typeof CloudServices
    | typeof Code
    | typeof CodeBlock
    | typeof Essentials
    | typeof FindAndReplace
    | typeof FontBackgroundColor
    | typeof FontColor
    | typeof FontFamily
    | typeof FontSize
    | typeof GeneralHtmlSupport
    | typeof Heading
    | typeof Highlight
    | typeof Image
    | typeof ImageCaption
    | typeof ImageStyle
    | typeof ImageToolbar
    | typeof ImageUpload
    | typeof Indent
    | typeof Italic
    | typeof Link
    | typeof List
    | typeof MediaEmbed
    | typeof Paragraph
    | typeof PasteFromOffice
    | typeof PictureEditing
    | typeof Style
    | typeof Table
    | typeof TableCaption
    | typeof TableCellProperties
    | typeof TableColumnResize
    | typeof TableProperties
    | typeof TableToolbar
    | typeof TextTransformation
    | typeof Underline
    | typeof Undo
  )[];
  static defaultConfig: EditorConfig;
}
export default Editor;
