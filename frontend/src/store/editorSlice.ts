import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface EditorState {
  code: string
  language: string
  input: string
  output: string
  outputType: 'success' | 'error'
  isRunning: boolean
  sharableLink: string
}

const initialState: EditorState = {
  code: '',
  language: 'python',
  input: '',
  output: '',
  outputType: 'success',
  isRunning: false,
  sharableLink: '',
}

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCode(state, action: PayloadAction<string>) {
      state.code = action.payload
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload
    },
    setInput(state, action: PayloadAction<string>) {
      state.input = action.payload
    },
    setOutput(state, action: PayloadAction<string>) {
      state.output = action.payload
      state.isRunning = false
    },
    setOutputType(state, action: PayloadAction<'success' | 'error'>) {
      state.outputType = action.payload
    },
    setIsRunning(state, action: PayloadAction<boolean>) {
      state.isRunning = action.payload
    },
    setSharableLink(state, action: PayloadAction<string>) {
      state.sharableLink = action.payload
    },
  },
})

export const { 
  setCode, setLanguage, setInput, setOutput,
  setOutputType, setIsRunning, setSharableLink } = editorSlice.actions
export default editorSlice.reducer
