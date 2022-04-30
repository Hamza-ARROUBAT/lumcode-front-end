import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { Console, Hook, Unhook } from 'console-feed';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { EditorStyle } from './Editor.style';
import { Message } from 'console-feed/lib/definitions/Console';
import { useRecoilState } from 'recoil';
import { isCorrectState } from '../../store';

interface IEditor {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  correctAnswer: string;
  setIsWrong: Dispatch<SetStateAction<boolean>>;
}

export default function Editor(props: IEditor) {
  const [code, setCode] = useState('');
  const [logs, setLogs] = useState<any[]>([]);
  const [lastLog, setLastLog] = useState<Message>();
  const [isCorrect, setIsCorrect] = useRecoilState(isCorrectState);

  useEffect((): (() => void) => {
    props.setIsLoading(false);
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

  function onChange(newSrcCode: string) {
    setCode(newSrcCode);
  }

  useEffect(() => {
    if (lastLog?.data && lastLog?.data[0] === props.correctAnswer) {
      setIsCorrect(true);
    } else {
    }
  }, [lastLog]);

  return (
    <EditorStyle.Container id="reward">
      {/* Editor */}
      <AceEditor
        width="600px"
        mode="javascript"
        theme="monokai"
        name="blah2"
        onChange={onChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          enableEmmet: true,
          tabSize: 2,
        }}
      />

      <EditorStyle.Commands.Container>
        <EditorStyle.Commands.Button
          onClick={() => {
            executeCode(code);
          }}
        >
          {'</>'}
        </EditorStyle.Commands.Button>
        <EditorStyle.Commands.Separator />
        <EditorStyle.Commands.Button
          onClick={() => {
            setLogs([]);
          }}
        >
          {'Clear'}
        </EditorStyle.Commands.Button>
      </EditorStyle.Commands.Container>

      {/* Console */}
      <EditorStyle.Console.Container>
        <Console logs={logs} variant="dark" />
      </EditorStyle.Console.Container>
    </EditorStyle.Container>
  );
}
