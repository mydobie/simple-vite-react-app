import React from 'react';
import { Button } from 'react-bootstrap';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Clipboard, Clipboard2Check } from 'react-bootstrap-icons';
import styled from 'styled-components';

// EXAMPLE: Using styled-components with existing component
// use styled.button instead of styled(Button) if you want to use a native button
const ButtonStyled = styled(Button)`
  position: absolute;
  right: 20px;
  top: 20px;
`;

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    // Reset button after a brief timex
    if (copied) {
      setTimeout(() => setCopied(false), 3000);
    }
  }, [copied]);

  return (
    <CopyToClipboard text={textToCopy} onCopy={() => setCopied(true)}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <ButtonStyled variant='light'>
        {copied ? <Clipboard2Check /> : <Clipboard />}
        <span className='visually-hidden sr-only'>
          {copied ? 'Copied' : 'Copy to clipboard'}
        </span>
      </ButtonStyled>
    </CopyToClipboard>
  );
};

export default CopyButton;
