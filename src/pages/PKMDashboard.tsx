import React from 'react';
import { NotesDashboard } from '../components/pkm/NotesDashboard';
import { ProtectedRoute } from '../components/pkm/ProtectedRoute';

const PKMDashboard: React.FC = () => {
  return (
    <ProtectedRoute>
      <NotesDashboard />
    </ProtectedRoute>
  );
};

export default PKMDashboard;