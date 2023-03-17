import tw, { css } from 'twin.macro'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import theme from './theme'
export const CodeBlock = ({ code, language }: any) => {
  return (
    <div tw="mt-4">
      <SyntaxHighlighter 
        language={language} 
        style={theme as any}
        customStyle={{
          borderRadius: '0.75rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}