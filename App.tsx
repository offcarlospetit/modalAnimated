import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput
} from 'react-native';
import { ActionSeeht } from './src/components/actionSheet';
import 'intl';
import 'intl/locale-data/jsonp/en-IN';
import 'intl/locale-data/jsonp/en';
const { width, height } = Dimensions.get('window');
export interface AppProps { }

function App(props: AppProps) {
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const onAnimationEnd = () => {
    setVisible(false);
    setEnabled(true);
  };
  const openModal = () => {
    setEnabled(!enabled);
    setVisible(!visible);
  };

  return (
    <View style={{ width, height }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => (enabled ? openModal() : null)}>
          <Text style={{ color: enabled ? 'black' : '#ffff' }}>App</Text>
        </TouchableOpacity>
      </View>
      <ActionSeeht
        visible={visible}
        onAnimationEnd={onAnimationEnd}
        onAnimationCloseEnd={onAnimationEnd}>
        <Text>Holas</Text>
      </ActionSeeht>
    </View>
  );
}

export default App;
