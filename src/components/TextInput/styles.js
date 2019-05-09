import { Colors } from '../../Themes'

export default {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  input: {
    backgroundColor: 'white',
    width: '50%',
    height: 45,
    borderRadius: 40,
    paddingHorizontal: 20,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 1.5
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    color: Colors.border,
    marginRight: 7
  },
  error: {
    fontSize: 15,
    textAlign: 'right',
    color: Colors.red,
    marginRight: 10
  }
}
