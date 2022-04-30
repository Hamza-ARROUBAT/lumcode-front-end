import styled from 'styled-components';

interface TextBubbleStyleProps {
  readonly background: string;
}

export const TextBubbleStyle = {
  Container: styled.div<TextBubbleStyleProps>`
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
    transition: background 0.5s;
  `,

  subContainer: {
    Container: styled.div``,
  },
};
