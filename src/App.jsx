import React from 'react';
import DigestLayout from './components/DigestLayout';
import digestData from '../2026-06-15-digest.json';

export default function App() {
  return <DigestLayout digest={digestData} />;
}
