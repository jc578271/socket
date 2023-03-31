import React, {memo} from 'react';
import {
  RootStackComponent,
  RootStack,
  MainStack,
  ModalStack,
  DrawerStack,
  TabBarStack,
  ModalStackComponent,
  MainStackComponent,
  TabBarStackComponent,
  DrawStackComponent,
} from '@true/routes';
import {TabBarIcon} from '@true/components';
import {IC_DOCUMENT, IC_DOCUMENT_OUTLINE} from '@true/assets';
import {View} from 'react-native';
import {PreloadScreen} from './screens';
import {HomeScreen} from '@/screens/HomeSceen';
import {NextScreen} from '@/screens/NextScreen';
import {PDFScreen} from '@/screens/PDFScreen';
import {PeerScreen} from '@/screens/PeerScreen';

const Tab = memo(() => {
  return (
    <TabBarStackComponent>
      <TabBarStack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          // @ts-ignore
          disabled: false,
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              isFocused={focused}
              icon={focused ? IC_DOCUMENT : IC_DOCUMENT_OUTLINE}
            />
          ),
        }}
      />
      <TabBarStack.Screen
        name={'Form'}
        component={NextScreen}
        options={{
          title: 'Form',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              isFocused={focused}
              icon={focused ? IC_DOCUMENT : IC_DOCUMENT_OUTLINE}
            />
          ),
        }}
      />
      <TabBarStack.Screen
        name={'PeerScreen'}
        component={PeerScreen}
        options={{
          title: 'PeerScreen',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              isFocused={focused}
              icon={focused ? IC_DOCUMENT : IC_DOCUMENT_OUTLINE}
            />
          ),
        }}
      />
    </TabBarStackComponent>
  );
});

const Drawer = memo(() => {
  return (
    <DrawStackComponent drawerContent={props => <View />}>
      <DrawerStack.Screen name={'Main'} component={Tab} />
    </DrawStackComponent>
  );
});

const Main = memo(() => {
  return (
    <MainStackComponent>
      <MainStack.Screen name={'Main'} component={Drawer} />
    </MainStackComponent>
  );
});

const Modal = memo(() => {
  return (
    <ModalStackComponent>
      <ModalStack.Screen name={'Main'} component={Main} />
    </ModalStackComponent>
  );
});

export const Routes = memo(() => {
  return (
    <RootStackComponent>
      <RootStack.Screen name={'PreloadScreen'} component={PreloadScreen} />
      <RootStack.Screen name={'Main'} component={Modal} />
    </RootStackComponent>
  );
});
