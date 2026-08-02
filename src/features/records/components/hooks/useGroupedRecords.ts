// hooks/useGroupedRecords.ts
import { useMemo } from 'react';
import { Record } from '../../../../types';

export const useGroupedRecords = (records: Record[], searchTerm: string) => {
  return useMemo(() => {
    const filtered = records.filter(r => 
      r.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groups: Record<string, Record[]> = {};
    filtered.forEach(record => {
      const date = new Date(record.created_at || '').toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      if (!groups[date]) groups[date] = [];
      groups[date].push(record);
    });

    return groups;
  }, [records, searchTerm]);
};