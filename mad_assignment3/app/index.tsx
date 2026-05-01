'use client';

import { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Link } from 'expo-router';


export default function VideoScreen() {
  return (
    <View style={styles.contentContainer}>
      <Link href="/videoplay">Record video</Link>
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