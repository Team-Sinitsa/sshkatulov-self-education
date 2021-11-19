import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { useTranslation, Trans } from 'react-i18next';

import logo from './logo.svg';
import './App.css';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const lngs: any = {
  en: { nativeName: 'English' },
  po: { nativeName: 'Polish' }
};

function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const { t, i18n } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 0,
        p: 0
      }}
    >
      <div className="App">
        <div className="top-bar">
          <div>
            {Object.keys(lngs).map((lng) => (
              <button className="control-switcher" key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                {lngs[lng].nativeName}
              </button>
            ))}
          </div>
          <IconButton className="control-switcher" sx={{ ml: 0 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode}
          </IconButton>
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <Trans i18nKey="description.part1">
              Edit
              {' '}
              <code>src/App.tsx</code>
              {' '}
              and save to reload.
            </Trans>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('description.part2')}
          </a>
        </header>
      </div>
    </Box>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  const theme = React.useMemo(
    () => createTheme({
      palette: {
        mode
      }
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
