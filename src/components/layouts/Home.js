import * as React from 'react';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles/Home.component.style';
import {icons, images} from '../contants';


const Home = ({navigation: {navigate}}) => {
  const [zipCode, setSearchQuery] = React.useState('');

  const onPressSearch = () => {
    navigate('Restaurant', {
      zipCode: zipCode
    });
  }

  return (
    <View style={{marginTop: 100}}>
      <Image
        style={styles.Logo}
        source={images.logo}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          onChangeText={text => setSearchQuery(text)}
          value={zipCode}
          placeholder="Søg efter postnummer"
          maxLength={4}
        />
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={onPressSearch}
        >
          <Image
            style={styles.searchLogo}
            source={icons.search}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

