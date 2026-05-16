import { Textarea } from '@chakra-ui/react/textarea';
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { setInput } from "../../store/editorSlice";
import './userinput.css';

export default function InputParams() {
    const dispatch = useDispatch();
    const input = useSelector((state: RootState) => state.editor.input);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setInput(event.target.value));
    };

    return <>
        <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder='Enter input parameters here...'
            className="input-textarea"
            h="60vh"
            minH="300px"
            resize="none"
            border='none'
            backgroundColor='#1e2130'
            borderColor='transparent'
            color='whitesmoke'
            _hover={{border: 'none', borderColor: 'transparent'}}
            _focus={{border: 'none', borderColor: 'transparent', boxShadow: 'none'}}
            _focusVisible={{ boxShadow: 'none', outline: 'none' }}
            
            borderTopRightRadius='sm'
        />
    </>
}