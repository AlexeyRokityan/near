import React, { useState } from 'react';
import { Button, Typography, makeStyles, Grid, Container } from '@material-ui/core';
import { CONTRACT_ADDRESS, useParentContext } from './context';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 'var(--header-height)',
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  },
  background: {
    height: 'var(--header-height)',
    width: '100%',
    backgroundColor: 'rgba(0,0,0, 0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  content: {
    display: 'flex',
  },
  text: {
    fontSize: '20px',
    whiteSpace: 'nowrap',
    '@media (max-width: 465px)': {
      fontSize: '16px',
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    width: '100%',
    mixBlendMode: 'difference',
    color: '#FFFFFF',
    '@media (max-width: 465px)': {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 1,
  },
});

const Header: CustomFC = () => {
  const { data, wallet } = useParentContext();
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const signOut = () => {
    wallet?.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  const signIn = async () => {
    await wallet
      ?.requestSignIn({
        contractId: CONTRACT_ADDRESS,
        failureUrl: `${window.location.origin}?status=failed`,
        successUrl: `${window.location.origin}?status=success`,
      })
      .finally(() => setIsLoading(false));
  };

  const handleClick = () => {
    setIsLoading(true);
    if (data) signOut();
    else signIn();
  };

  return (
    <div className={classes.header}>
      <div className={classes.background} />
      <Container className={classes.content} style={{ height: '100%' }}>
        <div className={classes.container}>
          <Typography
            className={classes.text}
            variant="h6"
            style={{ marginRight: 'auto', width: '100%' }}
          >
            {data?.id}
          </Typography>
          <Grid container alignItems="center">
            {data?.balance && (
              <Grid item style={{ marginRight: '1rem' }}>
                <Typography className={classes.text} variant="h6">
                  {data.balance} NEAR
                </Typography>
              </Grid>
            )}
          </Grid>
        </div>
        <div className={classes.button}>
          <Button variant="contained" color="secondary" onClick={handleClick} disabled={isLoading}>
            {data ? 'Logout' : 'Login'}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Header;
