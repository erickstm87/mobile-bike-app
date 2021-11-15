import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, FlatList, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Notifications from 'expo-notifications';
import registerForPushNotificationsAsync from './registration';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [notificationReady, setNotificationReady] = useState(false)
  const [theNotification, setNotification] = useState({})

  useEffect(async () => {
    await registerForPushNotificationsAsync();
    await Notifications.addNotificationReceivedListener(_handleNotification);
    await Notifications.addNotificationResponseReceivedListener(_handleNotificationResponse);
  }, []);

  const _handleNotification = async notification => {
    console.log('calling handle notify');
  }
  
  const _handleNotificationResponse = async response => {
    setNotification(response.notification)
    setNotificationReady(true)
  }
  const _handleBack = () => {
    setNotificationReady(false)
  }

  const _customFunc = async (link) => {
    const supported = await Linking.canOpenURL(link)
    supported ? await Linking.openURL(link) : Alert.alert('cannot do it')
  }

  return(
    
     <View style={{flex: 1}}>   
        {
          !notificationReady &&
          <WebView 
            cacheEnabled={false}
            style={styles.container}
            source={{uri: 'https://bike-check-92c8f.web.app/'}}
          />
        }
        {
          notificationReady && 
         <View style={ moreStyles.container }>
              <FlatList
                data={[
                  {key: theNotification.request.content.title},
                  // {key: theNotification.request.content.data.myLink}
                ]}
                renderItem={({item}) => 
                <Text   style={moreStyles.item}>
                  {item.key}
                  
                </Text>}
                
              />
              <Button onPress={_handleBack} title="Back" style={{marginTop: '30%'}} /> 
          </View>
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
});

const moreStyles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 150
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});