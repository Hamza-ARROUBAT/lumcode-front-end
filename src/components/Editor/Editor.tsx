import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { Console, Hook, Unhook } from 'console-feed';
import { useEffect, useState } from 'react';
import { EditorStyle } from './Editor.style';
import { Message } from 'console-feed/lib/definitions/Console';
import { useReward } from 'react-rewards';

export default function Editor() {
  const [code, setCode] = useState('');
  const [logs, setLogs] = useState<any[]>([]);
  const [lastLog, setLastLog] = useState<Message>();

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

  function onChange(newSrcCode: string) {
    setCode(newSrcCode);
  }

  useEffect(() => {
    if (lastLog?.data && lastLog?.data[0] === '1') {
      reward();
    }
  }, [lastLog]);

  const { reward, isAnimating } = useReward('rewardId', 'confetti');

  return (
    <EditorStyle.Container id="rewardId">
      {/* Editor */}
      <AceEditor
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
