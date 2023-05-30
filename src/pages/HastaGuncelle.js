import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import DatePicker from 'react-native-datepicker';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const HastaGuncelle = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState('');
  let [userName, setUserName] = useState('');
  let [userDoktor, setUserDoktor] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let [userTarih, setUserTarih] = useState('');

  let updateAllStates = (name, contact, address, doktor, tarih) => {
    setUserName(name);
    setUserContact(contact);
    setUserAddress(address);
    setUserDoktor(doktor);
    setUserTarih(tarih);
  };

  let searchUser = () => {
    console.log(inputUserId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.user_name,
              res.user_contact,
              res.user_address,
              res.user_doktor,
              res.user_tarih
            );
          } else {
            alert('Hasta bulunamadı!');
            updateAllStates('', '', '', '', '');
          }
        }
      );
    });
  };

  let updateUser = () => {
    console.log(inputUserId, userName, userContact, userAddress, userDoktor, userTarih);

    if (!inputUserId) {
      alert('Kod!');
      return;
    }
    if (!userName) {
      alert('Ad Soyad!');
      return;
    }
    if (!userContact) {
      alert('Telefon!');
      return;
    }
    if (!userAddress) {
      alert('Adres!');
      return;
    }
    if (!userDoktor) {
      alert('Doktor Bilgisi!');
      return;
    }
    if (!userTarih) {
      alert('Tarih!');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_user SET user_name=?, user_contact=?, user_address=?, user_doktor=?, user_tarih=? WHERE user_id=?',
        [userName, userContact, userAddress, userDoktor, userTarih, inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Başarılı',
              'Hasta Güncellendi!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Error updating user');
          }
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
              <Mytext text="Hasta Filtreleme" />
              <Mytextinput
                placeholder="Kayıt Numarası Gir"
                style={{ padding: 10 }}
                onChangeText={(inputUserId) => setInputUserId(inputUserId)}
              />
              <Mybutton title="Hasta Ara" customClick={searchUser} />
              <Mytextinput
                placeholder="Hasta Adı Soyadı"
                value={userName}
                style={{ padding: 10 }}
                onChangeText={(userName) => setUserName(userName)}
              />
              <Mytextinput
                placeholder="Hasta Telefonu"
                value={userContact}
                onChangeText={(userContact) => setUserContact(userContact)}
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                value={userAddress}
                placeholder="Hasta Adresi"
                onChangeText={(userAddress) => setUserAddress(userAddress)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mytextinput
                placeholder="Randevu Alınan Doktor"
                value={userDoktor}
                style={{ padding: 10 }}
                onChangeText={(userDoktor) => setUserDoktor(userDoktor)}
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
              <Mybutton title="Güncelle" customClick={updateUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HastaGuncelle;