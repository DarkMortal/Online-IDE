import CodeBlock from './components/codeblock/Code';
import Run from './components/run/Run';
import InputParams from './components/userinput/InputParams';
import Output from './components/output/Output';
import { FlexColumnContainer, FlexRowContainer, FlexWrap, ROW_MAIN_AXIS_ALIGNMENT } from './components/flexcontainer/FlexContainer';
import LanguageSelector from './components/language/LanguageSelector';
import Share from './components/share/Share';

import theme from './themeConfig';
import { ColorModeScript } from '@chakra-ui/react'
import { useEffect } from 'react';

import { useToast } from '@chakra-ui/react';

import { fetchEditorState } from './lib/dataFetch';
import { useDispatch } from 'react-redux';
import { 
  setCode,
  setInput,
  setLanguage,
  setOutput,
  setOutputType,
  setSharableLink
} from './store/editorSlice';

function App() {
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    // Check if there's a shared link with the "share" query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const shareId = urlParams.get('share');
    if (shareId) {
      // If a share ID is present, fetch the shared editor state
      fetchEditorState(shareId).then((sharedState) => {
        if (sharedState) {
          // If the shared state is successfully fetched, update the editor state in the Redux store
          
          dispatch(setCode(sharedState.code));
          dispatch(setLanguage(sharedState.language));
          dispatch(setInput(sharedState.input!));
          dispatch(setOutput(sharedState.output!));
          dispatch(setOutputType(sharedState.outputType === 'success' ? 'success' : 'error'));
          dispatch(setSharableLink(shareId));
        } else {
          toast({
            title: 'Failed to load shared code.',
            description: `The shared code could not be loaded. It may have been removed or the link is invalid.`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          window.history.replaceState({}, document.title, window.location.pathname); // Remove the share query parameter from the URL 
        }
      }).catch((error) => {
        console.error('Error fetching shared editor state:', error);
      });
    }
  }, []);

  return (
    <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <FlexRowContainer
      takeFullWidth={true}
      flexWrap_={FlexWrap.WRAP_FLEX}
      paddingLeft_={10}
      paddingRight_={10}
      paddingTop_={10}>
      <FlexColumnContainer rowGap_={0} classNames_="editor-col editor-col--primary">
      <FlexRowContainer mainAxisAlignment={ROW_MAIN_AXIS_ALIGNMENT.RIGHT}>
        <LanguageSelector />
      </FlexRowContainer>
        <CodeBlock />
      </FlexColumnContainer>

      <FlexColumnContainer rowGap_={0} classNames_="editor-col editor-col--secondary">
      <FlexRowContainer mainAxisAlignment={ROW_MAIN_AXIS_ALIGNMENT.RIGHT}>
        <Share />
        <Run />
      </FlexRowContainer>
        <InputParams />
      </FlexColumnContainer>
    </FlexRowContainer>
    <FlexRowContainer takeFullWidth={true} paddingLeft_={10} paddingRight_={10} paddingBottom_={10}>
      <Output />
    </FlexRowContainer>
    </>
  )
}

export default App
