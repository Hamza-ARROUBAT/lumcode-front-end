import styled from 'styled-components';

export const TextBubbleStyle = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    padding: 1em;
    margin-bottom: 20px;

    /* prettier-ignore */
    box-shadow:
      0 -1px 4px hsl(0deg 0% 0% / 0.075),
      0 1px 1px hsl(0deg 0% 0% / 0.075),
      0 2px 2px hsl(0deg 0% 0% / 0.075),
      0 4px 4px hsl(0deg 0% 0% / 0.075),
      0 8px 8px hsl(0deg 0% 0% / 0.075),
      0 16px 16px hsl(0deg 0% 0% / 0.075)
    ;
  `,

  subContainer: {
    Container: styled.div``,
  },
};
