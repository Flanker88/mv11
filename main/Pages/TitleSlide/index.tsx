import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import fonts from '../../constant/fonts';

const TitleSlide = ({route}) => {
  const {setTitle, setFontFamily} = route.params;
  const [title, setTitleInput] = useState('');
  const [fontFamily, setFontFamilyInput] = useState(fonts.semibold);
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
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.text}>Cancel</Text>
      </TouchableOpacity>
      <View style={styles.box}>
        <TextInput
          style={[styles.input, {fontFamily}]}
          placeholder="Enter title slide show"
          placeholderTextColor={'#999999'}
          value={title}
          onChangeText={setTitleInput}
        />
        <View style={styles.listFont}>
          <TouchableOpacity
            style={[
              styles.font1,
              {backgroundColor: selectedFont === 0 ? 'blue' : 'white'},
            ]}
            onPress={() => handleFontChange(fonts.bold, 0)}>
            <Image source={require('../../Assets/EditSlide/font1.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.font1,
              {backgroundColor: selectedFont === 1 ? 'blue' : 'white'},
            ]}
            onPress={() => handleFontChange(fonts.light, 1)}>
            <Image source={require('../../Assets/EditSlide/font2.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.font1,
              {backgroundColor: selectedFont === 2 ? 'blue' : 'white'},
            ]}
            onPress={() => handleFontChange(fonts.medium, 2)}>
            <Image source={require('../../Assets/EditSlide/font3.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.font1,
              {backgroundColor: selectedFont === 3 ? 'blue' : 'white'},
            ]}
            onPress={() => handleFontChange(fonts.regular, 3)}>
            <Image source={require('../../Assets/EditSlide/font4.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.font1,
              {backgroundColor: selectedFont === 4 ? 'blue' : 'white'},
            ]}
            onPress={() => handleFontChange(fonts.semibold, 4)}>
            <Image source={require('../../Assets/EditSlide/font5.png')} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.save} onPress={handleSave}>
          <Text style={styles.textSave}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TitleSlide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },

  font1: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 50,
  },
  listFont: {
    flexDirection: 'row',
  },
  input: {
    height: 70,
    width: '80%',
    marginBottom: 20,
    fontSize: 22,
    paddingHorizontal: 50,
    borderBottomWidth: 1,
    borderColor: '#107eff',
    //
  },
  back: {
    marginLeft: 20,
  },
  text: {
    fontSize: 16,
    color: '#0B7BFF',
  },
  save: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    width: '30%',
    backgroundColor: '#0B7BFF',
    marginTop: 20,
    borderRadius: 20,
  },
  textSave: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: fonts.light,
  },
});
