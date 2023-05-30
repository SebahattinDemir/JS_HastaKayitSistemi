import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
import DatePicker from 'react-native-datepicker';

const db = DatabaseConnection.getConnection();

const HastaEkle = ({ navigation }) => {
  let [userName, setUserName] = useState('');
  let [userDoktor, setUserDoktor] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let [userTarih, setUserTarih] = useState('');

  let hasta_ekle = () => {
    console.log(userName, userDoktor, userContact, userAddress, userTarih);

    if (!userName) {
      alert('Please fill in the isim!');
      return;
    }
    if (!userDoktor) {
      alert('Please fill in the doktor adi!');
      return;
    }
    if (!userContact) {
      alert('Please fill in the telefon numarası');
      return;
    }
    if (!userAddress) {
      alert('Please fill in the adres!');
      return;
    }
    if (!userTarih) {
      alert('Please fill in the randevu tarihi!');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_doktor, user_contact, user_address, user_tarih) VALUES (?,?,?,?,?)',
        [userName, userDoktor, userContact, userAddress, userTarih],
        (tx, results) => {
          console.log('Sonuçlar', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Başarılı',
              'Hasta Eklendi !!!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Error trying to register User !!!');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}
            >
              <Mytextinput
                placeholder="Hasta Adı Soyadı"
                onChangeText={(userName) => setUserName(userName)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Hasta Telefonu"
                onChangeText={(userContact) => setUserContact(userContact)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Hasta Adresi"
                onChangeText={(userAddress) => setUserAddress(userAddress)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mytextinput
                placeholder="Randevu Alınan Doktor"
                onChangeText={(userDoktor) => setUserDoktor(userDoktor)}
                style={{ padding: 10 }}
              />
              <DatePicker
                style={{ width: '50%', marginBottom: 5 }}
                date={userTarih}
                mode="date"
                placeholder="Randevu Tarihi"
                format="DD/MM/YYYY"
                minDate="01/01/1900"
                maxDate="01/01/2100"
                confirmBtnText="Tamam"
                cancelBtnText="İptal"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 2,
                    marginTop: 10,
                  },
                  dateInput: {
                    marginLeft: 36,
                    marginTop: 20,
                  },
                }}
                onDateChange={(date) => setUserTarih(date)}
              />
              <Mybutton title="Kaydet" customClick={hasta_ekle} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HastaEkle;