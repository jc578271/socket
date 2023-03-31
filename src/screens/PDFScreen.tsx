import React, {memo} from 'react';
import {ScreenWrapper} from '@true/components/ScreenWrap';
import {DynamicHeader} from '@true/components/Header/DynamicHeader';
import Pdf from 'react-native-pdf';

export const PDFScreen = memo(() => {
  return (
    <ScreenWrapper>
      <DynamicHeader title={'PDF Screen'} />
      <Pdf
        style={{width: 300, height: 600}}
        source={{
          uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
        }}
      />
    </ScreenWrapper>
  );
});
