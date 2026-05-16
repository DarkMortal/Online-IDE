import { useDispatch, useSelector } from 'react-redux';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { setLanguage } from '../../store/editorSlice';

import type { RootState } from "../../store/store";

export default function LanguageSelector() {
    const dispatch = useDispatch();
    const { language } = useSelector((state: RootState) => state.editor);

    const handleLanguageChange = (language: string) => {
        dispatch(setLanguage(language));
    };

    const languages = ['c', 'go', 'cpp', 'java', 'python', 'javascript'];

    return <>
        <Menu>
            <MenuButton as={Button}
            color={'white'}
            size='sm'
            borderBottomLeftRadius='none'
            borderBottomRightRadius='none'
            backgroundColor={'#4287f5'}
            _hover={{bg: '#4266f5'}}
            _expanded={{bg: '#4266f5'}}
            rightIcon={<ChevronDownIcon />}>
                Selected Language: {language.charAt(0).toUpperCase() + language.slice(1)}
            </MenuButton>
            <MenuList bgColor='#0b122e' borderColor='#0b122e'>
                {languages.map((lang) => (
                    <MenuItem key={lang} bgColor='#0b122e' _hover={{bg: '#060b1f'}} color='white' onClick={() => handleLanguageChange(lang)}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    </>
}