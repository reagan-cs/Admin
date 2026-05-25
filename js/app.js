// ═══════════════════════════════════════════════════════════════
// PESA ADVISOR KENYA — MAIN APPLICATION
// ═══════════════════════════════════════════════════════════════

// ── APP STATE ──────────────────────────────────────────────────
let currentPlan = 'hustler';
let currentLoan = null;

// ── INIT ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('app').style.display = 'block';
  }, 3000);
});

// ── NAVIGATION ─────────────────────────────────────────────────
function goTo(section) {
  const el = document.getElementById(section);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// ── LOAN FILTERING ─────────────────────────────────────────────
function filterLoans(tag, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('.loan-card');
  cards.forEach(card => {
    const tags = card.getAttribute('data-tags').split(' ');
    card.style.display = tags.includes(tag) ? 'block' : 'none';
  });
}

// ── LOAN SELECTION & MODAL ─────────────────────────────────────
const loanDetails = {
  mshwari: {
    name: 'M-Shwari',
    provider: 'Safaricom × NCBA',
    rate: '7.5%',
    max: 'KSh 50,000',
    term: '30 days',
    status: 'POPULAR',
    pros: ['Lowest interest rate for starters', 'Quick approval (instant to 1 hour)', 'No collateral needed', 'Can borrow repeatedly'],
    cons: ['Limited to KSh 50,000', '30-day loan term only'],
  },
  kcb: {
    name: 'KCB M-Pesa',
    provider: 'KCB × Safaricom',
    rate: '8.64%',
    max: 'KSh 1,000,000',
    term: '6 months',
    status: 'BIG LOANS',
    pros: ['Large loan amounts up to KSh 1M', '6-month repayment term', 'Great for business capital', 'Lower monthly payment'],
    cons: ['Slightly higher rate than M-Shwari', 'Requires KCB account verification'],
  },
  fuliza: {
    name: 'Fuliza',
    provider: 'Safaricom Overdraft',
    rate: '1% /day + fees',
    max: 'KSh 50,000',
    term: 'Rolling',
    status: '⚠️ DANGER',
    pros: ['Instant access (emergency only)', 'No formal application'],
    cons: ['EXTREMELY expensive (1% per day = 30%/month)', 'Easy to trap yourself', 'Use for max 1-2 days only'],
  },
  tala: {
    name: 'Tala',
    provider: 'Digital Lender',
    rate: '11–15%',
    max: 'KSh 30,000',
    term: '21–61 days',
    status: 'NO M-PESA REQ',
    pros: ['No M-Pesa account required', 'Good for new borrowers', 'Various loan terms'],
    cons: ['Higher interest than M-Shwari', 'Requires app installation'],
  },
  equity: {
    name: 'Equity EazzyLoan',
    provider: 'Equity Bank',
    rate: '3%',
    max: 'KSh 3,000,000',
    term: '12 months',
    status: 'BEST RATE',
    pros: ['LOWEST interest rate in Kenya', 'Largest loan amounts', 'Long repayment term', 'Perfect for business'],
    cons: ['Requires Equity Bank account', 'Strict verification process'],
  },
  branch: {
    name: 'Branch',
    provider: 'Mobile App Lender',
    rate: '17–35%',
    max: 'KSh 70,000',
    term: '1–12 months',
    status: '⚠️ EXPENSIVE',
    pros: ['Quick approval', 'Various loan terms'],
    cons: ['EXTREMELY EXPENSIVE (17-35%)', 'Only use as absolute last resort', 'High default risk'],
  },
};

function selectLoan(loanId) {
  currentLoan = loanId;
  const loan = loanDetails[loanId];
  const html = `
    <div style="margin-bottom:20px">
      <h3 style="font-size:18px;color:#fff;margin-bottom:6px">${loan.name}</h3>
      <p style="color:rgba(255,255,255,0.5);font-size:13px">${loan.provider}</p>
    </div>
    <div style="background:rgba(255,255,255,0.04);padding:16px;border-radius:8px;margin-bottom:20px">
      <div style="display:flex;gap:20px;margin-bottom:16px">
        <div>
          <p style="color:rgba(255,255,255,0.4);font-size:11px;margin-bottom:4px">INTEREST RATE</p>
          <p style="color:#5DCAA5;font-weight:700;font-size:18px">${loan.rate}</p>
        </div>
        <div>
          <p style="color:rgba(255,255,255,0.4);font-size:11px;margin-bottom:4px">MAX LOAN</p>
          <p style="color:#5DCAA5;font-weight:700;font-size:18px">${loan.max}</p>
        </div>
        <div>
          <p style="color:rgba(255,255,255,0.4);font-size:11px;margin-bottom:4px">TERM</p>
          <p style="color:#5DCAA5;font-weight:700;font-size:18px">${loan.term}</p>
        </div>
      </div>
    </div>
    <div style="margin-bottom:20px">
      <h4 style="color:#fff;font-size:13px;font-weight:700;margin-bottom:8px">✅ PROS</h4>
      <ul style="list-style:none;padding:0">
        ${loan.pros.map(p => `<li style="font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:6px">• ${p}</li>`).join('')}
      </ul>
    </div>
    <div>
      <h4 style="color:#fff;font-size:13px;font-weight:700;margin-bottom:8px">⚠️ CONS</h4>
      <ul style="list-style:none;padding:0">
        ${loan.cons.map(c => `<li style="font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:6px">• ${c}</li>`).join('')}
      </ul>
    </div>
  `;
  document.getElementById('modalContent').innerHTML = html;
  openModal();
}

function openModal() {
  document.getElementById('loanModal').classList.add('active');
}

function closeModal() {
  document.getElementById('loanModal').classList.remove('active');
}

// ── CALCULATOR ─────────────────────────────────────────────────
function calcUpdate() {
  const amount = parseInt(document.getElementById('sliderAmount').value);
  const rate = parseFloat(document.getElementById('sliderRate').value);

  document.getElementById('calcAmount').textContent = 'KSh ' + amount.toLocaleString();
  document.getElementById('calcRate').textContent = rate.toFixed(1) + '%';

  const interest = Math.round(amount * rate / 100);
  const excise = Math.round(interest * 0.2);
  const total = amount + interest + excise;
  const daily = Math.round(total / 30);
  const apr = Math.round(rate * 12);

  document.getElementById('rTotal').textContent = 'KSh ' + total.toLocaleString();
  document.getElementById('rPrincipal').textContent = 'KSh ' + amount.toLocaleString();
  document.getElementById('rInterest').textContent = 'KSh ' + interest.toLocaleString();
  document.getElementById('rExcise').textContent = 'KSh ' + excise.toLocaleString();
  document.getElementById('rTotalRow').textContent = 'KSh ' + total.toLocaleString();
  document.getElementById('rDaily').textContent = 'KSh ' + daily.toLocaleString() + '/day';
  document.getElementById('rAPR').textContent = apr + '% p.a.';
}

function setPreset(rate, btn) {
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('sliderRate').value = rate;
  calcUpdate();
}

// Initialize calculator on load
document.addEventListener('DOMContentLoaded', calcUpdate);

// ── PAYMENT FLOW ───────────────────────────────────────────────
function openPay(plan) {
  if (plan) {
    currentPlan = plan;
    selectPlan(plan);
  }
  document.getElementById('payModal').classList.add('active');
}

function closePayModal() {
  document.getElementById('payModal').classList.remove('active');
  showPayStep(1);
  updateProgress(1);
}

function selectPlan(plan) {
  currentPlan = plan;
  document.querySelectorAll('.plan-opt').forEach(p => p.classList.remove('selected'));
  document.getElementById('plan-' + plan).classList.add('selected');

  const amounts = { basic: 10, hustler: 29, biashara: 99 };
  document.getElementById('proceedBtn').textContent = `Continue with KSh ${amounts[plan]} plan `;
}

function showPayStep(step) {
  document.querySelectorAll('.pay-step').forEach(s => s.classList.remove('active'));
  document.getElementById('payStep' + step).classList.add('active');
}

function updateProgress(step) {
  const widths = { 1: '25%', 2: '50%', 3: '75%', 4: '100%' };
  document.getElementById('ppFill').style.width = widths[step];

  document.querySelectorAll('.pp-lbl').forEach((lbl, idx) => {
    lbl.classList.remove('active');
    if (idx < step) lbl.classList.add('active');
  });
}

function proceedToIntake() {
  showPayStep(2);
  updateProgress(2);
}

function proceedToMpesa() {
  const name = document.getElementById('intakeName').value.trim();
  const purpose = document.querySelector('input[name="purpose"]:checked');
  const income = document.getElementById('intakeIncome').value;
  const existing = document.querySelector('input[name="existing"]:checked');

  if (!name || !purpose || !income || !existing) {
    if (!name) document.getElementById('errName').style.display = 'block';
    if (!purpose) document.getElementById('errPurpose').style.display = 'block';
    if (!income) document.getElementById('errIncome').style.display = 'block';
    if (!existing) document.getElementById('errExisting').style.display = 'block';
    return;
  }

  document.getElementById('errName').style.display = 'none';
  document.getElementById('errPurpose').style.display = 'none';
  document.getElementById('errIncome').style.display = 'none';
  document.getElementById('errExisting').style.display = 'none';

  const amounts = { basic: 10, hustler: 29, biashara: 99 };
  document.getElementById('instrName2').textContent = name;
  document.getElementById('instrAmount').textContent = amounts[currentPlan];
  document.getElementById('instrPlan').textContent =
    currentPlan === 'basic' ? 'Basic' : currentPlan === 'hustler' ? 'Hustler' : 'Biashara';

  showPayStep(3);
  updateProgress(3);
}

function copyNumber() {
  navigator.clipboard.writeText('0114129044').then(() => {
    const btn = document.getElementById('copyBtn');
    btn.style.background = '#1D9E75';
    btn.style.color = '#fff';
    btn.textContent = '✓ Copied!';
    setTimeout(() => {
      btn.style.background = '';
      btn.style.color = '';
      btn.innerHTML = '<i class="ti ti-copy"></i> Copy';
    }, 2000);
  });
}

function iHavePaid() {
  const name = document.getElementById('intakeName').value.trim();
  const phone = 254114129044;
  const message = `Hi! I just paid for the ${currentPlan.toUpperCase()} plan. My name is ${name}. Here's my screenshot below. Please send my personalized loan advice. Thank you!`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');

  showPayStep(4);
  updateProgress(4);
}
