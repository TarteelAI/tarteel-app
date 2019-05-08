import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    alignItems: 'center'
  },
  innerContainer: {
    flex: 1,
    padding: 25,
    marginTop: 150
  },
  messageContainer: {
    padding: 35,
    marginTop: 60,
    borderRadius: 40,
    backgroundColor: Colors.primary
  },
  textInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20
  },
  textInput: {
    backgroundColor: Colors.secondary,
    color: Colors.snow,
    shadowRadius: 0,
    shadowOpacity: 0,
    width: '100%',
    textAlign: 'center'
  },
  title: {
    color: Colors.secondary,
    fontSize: 30,
    fontFamily: 'Proxima-Nova-Alt-Regular',
    fontWeight: 'bold'
  },
  subTitle: {
    color: Colors.secondary,
    fontSize: 18,
    fontFamily: 'Proxima-Nova-Alt-Regular',
    textAlign: 'center'
  },
  text: {
    color: Colors.border,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Proxima-Nova-Alt-Regular',
    marginVertical: 20,
    marginLeft: 5
  },
  paragraph: {
    color: Colors.snow,
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Proxima-Nova-Alt-Regular',
    textAlign: 'center'
  },
  figure: {
    position: 'absolute',
    height: 80,
    alignSelf: 'center',
    resizeMode: 'contain',
    bottom: 50
  },
  primaryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 40,
    height: 45
  },
  buttonText: {
    color: Colors.snow,
    padding: 10,
    marginHorizontal: 20
  }
})
