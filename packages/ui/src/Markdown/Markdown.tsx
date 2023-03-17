import tw from 'twin.macro'
import MarkedReact from 'marked-react'
import { CodeBlock } from '../Code/Code'

const MarkdownContainer = tw.div`
  space-y-6
`

export const Markdown = ({ content, linkComponent : LinkComponent }: any) => {
  return (
    <MarkdownContainer>
      <MarkedReact
        value={content} 
        renderer={{
          // link(href, text) {
          //     return (
          //       // <LinkComponent href={href}>
          //       //   {text}
          //       // </LinkComponent>
          //       <></>
          //     )
          // },
          
          heading(children, level) {
            switch (level) {
              case 1:
                return <></>
              case 2:
                return <h2 tw="text-2xl font-bold" style={{ wordSpacing: '0.1rem' }}>{children}</h2>
              case 3:
                return <h3 tw="text-xl font-bold">{children}</h3>
              case 4:
                return <h4 tw="text-lg font-bold">{children}</h4>
              case 5:
                return <h5 tw="text-base font-bold">{children}</h5>
              case 6:
                return <h6 tw="text-sm font-bold">{children}</h6>
              default:
                return <h1 tw="text-3xl font-bold">{children}</h1>
            }
          },
          code(code, language) {
            return (
              <CodeBlock 
                language={language}
                code={code}
              />
            )
          },
          codespan(code, lang) {
            return (
              <code style={{
                fontSize: '1rem',
                color: 'lightgreen'
              }}>
                '{code}'
              </code>
            )
          },
          paragraph(children) {
            return <p tw="text-base">{children}</p>
          },
        }}
      />
    </MarkdownContainer>
  )
}