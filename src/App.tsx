import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTranslation, Trans } from 'react-i18next';
import {
  Divider,
  FormControl, InputLabel, Link, MenuItem, Select
} from '@mui/material';

import logo from './logo.svg';
import './App.css';
import { UsersControl } from './components/UsersControl';
import { ThemeSwitch } from './components/ThemeSwitch';
import { AppStyles as styles } from './styles/AppStyles';
import { AuthControl } from './components/AuthControl';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const lngs: any = {
  en: { nativeName: 'English' },
  po: { nativeName: 'Polish' }
};

function App() {
  const colorMode = React.useContext(ColorModeContext);
  const { t, i18n } = useTranslation();
  return (
    <Box sx={styles.main}>
      <Box sx={styles.header}>
        <AuthControl />
        <Divider
          sx={styles.marginAround}
          orientation="vertical"
          variant="middle"
          flexItem
        />
        <FormControl>
          <InputLabel id="lng-select-label">{t('header.lng')}</InputLabel>
          <Select
            labelId="lng-select-label"
            id="lng-select"
            value={i18n.resolvedLanguage}
            label={t('header.lng')}
          >
            {Object.keys(lngs).map((lng) => (
              <MenuItem key={lng} value={lng} onClick={() => i18n.changeLanguage(lng)}>
                {lngs[lng].nativeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ThemeSwitch onClick={colorMode.toggleColorMode} />
      </Box>
      <Box sx={styles.body}>
        <img src={logo} className="App-logo" alt="logo" />
        <Box sx={styles.textBlock}>
          <Box sx={styles.marginAround}>
            <Trans i18nKey="description.part1">
              Edit
              {' '}
              <code>src/App.tsx</code>
              {' '}
              and save to reload.
            </Trans>
          </Box>
          <Link
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('description.part2')}
          </Link>
        </Box>
      </Box>
      <UsersControl />
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
