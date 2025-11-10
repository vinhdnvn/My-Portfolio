'use client';
import { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabase/client';

export default function TestSupabasePage() {
  const [status, setStatus] = useState('checking...');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabaseClient.from('profiles').select('*').limit(1);
        if (error) throw error;
        setStatus('✅ Supabase connected successfully!');
        setData(data);
        console.log(data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        setStatus('❌ Connection failed: ' + err.message);
      }
    };
    checkConnection();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold">Supabase Connection Test</h1>
      <p className="mt-4">{status}</p>
      <p className="mt-2 text-sm text-gray-500">
        {data ? JSON.stringify(data) : 'No data retrieved'}
      </p>
    </div>
  );
}
