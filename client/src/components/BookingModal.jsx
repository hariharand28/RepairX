// src/components/BookingModal.jsx
import { useState, useEffect } from "react";
import { supabase } from "../supabase";

const modalStyle = `
  @keyframes modalIn {
    from { opacity:0; transform:scale(0.96) translateY(12px); }
    to   { opacity:1; transform:scale(1)    translateY(0); }
  }
  @keyframes backdropIn {
    from { opacity:0; } to { opacity:1; }
  }
  .modal-card {
    animation: modalIn 0.35s cubic-bezier(0.22,1,0.36,1) both;
    background: rgba(12,12,20,0.85);
    backdrop-filter: blur(32px) saturate(1.5);
    -webkit-backdrop-filter: blur(32px) saturate(1.5);
    border: 1px solid rgba(255,255,255,0.11);
    box-shadow: 0 24px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07);
  }
  .modal-input {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.10);
    backdrop-filter: blur(8px);
    transition: border-color 0.2s, background 0.2s;
    width: 100%;
    box-sizing: border-box;
  }
  .modal-input:focus {
    outline: none;
    border-color: rgba(255,255,255,0.28);
    background: rgba(255,255,255,0.08);
  }
  .modal-btn-primary {
    background: linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06));
    border: 1px solid rgba(255,255,255,0.18);
    transition: all 0.22s ease;
  }
  .modal-btn-primary:hover:not(:disabled) {
    background: linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.10));
    border-color: rgba(255,255,255,0.32);
    box-shadow: 0 4px 20px rgba(255,255,255,0.07);
  }
`;

function Field({ label, children }) {
  return (
    <div>
      <label style={{ display:"block", fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginBottom:9 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function BookingModal({ service, user, onClose, onSuccess }) {
  const [address, setAddress]   = useState("");
  const [date, setDate]         = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  // Close on Escape
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const minDate = new Date().toISOString().split("T")[0];

  async function handleConfirm() {
    if (!address.trim()) { setError("Please enter your address."); return; }
    if (!date)           { setError("Please choose a preferred date."); return; }
    setError(null);
    setLoading(true);

    const { error: dbErr } = await supabase
      .from("bookings")
      .insert({
        user_id:      user.id,
        service_id:   service.id,
        status:       "pending",
        booking_date: new Date(date).toISOString(),
        address:      address.trim(),
      });

    setLoading(false);
    if (dbErr) { setError(dbErr.message); return; }
    onSuccess();
  }

  const inputShared = {
    padding:"12px 14px", borderRadius:2,
    fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:300,
    color:"rgba(255,255,255,0.85)", letterSpacing:"0.04em",
  };

  return (
    <>
      <style>{modalStyle}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position:"fixed", inset:0, zIndex:50,
          background:"rgba(0,0,0,0.65)",
          backdropFilter:"blur(4px)",
          animation:"backdropIn 0.25s ease both",
          display:"flex", alignItems:"center", justifyContent:"center", padding:20,
        }}
      >
        {/* Card — stop propagation so clicks inside don't close */}
        <div className="modal-card" onClick={e=>e.stopPropagation()} style={{ width:"100%", maxWidth:420, borderRadius:6, padding:"36px 32px 32px", position:"relative" }}>

          {/* Close */}
          <button onClick={onClose} style={{ position:"absolute", top:18, right:20, background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.25)", fontSize:16, lineHeight:1, transition:"color 0.2s" }}
            onMouseEnter={e=>e.target.style.color="rgba(255,255,255,0.6)"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.25)"}>✕</button>

          {/* Header */}
          <div style={{ marginBottom:28 }}>
            <p style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.26em", color:"rgba(255,255,255,0.25)", textTransform:"uppercase", marginBottom:8 }}>Confirm Booking</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:26, fontWeight:300, color:"rgba(255,255,255,0.90)", lineHeight:1.15 }}>{service.name}</h2>
            <div style={{ marginTop:4, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"rgba(255,255,255,0.30)" }}>
                from ${Number(service.base_price).toLocaleString("en-US",{minimumFractionDigits:2})}
              </span>
              <span style={{ width:3, height:3, borderRadius:"50%", background:"rgba(255,255,255,0.15)" }} />
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(99,102,241,0.70)", textTransform:"uppercase", letterSpacing:"0.12em" }}>{service.category}</span>
            </div>
            <div style={{ marginTop:14, height:1, background:"rgba(255,255,255,0.07)" }} />
          </div>

          {/* Error */}
          {error && (
            <div style={{ marginBottom:18, padding:"10px 13px", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.22)", borderRadius:2 }}>
              <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#f87171", margin:0 }}>{error}</p>
            </div>
          )}

          {/* Fields */}
          <div style={{ display:"flex", flexDirection:"column", gap:18, marginBottom:24 }}>
            <Field label="Delivery Address">
              <textarea
                value={address}
                onChange={e=>setAddress(e.target.value)}
                placeholder="Building, street, city…"
                rows={3}
                className="modal-input"
                style={{ ...inputShared, resize:"none", lineHeight:1.6 }}
              />
            </Field>

            <Field label="Preferred Date">
              <input
                type="date"
                value={date}
                min={minDate}
                onChange={e=>setDate(e.target.value)}
                className="modal-input"
                style={{ ...inputShared, colorScheme:"dark" }}
              />
            </Field>
          </div>

          {/* Actions */}
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={onClose} style={{ flex:1, padding:"12px 0", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.10)", borderRadius:2, fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", cursor:"pointer", transition:"all 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.22)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.10)"}>
              Cancel
            </button>
            <button onClick={handleConfirm} disabled={loading} className="modal-btn-primary"
              style={{ flex:2, padding:"12px 0", borderRadius:2, fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase", color: loading?"rgba(255,255,255,0.3)":"rgba(255,255,255,0.85)", cursor:loading?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              {loading
                ? <><span style={{ width:4, height:4, borderRadius:"50%", background:"rgba(255,255,255,0.4)", animation:"pulse3 0.8s ease 0s infinite" }} /><span style={{ width:4, height:4, borderRadius:"50%", background:"rgba(255,255,255,0.4)", animation:"pulse3 0.8s ease 0.15s infinite" }} /><span style={{ width:4, height:4, borderRadius:"50%", background:"rgba(255,255,255,0.4)", animation:"pulse3 0.8s ease 0.3s infinite" }} /></>
                : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}