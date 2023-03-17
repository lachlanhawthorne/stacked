import { getCssText, globalStyles } from 'ui';

const Styles = () => (
  <>
    <style id='stitches' dangerouslySetInnerHTML={{ __html: getCssText() }} />
    <style id='global' dangerouslySetInnerHTML={{ __html: globalStyles() }} />
  </>
);

export default Styles;