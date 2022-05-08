import Editor from '@monaco-editor/react';
import { Console, Hook, Unhook } from 'console-feed';
import { Message } from 'console-feed/lib/definitions/Console';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isCorrectState, isWrongState } from '../../store';
import { IdeStyle } from './Editor.style';

interface IEditor {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isQuestioning: boolean;
  correctAnswer: string;
  setIsWrong: Dispatch<SetStateAction<boolean>>;
}

export default function Ide(props: IEditor) {
  const [code, setCode] = useState('');
  const [logs, setLogs] = useState<any[]>([]);
  const [lastLog, setLastLog] = useState<Message>();
  const [isCorrect, setIsCorrect] = useRecoilState(isCorrectState);
  const [isWrong, setIsWrong] = useRecoilState(isWrongState);

  useEffect((): (() => void) => {
    Hook(
      window.console,
      (log) => {
        setLogs((currLogs) => [...currLogs, log]);
        setLastLog(log);
      },
      false
    );

    // @ts-ignore
    return () => Unhook(window?.console);
  }, []);

  async function executeCode(text: string) {
    try {
      const f = new Function(text);
      f();
    } catch (exception) {
      console.error(exception);
    }
  }

  function onChange(newSrcCode: string | undefined) {
    newSrcCode && setCode(newSrcCode);
  }

  const onMount = () => {
    props.setIsLoading(false);
  };

  useEffect(() => {
    if (
      props.isQuestioning &&
      lastLog?.data &&
      lastLog?.data[0] === props.correctAnswer
    ) {
      setIsWrong(false);
      setIsCorrect(true);
    } else if (
      props.isQuestioning &&
      lastLog?.data &&
      lastLog?.data[0] !== props.correctAnswer
    ) {
      setIsWrong(true);
    }
  }, [lastLog]);

  return (
    <IdeStyle.Container id="rewardId">
      {/* Editor */}
      <Editor
        width={600}
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={onChange}
        onMount={onMount}
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />
      {!props.isLoading && (
        <IdeStyle.Commands.Container>
          <IdeStyle.Commands.Button
            onClick={() => {
              executeCode(code);
            }}
          >
            {'</>'}
          </IdeStyle.Commands.Button>
          <IdeStyle.Commands.Separator />
          <IdeStyle.Commands.Button
            onClick={() => {
              setLogs([]);
            }}
          >
            {'Clear'}
          </IdeStyle.Commands.Button>
        </IdeStyle.Commands.Container>
      )}

      {/* Console */}
      {!props.isLoading && (
        <IdeStyle.Console.Container>
          <Console logs={logs} variant="dark" />
        </IdeStyle.Console.Container>
      )}
    </IdeStyle.Container>
  );
}
