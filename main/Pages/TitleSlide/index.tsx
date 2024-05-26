import React, { useState } from 'react';
import { 
    View, 
    Text,
    TextInput,
    StyleSheet, 
    Button, 
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TitleSlide = ({route}) => {
  const { setTitle } = route.params;
  const [title, setTitleInput] = useState('');
  const navigation = useNavigation();

  const handleSave = () => {
    setTitle(title);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.text}>Cancel</Text>
      </TouchableOpacity>
      <View style={styles.box}>
      <TextInput
        style={styles.input}
        placeholder="Enter title slide show"
        placeholderTextColor={'#999999'}
        value={title}
        onChangeText={setTitleInput}
      />
        <View style={styles.listFont}>
          <TouchableOpacity style={styles.font1}>
            <Image source={require('../../Assets/EditSlide/White.png')} />
            <Image style={styles.font} source={require('../../Assets/EditSlide/font1.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.font1}>
            <Image source={require('../../Assets/EditSlide/White.png')} />
            <Image style={styles.font} source={require('../../Assets/EditSlide/font2.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.font1}>
            <Image source={require('../../Assets/EditSlide/White.png')} />
            <Image style={styles.font} source={require('../../Assets/EditSlide/font3.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.font1}>
            <Image source={require('../../Assets/EditSlide/White.png')} />
            <Image style={styles.font} source={require('../../Assets/EditSlide/font4.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.font1}>
            <Image source={require('../../Assets/EditSlide/White.png')} />
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
    position : 'absolute'
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
    borderColor : '#107eff'
  },
  back : {
    marginLeft : 20,
    marginTop : 40,
  },
  text : {
    fontSize : 16,
    fontWeight : '700',
    color : '#0B7BFF'
  },
  save : {
    alignItems : 'center'
  },
  textSave : {
    fontSize : 16,
    fontWeight : '700',
    fontFamily : 'Josefin Slab',
    position : 'absolute',
    color : '#FFFFFF',
    marginTop : 22,
  }
})