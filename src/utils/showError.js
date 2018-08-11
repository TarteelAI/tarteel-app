import {showSnackBar} from '../components/SnackBar'

export default (msg) => {
  showSnackBar({
          message: msg,
          textColor: '#FFF',      // message text color
          position: 'bottom',  // enum(top/bottom).
          // confirmText: 'OK', // button text.
          buttonColor: '#03a9f4', // default button text color
          duration: 4000,   // (in ms), duartion for which snackbar is visible.
          animationTime: 250, // time duration in which snackbar will complete its open/close animation.
          backgroundColor:"crimson", //background color for snackbar
          onConfirm: () => {},    //  perform some task here on snackbar button press.
  });
}
