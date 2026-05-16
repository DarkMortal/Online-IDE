import { Button, FormLabel } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { saveEditorState } from '../../lib/linkGenerator';
import { setSharableLink } from '../../store/editorSlice';

import { useRef } from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useToast,
    Switch
} from '@chakra-ui/react';
import { FlexRowContainer, ROW_CROSS_AXIS_ALIGNMENT } from '../flexcontainer/FlexContainer';
import { updateEditorState } from '../../lib/dataUpdate';

export default function Share() {
    const inputRef = useRef<HTMLInputElement>(null);
    const outputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const editorState = useSelector((state: RootState) => state);
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleGenerateLink = async () => {
        if (!editorState.editor.code.trim()) {
            toast({
                title: 'No code to share.',
                description: 'Please write some code before generating a link.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        const id = editorState.editor.sharableLink || '';
        if (id) {
            updateEditorState(id, editorState, {
                saveInput: inputRef.current?.checked || false,
                saveOutput: outputRef.current?.checked || false
            });
            toast({
                title: 'Changes saved',
                description: 'Sharable link has been updated and copied to clipboard.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            const shareLink = `${window.location.origin}/?share=${id}`;
            await navigator.clipboard.writeText(shareLink);
            onClose();
            return;
        }
        const link = await saveEditorState(editorState, {
            saveInput: inputRef.current?.checked || false,
            saveOutput: outputRef.current?.checked || false
        });
        if (link) {
            toast({
                title: 'Link generated',
                description: 'Sharable link has been generated and copied to clipboard.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            dispatch(setSharableLink(link));

            const shareLink = `${window.location.origin}/?share=${link}`;
            await navigator.clipboard.writeText(shareLink);
            onClose();
        }
    }

    return (<>
        <Button size='sm' colorScheme='green'
            borderBottomLeftRadius='none'
            borderBottomRightRadius='none' onClick={onOpen}>Share</Button>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent backgroundColor='gray.700' color='white'>
                <ModalHeader>Generate sharable link</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FlexRowContainer crossAxisAlignment={ROW_CROSS_AXIS_ALIGNMENT.CENTER}>
                        <Switch ref={inputRef} size='lg' colorScheme='purple' mb={4} defaultChecked />
                        <FormLabel>Include input in the link</FormLabel>
                    </FlexRowContainer>
                    <FlexRowContainer crossAxisAlignment={ROW_CROSS_AXIS_ALIGNMENT.CENTER}>
                        <Switch ref={outputRef} size='lg' colorScheme='purple' mb={4} defaultChecked />
                        <FormLabel>Include output in the link</FormLabel>
                    </FlexRowContainer>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleGenerateLink}>
                        {editorState.editor.sharableLink ? "Save changes" : "Generate Link"}
                    </Button>
                    <Button colorScheme='red' onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal></>);
}