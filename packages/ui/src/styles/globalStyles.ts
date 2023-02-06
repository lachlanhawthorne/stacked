import tw, { globalStyles } from 'twin.macro';
import type { TwStyle } from 'twin.macro';
import { globalCss } from '../../stitches.config';

const customStyles = {
  body: tw`
    font-sans
    antialiased
    dark:(bg-black text-white)
  `,

  '*, *::before, *::after': tw`
    box-border
  `,

  'h1, h2, h3, h4, h5, h6': tw`
    font-bold
    my-0
  `,
};

const styles = () => {
  globalCss(globalStyles as Record<string, TwStyle>)();
  globalCss(customStyles)();
};

export default styles;
