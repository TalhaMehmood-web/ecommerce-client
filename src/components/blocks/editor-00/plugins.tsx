import { useState } from "react";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { FontBackgroundToolbarPlugin } from "@/components/editor/plugins/toolbar/font-background-toolbar-plugin";
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { FontFamilyToolbarPlugin } from "@/components/editor/plugins/toolbar/font-family-toolbar-plugin";
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import { BlockFormatDropDown } from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin";
import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph";
import { FormatNumberedList } from "@/components/editor/plugins/toolbar/block-format/format-numbered-list";
import { FormatBulletedList } from "@/components/editor/plugins/toolbar/block-format/format-bulleted-list";
import { FormatCheckList } from "@/components/editor/plugins/toolbar/block-format/format-check-list";
import { FormatCodeBlock } from "@/components/editor/plugins/toolbar/block-format/format-code-block";
import { FormatQuote } from "@/components/editor/plugins/toolbar/block-format/format-quote";
import { Separator } from "@/components/ui/separator";
import { HistoryToolbarPlugin } from "@/components/editor/plugins/toolbar/history-toolbar-plugin";
import { FontSizeToolbarPlugin } from "@/components/editor/plugins/toolbar/font-size-toolbar-plugin";
import { ElementFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin";
import { FormatHeading } from "@/components/editor/plugins/toolbar/block-format/format-heading";
import { ActionsPlugin } from "@/components/editor/plugins/actions/actions-plugin";
import { CounterCharacterPlugin } from "@/components/editor/plugins/actions/counter-character-plugin";
import { SpeechToTextPlugin } from "@/components/editor/plugins/actions/speech-to-text-plugin";
import { MaxLengthPlugin } from "@/components/editor/plugins/actions/max-length-plugin";
import { CharacterLimitPlugin } from "@/components/editor/plugins/actions/counter-limit-plugin";
import { FontColorToolbarPlugin } from "@/components/editor/plugins/toolbar/font-color-toolbar-plugin";

const maxLength = 500;
export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="relative">
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1">
            <HistoryToolbarPlugin />
            <Separator orientation="vertical" className="h-8" />
            <BlockFormatDropDown>
              <FormatParagraph />
              <FormatHeading levels={["h1", "h2", "h3"]} />
              <FormatNumberedList />
              <FormatBulletedList />
              <FormatCheckList />
              <FormatCodeBlock />
              <FormatQuote />
            </BlockFormatDropDown>
            {blockType === "code" ? (
              <></>
            ) : (
              <>
                <FontFamilyToolbarPlugin />
                <FontSizeToolbarPlugin />
                <Separator orientation="vertical" className="h-8" />
                <FontFormatToolbarPlugin format="bold" />
                <FontFormatToolbarPlugin format="italic" />
                <FontFormatToolbarPlugin format="underline" />
                <FontFormatToolbarPlugin format="strikethrough" />
                <Separator orientation="vertical" className="h-8" />
                <FontColorToolbarPlugin />
                <FontBackgroundToolbarPlugin />
                <Separator orientation="vertical" className="h-8" />
                <ElementFormatToolbarPlugin />
              </>
            )}
          </div>
        )}
        {/* toolbar plugins */}
      </ToolbarPlugin>
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable
                  className="h-[300px] m-0 p-0"
                  placeholder="Start typing ..."
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/* editor plugins */}
        <HistoryPlugin />
      </div>
      {/* actions plugins */}
      <ActionsPlugin>
        <div className="clear-both flex items-center justify-between border-t p-1 overflow-auto gap-2">
          <div className="flex justify-start flex-1">
            <MaxLengthPlugin maxLength={maxLength} />
            <CharacterLimitPlugin maxLength={maxLength} charset="UTF-16" />
          </div>
          <div>
            <CounterCharacterPlugin charset="UTF-16" />
          </div>
          <div className="flex justify-end flex-1">
            <SpeechToTextPlugin />
          </div>
        </div>
      </ActionsPlugin>
    </div>
  );
}
