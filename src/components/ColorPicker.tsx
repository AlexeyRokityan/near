import React, { useState } from 'react';
import { NUMBER_FRACTIONAL_COUNT, useParentContext } from './context';
import { ChromePicker, ColorChangeHandler } from 'react-color';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { utils } from 'near-api-js';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
    '@media (max-width: 465px)': {
      padding: '0 0 2rem',
    },
  },
  picker: {
    position: 'relative',
    margin: '0 0 20px',
  },
  colorPicker: {
    '@media (max-width: 465px)': {
      minWidth: '100%',
    },
  },
  loader: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(255,255,255, 0.6)',
  },
}));

const ColorPicker: CustomFC = () => {
  const { contract, color, setColor, wallet, setData, data } = useParentContext();
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const handleChangeColor = async () => {
    if (color?.new && !isLoading) {
      setIsLoading(true);
      await contract?.set(color.new).then(async () => {
        setColor({ ...color, old: color.new });
        setIsLoading(false);
        const balance = await wallet?.account().getAccountBalance();
        setData({
          ...data,
          balance: utils.format.formatNearAmount(balance?.total || '', NUMBER_FRACTIONAL_COUNT),
        });
      });
    }
  };

  const handleColorChange: ColorChangeHandler = value => {
    const { r, g, b } = value.rgb;
    setColor({ ...color, new: { r, g, b } });
  };

  const isDisabled = JSON.stringify(color.new) === JSON.stringify(color.old);

  return (
    <div className={classes.root}>
      <div className={classes.picker}>
        <ChromePicker
          className={classes.colorPicker}
          disableAlpha
          color={color?.new}
          onChange={handleColorChange}
        />
        {isLoading && (
          <div className={classes.loader}>
            <CircularProgress color="secondary" />
          </div>
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleChangeColor}
        disabled={isLoading || isDisabled}
      >
        Set RGB
      </Button>
    </div>
  );
};

export default ColorPicker;
