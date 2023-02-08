import { AppBar, Box, IconButton, styled, Toolbar } from '@mui/material';

export const StyledHeader = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#EEFAFB',
  boxShadow: 'none',
  '.MuiToolbar-root': {
    padding: 0,
  },
  '.logo': {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    '.MuiToolbar-root': {
      minHeight: '80px',
    },
  },
}));

export const HiddenToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    '&.MuiToolbar-root': {
      minHeight: '80px',
    },
  },
}));

export const StyledNav = styled(Box)(({ theme }) => ({
  ...theme.typography,
  display: 'none',
  marginLeft: 'auto',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
  '.MuiList-root': {
    display: 'flex',
  },
  '.MuiListItem-root': {
    marginRight: theme.spacing(6),
    padding: 0,
    '&:last-child': {
      marginRight: 0,
    },
  },
  '.MuiListItemButton-root': {
    fontWeight: 600,
    fontSize: 16,
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',
    padding: '7px 20px',
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 4px 16px rgba(7, 20, 48, 0.04)',
    transition: theme.transitions.create(['border-color', 'boxShadow']),
    border: '1px solid transparent',
    boxSizing: 'border-box',
    '&:hover': {
      borderColor: '#F6F8FB',
      boxShadow: ' 0px 8px 16px rgba(7, 20, 48, 0.08)',
      backgroundColor: theme.palette.background.default,
    },
    '&:active': {
      borderColor: '#DDE3EF',
    },
    '&:focus-visible': {
      outline: `4px solid ${theme.palette.primary.light}`,
    },
  },
  '.nav-link': {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    fontSize: 16,
    transition: theme.transitions.create('color'),
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '&:active': {
      color: theme.palette.primary.dark,
    },
    '&:focus': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
      outline: 'none',
    },
  },
}));

export const StyledToggler = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

export const StyledSearchButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(3),
  marginLeft: 'auto',
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));