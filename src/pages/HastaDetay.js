import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const HastaDetayScreen = () => {
  let [inputUserId, setInputUserId] = useState('');
  let [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(inputUserId);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert('Hasta kaydı bulunamadı !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Hasta Filtreleme" />
          <Mytextinput
            placeholder="Kayıt No"
            onChangeText={
              (inputUserId) => setInputUserId(inputUserId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Arama" customClick={searchUser} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>Adı Soyadı : {userData.user_name}</Text>
            <Text>Telefon : {userData.user_contact}</Text>
            <Text>Adres : {userData.user_address}</Text>
            <Text>Randevu Alınan Doktor : {userData.user_doktor}</Text>
            <Text>Randevu Tarihi : {userData.user_tarih}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HastaDetayScreen;