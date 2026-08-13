import { useEffect, useRef, useState } from 'react';
import { useEvents } from '../hooks/useEvents';
import { dataIntegrityService } from '../services/dataIntegrityService';
import { dataManagementService } from '../services/dataManagementService';
import { mockEvents, mockOrganisers } from '../data/mockEvents';

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

// Module 5 (Data Layer) — tools for the persistence layer itself, not
// event content. Lets the team verify data integrity, back up/restore
// their working localStorage data, and reset to the seed demo state
// without touching devtools.
export function DataManagementPage() {
  const { refresh } = useEvents();
  const fileInputRef = useRef(null);
  const [stats, setStats] = useState(null);
  const [checkResult, setCheckResult] = useState(null);
  const [message, setMessage] = useState('');

  function refreshStats() {
    setStats(dataManagementService.getStats());
  }

  useEffect(refreshStats, []);

  function handleCheck() {
    setCheckResult(dataIntegrityService.check());
    setMessage('');
  }

  function handleRepair() {
    const result = dataIntegrityService.repair();
    setCheckResult(result);
    refresh();
    refreshStats();
    setMessage(result.healthy ? 'Repair complete — everything checks out now.' : 'Repair ran, but some issues remain.');
  }

  function handleExport() {
    const json = dataManagementService.exportAll();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `karibu-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage('Backup downloaded.');
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = dataManagementService.importAll(reader.result);
      setMessage(result.success ? 'Import successful.' : result.error);
      if (result.success) {
        refresh();
        refreshStats();
        setCheckResult(null);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function handleReset() {
    if (!confirm('Reset all data back to the seed demo data? This clears every booking and any events you created.')) return;
    const result = dataManagementService.resetToSeed(mockEvents, mockOrganisers);
    if (!result.success) {
      setMessage(result.error);
      return;
    }
    refresh();
    refreshStats();
    setCheckResult(null);
    setMessage('Reset to demo data.');
  }

  return (
    <section className="section">
      <div className="section-head">
        <h2 className="display">Data &amp; storage</h2>
        <span>Persistence tools</span>
      </div>

      {stats && (
        <div className="stat-row">
          <div className="stat-card"><span className="stat-num">{stats.events}</span><span>events</span></div>
          <div className="stat-card"><span className="stat-num">{stats.bookings}</span><span>bookings</span></div>
          <div className="stat-card"><span className="stat-num">{stats.notifications}</span><span>notifications</span></div>
          <div className="stat-card"><span className="stat-num">{stats.subscribers}</span><span>subscribers</span></div>
          <div className="stat-card"><span className="stat-num">{formatBytes(stats.approxBytes)}</span><span>in localStorage</span></div>
        </div>
      )}

      <div className="data-tools-grid">
        <div className="booking-card">
          <h3>Integrity check</h3>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 14 }}>
            Verifies ticket counts match actual bookings, and that no booking points at a deleted event.
          </p>
          <button className="btn-primary" style={{ width: '100%', marginBottom: 8 }} onClick={handleCheck}>
            Run check
          </button>

          {checkResult && (
            <div style={{ marginTop: 12 }}>
              {checkResult.healthy ? (
                <p style={{ color: 'var(--teal)', fontSize: 13 }}>✓ No issues found.</p>
              ) : (
                <>
                  <ul style={{ fontSize: 12.5, color: 'var(--text-dim)', paddingLeft: 18, marginBottom: 10 }}>
                    {checkResult.issues.map((issue, i) => <li key={i}>{issue}</li>)}
                  </ul>
                  <button className="btn-secondary" onClick={handleRepair}>Repair now</button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="booking-card">
          <h3>Backup &amp; restore</h3>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 14 }}>
            Export everything to a JSON file, or restore from one — useful before a demo, or to share a working dataset with the team.
          </p>
          <button className="btn-primary" style={{ width: '100%', marginBottom: 8 }} onClick={handleExport}>
            Export backup
          </button>
          <button className="btn-secondary" style={{ width: '100%' }} onClick={handleImportClick}>
            Import backup
          </button>
          <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImportFile} style={{ display: 'none' }} />
        </div>

        <div className="booking-card" style={{ borderColor: 'var(--danger)' }}>
          <h3 style={{ color: 'var(--danger)' }}>Danger zone</h3>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 14 }}>
            Wipes all bookings and any events you've created, and restores the original seed demo data.
          </p>
          <button
            className="btn-secondary"
            style={{ width: '100%', background: 'var(--danger)', color: '#2a0a0a' }}
            onClick={handleReset}
          >
            Reset to demo data
          </button>
        </div>
      </div>

      {message && <p style={{ color: 'var(--teal)', fontSize: 13, marginTop: 20 }}>{message}</p>}
    </section>
  );
}