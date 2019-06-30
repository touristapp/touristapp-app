import { snacks } from '../styles/themes/variables'
import { useStateValue } from '../hooks/state';

export default Snack = {
    success: function(message,showSnack,dispatch) {
        dispatch({type: 'showSnackbar',snack: !showSnack});
        dispatch({type: 'snackContent', setSnack:{style:snacks.SUCCESS.style,theme: snacks.SUCCESS.theme,message: message}});
    },
    warning: function(message,showSnack,dispatch) {
        dispatch({type: 'showSnackbar',snack: !showSnack});
        dispatch({type: 'snackContent', setSnack:{style:snacks.WARNING.style,theme: snacks.WARNING.theme,message: message}});
    },
    danger: function(message,showSnack,dispatch) {
        dispatch({type: 'showSnackbar',snack: !showSnack});
        dispatch({type: 'snackContent', setSnack:{style:snacks.DANGER.style,theme: snacks.DANGER.theme,message: message}});
    },
}
