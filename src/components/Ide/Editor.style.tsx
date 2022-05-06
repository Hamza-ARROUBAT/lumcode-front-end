import styled from 'styled-components';

export const IdeStyle = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
  `,

  Commands: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      background: hsl(216, 10%, 10%);
    `,
    Separator: styled.hr`
      width: 100%;
      border: none;
      border-bottom: 1px solid white;
    `,
    Button: styled.button`
      flex-grow: 1;
      cursor: pointer;
      background: none;
      border: none;
      color: hsl(0, 0%, 100%);

      transition: color 0.25s;
      :hover {
        color: hsl(0, 0%, 80%);
      }
    `,
  },
  Console: {
    Container: styled.div`
      overflow: auto;
      height: 100%;
      flex-grow: 1;
      background: hsl(0, 0%, 15%);
    `,
  },
};
