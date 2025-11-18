'use client';
import { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabase/client';
import type { Profile } from '@/lib/db/models/profiles';
import type { Project } from '@/lib/db/models/projects';
import type { Experience } from '@/lib/db/models/experiences';
import type { Achievement } from '@/lib/db/models/achievements';
import type { Post } from '@/lib/db/models/posts';
import type { SiteSettings } from '@/lib/db/models/siteSettings';

interface TestData {
  profiles: Profile[];
  projects: Project[];
  experiences: Experience[];
  achievements: Achievement[];
  posts: Post[];
  siteSettings: SiteSettings[];
}

export default function TestSupabasePage() {
  const [status, setStatus] = useState('checking...');
  const [data, setData] = useState<TestData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setStatus('Fetching data from all tables...');

        const [
          profilesRes,
          projectsRes,
          experiencesRes,
          achievementsRes,
          postsRes,
          siteSettingsRes,
        ] = await Promise.all([
          supabaseClient.from('profiles').select('*'),
          supabaseClient.from('projects').select('*'),
          supabaseClient.from('experiences').select('*'),
          supabaseClient.from('achievements').select('*'),
          supabaseClient.from('posts').select('*'),
          supabaseClient.from('site_settings').select('*'),
        ]);

        if (profilesRes.error) throw profilesRes.error;
        if (projectsRes.error) throw projectsRes.error;
        if (experiencesRes.error) throw experiencesRes.error;
        if (achievementsRes.error) throw achievementsRes.error;
        if (postsRes.error) throw postsRes.error;
        if (siteSettingsRes.error) throw siteSettingsRes.error;

        const testData: TestData = {
          profiles: profilesRes.data as Profile[],
          projects: projectsRes.data as Project[],
          experiences: experiencesRes.data as Experience[],
          achievements: achievementsRes.data as Achievement[],
          posts: postsRes.data as Post[],
          siteSettings: siteSettingsRes.data as SiteSettings[],
        };

        setData(testData);
        setStatus('✅ Supabase connected successfully!');
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        console.error(err);
        setError(errorMessage);
        setStatus('❌ Connection failed');
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      <p className="mb-6 text-lg">{status}</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {data && (
        <div className="space-y-6 text-black">
          <section className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">
              Profiles ({data.profiles.length})
            </h2>
            <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm">
              {JSON.stringify(data.profiles, null, 2)}
            </pre>
          </section>

          <section className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">
              Projects ({data.projects.length})
            </h2>
            <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm">
              {JSON.stringify(data.projects, null, 2)}
            </pre>
          </section>

          <section className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">
              Experiences ({data.experiences.length})
            </h2>
            <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm">
              {JSON.stringify(data.experiences, null, 2)}
            </pre>
          </section>

          <section className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">
              Achievements ({data.achievements.length})
            </h2>
            <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm">
              {JSON.stringify(data.achievements, null, 2)}
            </pre>
          </section>

          <section className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">
              Posts ({data.posts.length})
            </h2>
            <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm">
              {JSON.stringify(data.posts, null, 2)}
            </pre>
          </section>

          <section className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">
              Site Settings ({data.siteSettings.length})
            </h2>
            <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm">
              {JSON.stringify(data.siteSettings, null, 2)}
            </pre>
          </section>
        </div>
      )}

      {!data && !error && <div className="text-gray-500">Loading data...</div>}
    </div>
  );
}
