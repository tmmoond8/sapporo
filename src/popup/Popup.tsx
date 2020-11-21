/** @jsx jsx */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from 'notion-ui';
import { translatePage } from './chromExtentionApi';

const Popup = () => {
  return (
    <StyledPopup>
      <Button onClick={translatePage}>translation</Button>
    </StyledPopup>
  );
};

export default Popup;

const StyledPopup = styled.div`
  width: 100px;
  height: 60px;
`;
