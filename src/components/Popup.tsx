import React, { useEffect, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import qs from 'qs';

const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

const WalletConnectSuccessModal: CustomFC = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (params.status === 'success' || params.status === 'failed') {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        window.history.replaceState(null, '', window.location.pathname);
      }, 3000);
    }
  }, [params.status]);

  return (
    <Snackbar open={showSnackbar}>
      <Alert severity={params.status === 'success' ? 'success' : 'error'}>
        {params.status === 'success'
          ? 'Connection to wallet successful'
          : 'Connection to wallet failed'}
      </Alert>
    </Snackbar>
  );
};

export default WalletConnectSuccessModal;
