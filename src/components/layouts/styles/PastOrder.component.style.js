import { StyleSheet } from 'react-native';
import { COLORS } from '../../contants';


export default StyleSheet.create({
  Contanier: {
    width: '100%',
    marginTop: '5%'
  },
  headline: {
    fontSize: 30,
    marginBottom: '5%',
    marginLeft: '1%'
  },
  header: {
    flexDirection: 'row',
  },
  hambugerMenu: {
    width: 23,
    height: 23,
    marginTop: '9%',
    marginLeft: '20%'
  },
  viewRestaurants: {
    width: '82%',
    height: 220,
    backgroundColor: 'white',
    marginTop: '9%',
    marginLeft: '9%',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  orderMenu: {
    borderColor: COLORS.black,
    borderWidth: 1,
  },
  note: {
    height: 200,
    width:'80%',
    marginLeft:'10%',
    paddingLeft: '1%',
    paddingTop: '1%',
    marginTop: '5%',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: COLORS.lightGray2,
  },
  kunde: {
    fontSize: 25,
    alignSelf: 'center',
    marginBottom: '2%'
  },
  noteScroll: {
    height: 140,
    width: '90%',
  },
  noteText: {
    fontSize: 20
  },
  foodlist: {
    width: '90%',
    height: 250,
    marginTop: '2%',
  },
  listView: {
    borderWidth: 1,
    paddingTop: '1%',
    height: 250,
  },
  order: {
    fontSize: 30,
    alignSelf: 'center',
    paddingTop: '1%'
  },
  items: {
    borderWidth: 1,
    borderColor: COLORS.black,
    marginBottom: '1%',
    paddingLeft: '1%',
    marginLeft: '6%',
    fontSize: 20,
    width: '94%'
  },
  address: {
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: '2%'
  },
  addressText:{
    fontSize: 15,
    alignSelf: 'center',
    marginTop: '10%'
  },
  standart:{
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: '2%'
  },
  orderBtn:{
    alignSelf: 'center',
    padding:15,
    paddingLeft:'10%',
    paddingRight:'10%',
    backgroundColor:COLORS.logoGreen,
    borderRadius:20,
    marginTop:'20%'

  }
});