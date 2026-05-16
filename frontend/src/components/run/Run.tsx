import { Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { setOutput, setOutputType, setIsRunning } from '../../store/editorSlice';

import axios from 'axios';

import { useToast } from '@chakra-ui/react';

export default function Run() {
    const dispatch = useDispatch();
    const { code, language, input, isRunning } = useSelector((state: RootState) => state.editor);
    const toast = useToast();

    async function executeCode(code: string, language: string, input: string) {
        if (isRunning) {
            toast({
                title: 'Code is already running.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        if (!code.trim()) {
            toast({
                title: 'No code to run.',
                description: 'Please write some code before running.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        dispatch(setIsRunning(true));
        axios.post("/compile", {
                lang: language,
                code: code,
                inputs: input.trim() ? input
                        .split("\n").map(line => line.trim()): []
            },{
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            .then(response => {
                const data: {
                    Message: string;
                    Type: string;
                    Time: string;
                } = response.data;

                dispatch(setOutputType(
                    data.Type === "success" ? "success" : "error"));
                dispatch(setOutput(data.Message.replace(/ /g,'\u00a0') + "\n\nExecution Time: " + data.Time + " ms"));

            })
            .catch((error) => {
                dispatch(setOutputType("error"));
                if (axios.isAxiosError(error)) {
                    dispatch(
                        setOutput(
                            error.response?.data?.error ||
                            error.message
                        )
                    );
                    return;
                }
                console.error(error)
                dispatch(setOutput("Failed to generate output"));
            })
            .finally(() => {
                dispatch(setIsRunning(false));
            });
    }

    return <Button size='sm' colorScheme='purple'
        borderBottomLeftRadius='none'
        borderBottomRightRadius='none' onClick={
            () => executeCode(code, language, input)}>Run</Button>
}