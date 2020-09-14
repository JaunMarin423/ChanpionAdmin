import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Input, Text, Button      } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import ModalDropdown from 'react-native-modal-dropdown';
const { width } = Dimensions.get('screen');

class Sala extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          <Block flex row>
            <Text p>Dispositivo de audio:  </Text>
            <ModalDropdown options={['audio-section', 'option 2']}/>
          </Block>
          <Block flex row>
            <Text p>Dispositivo de video:  </Text>
            <ModalDropdown options={['audio-section', 'option 2']}/>
          </Block>
        <Input placeholder="Nombre" color={theme.COLORS.WARNING} style={{ borderColor: theme.COLORS.WARNING }} placeholderTextColor={theme.COLORS.WARNING}/>
        <Button color="success">Iniciar transmisión</Button>
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});


function getStreem() {
  if(window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
    const audioSource = audioSelect.value;
    const videoSource = videoSelect.value;
    const constraints = {
        audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
        video: { deviceId: videoSource ? { exact: videoSource } : undefined }
    };
    return navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
            window.stream = stream;

            audioSelect.selectedIndex = [...audioSelect.options].findIndex(
                option => option.text === stream.getAudioTracks()[0].label
            );
            videoSelect.selectedIndex = [...videoSelect.options].findIndex(
                option => option.text === stream.getVideoTracks()[0].label
            );

            videoElement.srcObject = window.stream;
        })
        .catch((error) => console.error("Error: ", error));
}

const data = [
  {
    title: "Dispositivo de audio",
    content: "Microphone 1",
    icon: {
      name: 'keyboard-arrow-up',
      family: 'material',
      size: 16,
    } 
  },
  { title: "Dispositivo de audio", content: "Lorem ipsum dolor sit amet" },
  { title: "Dispositivo de audio", content: "Lorem ipsum dolor sit amet" }
];

export default Sala;
