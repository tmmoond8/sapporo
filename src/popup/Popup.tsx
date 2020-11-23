/** @jsx jsx */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { translatePage } from './chromExtentionApi';

const Popup = () => {
  const [text, setText] = React.useState('');
  const [_translatedText, setTranslatedText] = React.useState('');
  const handleChangeText = React.useCallback((e: React.ChangeEvent) => {
    setText((e.target as any).value);
  }, []);
  const translateText = React.useCallback(() => {
    fetch(`https://sapporo-api.tammolo.com/api/translation/${text}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    }).then((response) => {
      response.json().then((data) => {
        const { data: translated, ok } = data;
        if (ok) {
          setTranslatedText(translated);
        }
      });
    });
  }, [text]);

  return (
    <StyledPopup>
      <Body>
        <InputWrapper>
          <Input onChange={handleChangeText} />
          <Button onClick={translateText}>translation</Button>
        </InputWrapper>
        <TranslatedText>{_translatedText}</TranslatedText>
        <PageTranslationButtion onClick={translatePage}>
          translate this page
        </PageTranslationButtion>
      </Body>
      <Footer>beta sapporo</Footer>
    </StyledPopup>
  );
};

export default Popup;

const StyledPopup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 300px;
  margin: 0;
  padding: 0;
  background-color: rgb(247, 246, 243);
`;

const InputWrapper = styled.div`
  display: flex;
  height: 100%;
  display: flex;
  position: relative;
  font-size: 16px;
  align-items: center;
  line-height: 20px;
  border-radius: 3px;
  color: rgb(55, 53, 47);
  box-sizing: border-box;
  cursor: text;
`;

const Input = styled.input`
  flex: 1;
  margin-right: 16px;
  height: 22px;
`;

const Button = styled.div`
  display: inline-block;
  padding: 0 8px;
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  background: #2eabdc;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  &:active {
    background: #008dbe;
  }
`;

const Body = styled.div`
  flex: 1;
  padding: 20px 16px 12px 20px;
  box-shadow: rgba(55, 53, 47, 0.08) 0px 1px 0px,
    rgba(55, 53, 47, 0.08) 0px -1px 0px;
`;

const Footer = styled.div`
  width: 100%;
  padding: 12px;
  background-color: white;
`;

const PageTranslationButtion = styled.button`
  margin-top: 16px;
  border: 0;
  padding: 0;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  color: #008dbe;
  &:active {
    color: #2eabdc;
  }
`;

const TranslatedText = styled.h3`
  margin-top: 8px;
`;
