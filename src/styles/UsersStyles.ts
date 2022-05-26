const marginAround = {
  margin: '8px'
};

export const UsersStyles = {
  controls: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    padding: '8px',
    height: '96px',
    '& .MuiFormControl-root': marginAround,
    '& .MuiButton-root': marginAround
  }
} as const;
