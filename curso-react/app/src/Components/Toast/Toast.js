import React, {Fragment} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";


export default ({open, handleClose, children, severity}) => (
    <Snackbar open={open}
              onClose={handleClose}
              message='Snackbar funcionando'
              autoHideDuration={2000}>

        <Alert onClose={handleClose}
               severity={severity}
               variante='filled'>
            {children}
        </Alert>
    </Snackbar>
);