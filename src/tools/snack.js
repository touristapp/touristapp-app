import { snacks } from '../styles/themes/variables'
import { useStateValue } from '../hooks/state';

export default Snack = {
    success: (message,showSnack,dispatch) => {
        dispatch({type: 'showSnackbar',snack: !showSnack});
        dispatch({type: 'snackContent', setSnack:{style:snacks.SUCCESS.style,theme: snacks.SUCCESS.theme,message: message}});
    },
    warning: (message,showSnack,dispatch) => {
        dispatch({type: 'showSnackbar',snack: !showSnack});
        dispatch({type: 'snackContent', setSnack:{style:snacks.WARNING.style,theme: snacks.WARNING.theme,message: message}});
    },
    danger: (message,showSnack,dispatch) => {
        dispatch({type: 'showSnackbar',snack: !showSnack});
        dispatch({type: 'snackContent', setSnack:{style:snacks.DANGER.style,theme: snacks.DANGER.theme,message: message}});
    },
}
