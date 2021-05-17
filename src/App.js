import { createRenderer } from "fela";
import { RendererProvider, ThemeProvider } from "react-fela";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { theme } from "./theme.js";
import { rootReducer } from "./reducers"
import { Player } from './components/player'

const store = createStore(rootReducer, applyMiddleware(thunk))

const renderer = createRenderer({
  devMode: true
});

function App() {
  return (
    <RendererProvider renderer={renderer}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="App">
            <Player audioPath="59e106639d79684277df770d.wav" transcriptPath="transcript.json" enableWaveform={true} />
          </div>
        </Provider>
      </ThemeProvider>
    </RendererProvider >

  );
}

export default App;
