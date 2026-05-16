import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import './output.css';

export default function Output() {
    const { output, isRunning, outputType } = useSelector((state: RootState) => state.editor);

    return (
        <div className="output-terminal">
            <div className="output-terminal__header">
                <span className="output-terminal__title">Output</span>
                {isRunning && <span className="output-terminal__badge">Running…</span>}
            </div>
            <pre className="output-terminal__body">
                {isRunning
                    ? <span className="output-terminal__placeholder">Your code is running. Please wait...</span>
                    : output ? <span className={`output-terminal__result_${outputType}`}>{output}</span>
                    : <span className="output-terminal__placeholder">Run your code to see output here.</span>
                }
            </pre>
        </div>
    );
}
