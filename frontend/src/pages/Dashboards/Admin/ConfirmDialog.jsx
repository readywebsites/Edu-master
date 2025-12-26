import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', confirmColor = '#dc3545', loading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1001
    }}>
      <div className="modal-content" style={{
        background: 'white', padding: '2rem', borderRadius: '12px', width: '400px', textAlign: 'center'
      }}>
        <div style={{
          width: '60px', height: '60px', borderRadius: '50%', background: '#fff3e0',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'
        }}>
          <AlertTriangle size={30} color="#ff9800" />
        </div>

        <h3 style={{ margin: '0 0 0.5rem' }}>{title}</h3>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>{message}</p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={onClose} style={{
            padding: '0.6rem 1.5rem', background: '#f1f3f4', border: 'none',
            borderRadius: '6px', cursor: 'pointer', fontWeight: 500
          }}>
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading} style={{
            padding: '0.6rem 1.5rem', background: confirmColor, color: 'white',
            border: 'none', borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 500
          }}>
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
