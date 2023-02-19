import React from 'react';
import ColorPicker from './ColorPicker';
import { useParentContext } from './context';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Typography } from '@material-ui/core';
import { transformObjectToRGB } from '../utils';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--header-height) 0 0',
    '@media (max-width: 465px)': {
      display: 'block',
    },
  },
  text: {
    margin: 'auto 4rem auto 0',
    '@media (max-width: 465px)': {
      margin: '2rem 0',
      padding: 0,
    },
  },
  container: {
    margin: 'auto 0',
    '@media (max-width: 465px)': {
      width: '100%',
    },
  },
  colorBlock: {
    display: 'flex',
    flex: '1 1 100%',
    padding: '0.5rem',
    border: '1px solid #FFFFFF',
  },
  colors: {
    display: 'flex',
    flexDirection: 'column',
    width: '225px',
    height: '225px',
    border: '1px solid #FFFFFF',
    margin: '0 0 30px',
    '@media (max-width: 465px)': {
      width: '100%',
    },
  },
}));

const Content: CustomFC = () => {
  const { color, data } = useParentContext();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.text}>
        <Typography
          variant="body1"
          paragraph
          style={{
            color: transformObjectToRGB(color.new),
            background: 'rgba(0,0,0, 0.8)',
            padding: '1rem 2rem',
            borderRadius: '8px',
            maxWidth: '600px',
            margin: 0,
          }}
        >
          This page is created solely to showcase a portfolio developed using React and Typescript,
          with integration to the NEAR blockchain. To interact with the blockchain, a test wallet is
          required and can be obtained at{' '}
          <Link href="https://wallet.testnet.near.org">https://wallet.testnet.near.org</Link>. For
          further information and access to the source code, please refer to the repository at{' '}
          <Link href="https://github.com/AlexeyRokityan/near">
            https://github.com/AlexeyRokityan/near
          </Link>
          .
        </Typography>
      </div>
      {data?.id && (
        <div className={classes.container}>
          <div className={classes.colors}>
            <div
              className={classes.colorBlock}
              style={{ backgroundColor: transformObjectToRGB(color.old) }}
            >
              {transformObjectToRGB(color.old)}
            </div>
            <div
              className={classes.colorBlock}
              style={{ backgroundColor: transformObjectToRGB(color.new) }}
            >
              {transformObjectToRGB(color.new)}
            </div>
          </div>
          <ColorPicker />
        </div>
      )}
    </div>
  );
};

export default Content;
