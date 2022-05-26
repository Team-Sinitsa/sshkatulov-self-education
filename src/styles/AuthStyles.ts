const marginSide = {
  margin: '0 4px'
};

const alignSelfCenter = {
  alignSelf: 'center'
};

export const AuthStyles = {
  controls: {
    display: 'contents',
    alignItems: 'baseline',
    justifyContent: 'center',
    padding: '8px',
    '& .MuiFormControl-root': marginSide,
    '& .MuiButton-root': marginSide,
    '& .MuiBox-root': marginSide,
    '& .MuiBackdrop-root': alignSelfCenter,
    '& .MuiPaper-root': alignSelfCenter
  }
};
