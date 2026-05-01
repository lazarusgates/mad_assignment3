'use client';

import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { CameraView, CameraType, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';


export default function VideoRecord() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [isRecording, setIsRecording] = useState(false);

  const cameraRef = useRef<CameraView>(null);

  if (!cameraPermission || !microphonePermission) {
    // Camera and microphone permissions are still loading.
    return <View />;
  }

  if (!cameraPermission.granted || !microphonePermission.granted) {
    // Camera or microphone permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to record audio and video.</Text>
        <Button onPress={requestCameraPermission} title="grant camera permission" />
        <Button onPress={requestMicrophonePermission} title="grant microphone permission" />
      </View>
    );
  }
  
  const toggleRecord = () => {
    setIsRecording(!isRecording);
    
    if(cameraRef.current) {
      if(isRecording) {
        cameraRef.current.stopRecording();
      } 
      else {
        cameraRef.current.recordAsync();
      }
    }
    
  };

  function saveVideo() {
    
  }

  // function toggleRecord() {
  //   setIsRecording(event.isRecording));
  // }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} mode="video" style={styles.camera} facing={facing} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleRecord}>
          <Text style={styles.text}>{isRecording ? 'Stop Recording' : 'Record'}</Text>
        </TouchableOpacity>
      </View>
      <Link href="/videoplay">Record video</Link>
    </View>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: 'center'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});