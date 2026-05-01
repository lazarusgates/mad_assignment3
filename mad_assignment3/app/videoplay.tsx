'use client';

import { useState, useEffect } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Link } from 'expo-router';

const videoSource = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

export default function VideoScreen() {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
  });

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const subscription = player.addListener('playingChange', (event) => {
      setIsPlaying(event.isPlaying);
    });
    return () => subscription.remove();
  }, [player]);

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>Video Player</Text>

      <VideoView
        style={styles.video}
        player={player}
        nativeID="video-view"
        allowsPictureInPicture={true}
      />

      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>

      <Text style={styles.status}>Status: {isPlaying ? 'Playing' : 'Paused'}</Text>

      <View style={styles.controlsContainer}>
        <Link href="/">
          Record new video
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  video: {
    width: 350,
    height: 200,
    backgroundColor: '#000',
  },
  controlsContainer: {
    padding: 10,
    flexDirection: 'row',
    gap: 10,
  },
  status: {
    marginTop: 10,
    fontSize: 14,
  },
});