import styled, { css } from 'styled-components';

interface TextBubbleStyleProps {
  readonly theme: string;
  readonly background: string;
}

export const TextBubbleStyle = {
  Container: styled.div<TextBubbleStyleProps>`
    ${(props) =>
      props.theme == 'light'
        ? css`
            background: hsl(0, 0%, 100%);
            color: hsl(0, 0%, 12.5%);
          `
        : css`
            background: hsl(0, 0%, 12.5%);
            color: hsl(0, 0%, 100%);
          `}
    user-select: none;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    padding: 1em;
    margin-bottom: 20px;
    cursor: pointer;
    /* prettier-ignore */
    box-shadow:
      0 -1px 4px ${(props) => props.background},
      0 1px 1px ${(props) => props.background},
      0 2px 2px ${(props) => props.background},
      0 4px 4px hsl(0deg 0% 0% / 0.075),
      0 8px 8px hsl(0deg 0% 0% / 0.075),
      0 16px 16px hsl(0deg 0% 0% / 0.075)
    ;
    transition: box-shadow 0.5s;
  `,
  arrow: styled.p`
    position: absolute;
    right: 30px;
    bottom: 10px;
    margin: 0;

    font-size: 1.3rem;
    font-weight: bold;
    color: gray;
  `,
};
