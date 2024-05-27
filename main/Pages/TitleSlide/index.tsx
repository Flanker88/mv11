import React, { useState } from 'react';
import { 
    View, 
    Text,
    TextInput,
    StyleSheet, 
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TitleSlide = ({route}) => {
  const { setTitle, setFontFamily } = route.params;
  const [title, setTitleInput] = useState('');
  const [fontFamily, setFontFamilyInput] = useState('josefin-slab-latin-700-normal');
  const [selectedFont, setSelectedFont] = useState(0);
  const navigation = useNavigation();

  const handleSave = () => {
    setTitle(title);
    setFontFamily(fontFamily);
    navigation.goBack();
  };

  const handleFontChange = (font, index) => {
    setFontFamilyInput(font);
    setSelectedFont(index);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.text}>Cancel</Text>
      </TouchableOpacity>
      <View style={styles.box}>
      <TextInput
        style={[styles.input, { fontFamily }]}
        placeholder="Enter title slide show"
        placeholderTextColor={'#999999'}
        value={title}
        onChangeText={setTitleInput}
      />
        <View style={styles.listFont}>
        <TouchableOpacity style={styles.font1} onPress={() => handleFontChange('josefin-slab-latin-700-normal', 0)}>
            <Image source={selectedFont === 0 ? require('../../Assets/EditSlide/Blue.png') : require('../../Assets/EditSlide/White.png')} />
            <Image style={styles.font} source={require('../../Assets/EditSlide/font1.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.font1} onPress={() => handleFontChange('AkayaKanadaka-Regular', 1)}>
            <Image source={selectedFont === 1 ? require('../../Assets/EditSlide/Blue.png') : require('../../Assets/EditSlide/White.png')} />
            <Image style={styles.font} source={require('../../Assets/EditSlide/font2.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.font1} onPress={() => handleFontChange('SFPro-Regular', 2)}>
            <Image source={selectedFont === 2 ? require('../../Assets/EditSlide/Blue.png') : require('../../Assets/EditSlide/White.png')} />
            <Image style={styles.font} source={require('../../Assets/EditSlide/font3.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.font1} onPress={() => handleFontChange('Jua-Regular', 3)}>
            <Image source={selectedFont === 3 ? require('../../Assets/EditSlide/Blue.png') : require('../../Assets/EditSlide/White.png')} />
            <Image style={styles.font} source={require('../../Assets/EditSlide/font4.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.font1} onPress={() => handleFontChange('Karantina-Regular', 4)}>
            <Image source={selectedFont === 4 ? require('../../Assets/EditSlide/Blue.png') : require('../../Assets/EditSlide/White.png')} />
            <Image style={styles.font} source={require('../../Assets/EditSlide/font5.png')} />
          </TouchableOpacity>

        </View>
      <TouchableOpacity style={styles.save} onPress={handleSave}>
        <Image source={require('../../Assets/EditSlide/Save.png')} />
        <Text style={styles.textSave}>Save</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default TitleSlide;

const styles = StyleSheet.create({
  container: {
    flex : 1,
  },
  box : {
    justifyContent : 'center',
    alignItems : 'center',
    marginTop : 100,
  },
  font : {
    position : 'absolute',
    top : 15,
  },
  font1 : {
    width : 50,
    height : 50,
    justifyContent : 'center',
    alignItems : 'center',
    marginHorizontal  : 10,
    
  },
  listFont : {
    flexDirection : 'row',
  },
  input: {
    height: 70,
    width: '80%',
    marginBottom: 20,
    fontSize : 22,
    paddingHorizontal: 50,
    borderBottomWidth : 1,
    borderColor : '#107eff',
    //fontFamily : 'josefin-slab-latin-700-normal',
  },
  back : {
    marginLeft : 20,
    marginTop : 40,
  },
  text : {
    fontSize : 16,
    fontFamily : 'josefin-slab-latin-700-normal',
    color : '#0B7BFF'
  },
  save : {
    alignItems : 'center'
  },
  textSave : {
    fontSize : 20,
    fontFamily : 'josefin-slab-latin-700-normal',
    position : 'absolute',
    color : '#FFFFFF',
    marginTop : 22,
  }
})