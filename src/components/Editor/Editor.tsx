import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { Console, Hook, Unhook } from 'console-feed';
import { useEffect, useState } from 'react';
import { EditorStyle } from './Editor.style';

export default function Editor() {
  const [code, setCode] = useState('');
  const [logs, setLogs] = useState<any[]>([]);

  useEffect((): (() => void) => {
    Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );

    // @ts-ignore
    return () => Unhook(window?.console);
  }, []);

  function _runJavascript(text: string) {
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

  return (
    <EditorStyle.Container>
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
            _runJavascript(code);
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
