// Frontend logic for Referral & Rewards
const API = (path, opts={}) => fetch(path, opts).then(r => r.json());

const els = {
  usernameInput: document.getElementById("usernameInput"),
  startBtn: document.getElementById("startBtn"),
  welcomeNote: document.getElementById("welcomeNote"),
  refLink: document.getElementById("refLink"),
  copyBtn: document.getElementById("copyBtn"),
  shareBtn: document.getElementById("shareBtn"),
  pointsText: document.getElementById("pointsText"),
  progressInner: document.getElementById("progressInner"),
  progressNote: document.getElementById("progressNote"),
  redeemBtn: document.getElementById("redeemBtn"),
  joinRefSection: document.getElementById("joinRefSection"),
  joinRefText: document.getElementById("joinRefText"),
  newUserInput: document.getElementById("newUserInput"),
  completeSignupBtn: document.getElementById("completeSignupBtn"),
  lbList: document.getElementById("lbList"),
};

const state = {
  username: localStorage.getItem("rr_username") || "",
  referralCode: localStorage.getItem("rr_code") || "",
  points: 0,
  goal: 500,
  landingRefCode: "" // populated if ?ref= in URL
};

function setUsername(u){
  state.username = u;
  localStorage.setItem("rr_username", u);
}

function setCode(code){
  state.referralCode = code;
  localStorage.setItem("rr_code", code);
}

function updateUI(){
  els.welcomeNote.textContent = state.username ? `Welcome, ${state.username}!` : "";
  const linkOrigin = window.location.origin;
  const link = state.referralCode ? `${linkOrigin}/?ref=${encodeURIComponent(state.referralCode)}` : "";
  els.refLink.value = link;
  els.pointsText.innerHTML = `<b>${state.points}</b> points`;
  const pct = Math.max(0, Math.min(100, (state.points / state.goal) * 100));
  els.progressInner.style.width = `${pct}%`;
  els.progressNote.textContent = `Collect ${state.goal} points to unlock your next reward.`;
}

async function bootstrap(){
  // If landing with ?ref=... show join section
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");
  if (ref){
    state.landingRefCode = ref;
    els.joinRefSection.hidden = false;
    els.joinRefText.textContent = `You're joining via referral code: ${ref}`;
  }

  if (state.username){
    await ensureUser(state.username);
    await refreshUser(state.username);
  }
  await loadLeaderboard();
  updateUI();
}

async function ensureUser(username){
  try {
    const res = await API("/api/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });
    if (res && res.referralCode){
      setCode(res.referralCode);
    }
  } catch (e) {
    console.error(e);
  }
}

async function refreshUser(username){
  try {
    const res = await API(`/api/user/${encodeURIComponent(username)}`);
    if (res && !res.error){
      state.points = res.points || 0;
      setCode(res.referralCode);
      updateUI();
    }
  } catch (e) {
    console.error(e);
  }
}

async function loadLeaderboard(){
  try {
    const top = await API("/api/leaderboard");
    els.lbList.innerHTML = "";
    (top || []).forEach((row) => {
      const li = document.createElement("li");
      li.textContent = `${row.username} — ${row.points} pts`;
      els.lbList.appendChild(li);
    });
  } catch (e) {
    console.error(e);
  }
}

// Events
els.startBtn.addEventListener("click", async () => {
  const u = (els.usernameInput.value || "").trim();
  if (!u) return alert("Please enter a username");
  setUsername(u);
  await ensureUser(u);
  await refreshUser(u);
});

els.copyBtn.addEventListener("click", async () => {
  if (!els.refLink.value) return alert("Create your link first");
  try {
    await navigator.clipboard.writeText(els.refLink.value);
    alert("Referral link copied!");
  } catch {
    els.refLink.select();
    document.execCommand("copy");
    alert("Referral link copied!");
  }
});

els.shareBtn.addEventListener("click", async () => {
  const url = els.refLink.value;
  if (!url) return alert("Create your link first");
  if (navigator.share){
    try {
      await navigator.share({ title: "Join iConnecto", text: "Get perks by joining via my link!", url });
    } catch(e){ /* user cancelled */ }
  } else {
    alert("Native share not supported. Link copied.");
    try { await navigator.clipboard.writeText(url); } catch {}
  }
});

els.redeemBtn.addEventListener("click", async () => {
  if (!state.username) return alert("Enter username first");
  const res = await API("/api/redeem", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: state.username })
  });
  if (res.error){
    alert(res.error);
  } else {
    alert(res.message || "Redeemed!");
    await refreshUser(state.username);
  }
});

els.completeSignupBtn.addEventListener("click", async () => {
  const newUser = (els.newUserInput.value || "").trim();
  if (!newUser) return alert("Choose a username");
  // 1) Create the new user
  await API("/api/create-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: newUser })
  });
  // 2) Credit the referrer
  const res = await API("/api/refer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ referralCode: state.landingRefCode, newUser })
  });
  if (res.error){
    alert(res.error);
  } else {
    alert("You're in! Referral credited.");
    // redirect to clean URL
    window.location.href = window.location.origin + "/";
  }
});

bootstrap();
