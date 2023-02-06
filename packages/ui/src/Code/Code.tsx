import tw, { css } from 'twin.macro'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-python'
import { useEffect } from 'react'
import Prism from "prismjs";

// import {  } from 'marked-react'

const Code = tw.pre`
  inline bg-neutral-900 rounded-xl p-6 overflow-auto 
  // text size medium
  text-lg
`

Prism.manual = true;


export const CodeBlock = ({ code, language }: any) => {
  let highlightedCode = ''
  if (languages[language]) {
    highlightedCode = highlight(code, languages[language], language)
  } else {
    highlightedCode = highlight(code, languages.clike, language)
  }

  useEffect(() => {
    // Prism.highlightAll();
    console.log(code, language)
  }, []);

  return (
    <Code>
      <code
        // css={css`
        //   ${tw`text-sm`}
        // `}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </Code>
  )
}