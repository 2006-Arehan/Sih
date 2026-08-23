/* Maharashtra Skill & LMI Intelligence Platform — dashboard controller */
const API = "/api/v1";
const $ = (id) => document.getElementById(id);

let COURSES = [];
let DISTRICTS = [];
let districtChart = null;

async function fetchJSON(url, opts = {}) {
    const res = await fetch(url, opts);
    if (!res.ok) {
        let detail = res.statusText;
        try { detail = (await res.json()).detail || detail; } catch (e) {}
        throw new Error(detail);
    }
    return res.json();
}

function postJSON(url, body) {
    return fetchJSON(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body || {}),
    });
}

function toast(msg, isErr = false) {
    let t = $("toast");
    if (!t) {
        t = document.createElement("div");
        t.id = "toast";
        t.className = "toast";
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className = "toast show" + (isErr ? " err" : "");
    setTimeout(() => { t.className = "toast" + (isErr ? " err" : ""); }, 3200);
}

function gapClass(pct) {
    if (pct > 60) return { cls: "risk-high", dot: "red", label: "High" };
    if (pct >= 30) return { cls: "risk-med", dot: "amber", label: "Medium" };
    return { cls: "risk-low", dot: "green", label: "Low" };
}

function esc(s) {
    return String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

/* ---------- District Intelligence ---------- */
async function loadDistricts() {
    DISTRICTS = await fetchJSON(`${API}/districts`);
    const sel = $("districtSelect");
    sel.innerHTML = DISTRICTS
        .map(d => `<option value="${esc(d.name)}">${esc(d.name)} — ${esc(d.region)}</option>`)
        .join("");
    $("kpiDistricts").textContent = DISTRICTS.length;
    const defaultD = DISTRICTS.find(d => d.name === "Pune") || DISTRICTS[0];
    if (defaultD) { sel.value = defaultD.name; renderDistrict(defaultD.name); }
}

function renderDistrict(name) {
    const d = DISTRICTS.find(x => x.name === name);
    if (!d) return;
    $("districtPostings").textContent = d.active_postings_count.toLocaleString();
    $("districtRegion").textContent = "📍 " + d.region;
    $("districtIndustries").innerHTML = (d.major_industries || [])
        .map(i => `<span class="chip">${esc(i)}</span>`).join("");

    const skills = d.top_demanded_skills || [];
    const hint = $("districtChartHint");
    if (!skills.length) {
        hint.style.display = "block";
        hint.textContent = "No live postings recorded for this district yet.";
        if (districtChart) { districtChart.destroy(); districtChart = null; }
        return;
    }
    hint.style.display = "none";
    drawDistrictChart();
}

async function drawDistrictChart() {
    // Pull real demand counts from the district plan for accuracy
    let labels = [], counts = [];
    try {
        const plan = await fetchJSON(`${API}/district-plan/${encodeURIComponent($("districtSelect").value)}`);
        const demand = (plan.demanded_skills || []).slice(0, 8);
        labels = demand.map(x => x.skill);
        counts = demand.map(x => x.demand_count);
    } catch (e) {}
    if (!labels.length) {
        const hint = $("districtChartHint");
        hint.style.display = "block";
        hint.textContent = "No live postings recorded for this district yet.";
        if (districtChart) { districtChart.destroy(); districtChart = null; }
        return;
    }
    const ctx = $("districtSkillsChart").getContext("2d");
    if (districtChart) districtChart.destroy();
    districtChart = new Chart(ctx, {
        type: "bar",
        data: { labels, datasets: [{ label: "Demand (postings)", data: counts, backgroundColor: "#ff9933", borderRadius: 6 }] },
        options: {
            indexAxis: "y", responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { ticks: { precision: 0 }, grid: { color: "#eef1f6" } }, y: { grid: { display: false } } },
        },
    });
}

/* ---------- District Training Plan ---------- */
async function generatePlan() {
    const name = $("districtSelect").value;
    try {
        const p = await fetchJSON(`${API}/district-plan/${encodeURIComponent(name)}`);
        $("planDistrictName").textContent = p.district;
        const gapItems = (p.skills_gap || []).map(g =>
            `<li><span>${esc(g.skill)}</span><b>${g.demand_count}</b></li>`).join("") || "<li>None 🎉</li>";
        const availItems = (p.skills_available || []).map(g =>
            `<li><span>${esc(g.skill)}</span><b>${g.demand_count}</b></li>`).join("") || "<li>—</li>";
        const risk = (p.courses_at_risk || []).map(c =>
            `<li><span>${esc(c.title)}</span><span class="risk-pill risk-high">${c.placement_rate}%</span></li>`).join("")
            || "<li>No courses flagged</li>";
        const recs = (p.recommendations || []).map(r => `<li>✅ ${esc(r)}</li>`).join("");
        $("planContent").innerHTML = `
            <div class="plan-summary">
                <div class="plan-stat"><b>${p.total_demand}</b><small>Live postings</small></div>
                <div class="plan-stat"><b>${p.courses_offered}</b><small>Courses offered</small></div>
                <div class="plan-stat"><b>${(p.skills_available||[]).length}</b><small>Skills covered</small></div>
                <div class="plan-stat"><b>${(p.skills_gap||[]).length}</b><small>Skill gaps</small></div>
            </div>
            <div class="plan-cols">
                <div class="plan-list"><h4>🔴 Skill Gaps (demanded, not taught)</h4><ul>${gapItems}</ul></div>
                <div class="plan-list"><h4>🟢 Skills Available Locally</h4><ul>${availItems}</ul></div>
            </div>
            <div class="plan-cols">
                <div class="plan-list"><h4>⚠️ Courses at Risk</h4><ul>${risk}</ul></div>
                <div class="rec-actions"><h4>📋 Recommended Actions</h4><ul>${recs}</ul></div>
            </div>`;
        $("planPanel").classList.remove("hidden");
        $("planPanel").scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e) {
        toast("Plan failed: " + e.message, true);
    }
}

/* ---------- Courses (shared lookup) ---------- */
async function loadCourses() {
    COURSES = await fetchJSON(`${API}/courses`);
    $("kpiCourses").textContent = COURSES.length;
    const sel = $("recCourseSelect");
    sel.innerHTML = `<option value="">— Select a course —</option>` +
        COURSES.map(c => `<option value="${c.id}">${esc(c.title)} (${esc(c.district_name)})</option>`).join("");
}

/* ---------- Skill Gap Table ---------- */
async function loadGapTable() {
    const body = $("gapTableBody");
    if (!COURSES.length) { try { COURSES = await fetchJSON(`${API}/courses`); } catch (e) {} }
    if (!COURSES.length) {
        body.innerHTML = `<tr><td colspan="6" class="loading-row">No courses available.</td></tr>`;
        return;
    }
    const rows = await Promise.all(COURSES.map(async c => {
        try {
            const g = await postJSON(`${API}/skill-gap/analyze`, { course_id: c.id });
            return { c, g };
        } catch (e) { return null; }
    }));
    let riskCount = 0;
    const html = rows.filter(Boolean).map(({ c, g }) => {
        const pct = Math.round(g.gap_percentage ?? 0);
        const gc = gapClass(pct);
        if (gc.label === "High") riskCount++;
        const miss = (g.missing_critical_skills || []).slice(0, 5)
            .map(s => `<span class="miss-skill">${esc(s)}</span>`).join("") || "<span class='miss-skill'>—</span>";
        return `<tr>
            <td><b>${esc(c.title)}</b></td>
            <td>${esc(c.district_name)}</td>
            <td>${esc(c.sector)}</td>
            <td><span class="gap-badge ${gc.cls}" style="padding:3px 10px;border-radius:20px;">${pct}%</span></td>
            <td>${miss}</td>
            <td><span class="risk-pill ${gc.cls}"><i class="dot ${gc.dot}"></i> ${gc.label}</span></td>
        </tr>`;
    }).join("");
    body.innerHTML = html || `<tr><td colspan="6" class="loading-row">No gap data.</td></tr>`;
    $("kpiRisk").textContent = riskCount;
}

/* ---------- Obsolescence Risk Cards ---------- */
function riskTier(score) {
    if (score > 60) return "high";
    if (score >= 30) return "med";
    return "low";
}
function subBar(label, val) {
    const v = Math.max(0, Math.min(100, Math.round(val || 0)));
    return `<div class="subscore">
        <div class="subscore-label"><span>${label}</span><span>${v}</span></div>
        <div class="bar"><span style="width:${v}%"></span></div>
    </div>`;
}
async function loadObsolescence() {
    const grid = $("obsGrid");
    if (!COURSES.length) { try { COURSES = await fetchJSON(`${API}/courses`); } catch (e) {} }
    const cards = await Promise.all(COURSES.map(async c => {
        try { return { c, a: await postJSON(`${API}/obsolescence/assess/${c.id}`, {}) }; }
        catch (e) { return null; }
    }));
    const html = cards.filter(Boolean)
        .sort((x, y) => (y.a.risk_score || 0) - (x.a.risk_score || 0))
        .map(({ c, a }) => {
            const tier = riskTier(a.risk_score || 0);
            const flag = a.flagged_for_review ? `<span class="risk-pill risk-high">⚑ Review</span>` : "";
            return `<div class="obs-card ${tier}">
                <div class="obs-title">${esc(c.title)} ${flag}</div>
                <div class="obs-meta">${esc(c.district_name)} · ${esc(c.sector)} · ${esc(a.risk_level || "")}</div>
                <div class="obs-score"><b>${Math.round(a.risk_score || 0)}</b><small>/ 100 risk score</small></div>
                ${subBar("Demand decline", a.demand_decline_score)}
                ${subBar("Skill gap", a.skill_gap_score)}
                ${subBar("Placement drop", a.placement_drop_score)}
                ${subBar("Employer disapproval", a.employer_disapproval_score)}
            </div>`;
        }).join("");
    grid.innerHTML = html || `<p class="empty-hint">No assessments available.</p>`;
}

/* ---------- Curriculum Recommendations ---------- */
async function loadRecommendation(courseId) {
    const box = $("recContent");
    if (!courseId) {
        box.innerHTML = `<p class="empty-hint">Select a course to generate recommendations.</p>`;
        return;
    }
    box.innerHTML = `<p class="empty-hint">Generating recommendations…</p>`;
    try {
        const r = await fetchJSON(`${API}/recommendations/course/${courseId}`);
        const prio = (r.action_priority || "").toLowerCase();
        const pcls = prio.includes("urgent") ? "urgent" : prio.includes("moderate") ? "moderate" : "ok";
        const add = (r.skills_to_add || []).map(s => `<span class="tag add">＋ ${esc(s)}</span>`).join("") || "<span class='empty-hint'>None</span>";
        const drop = (r.skills_to_deprecate || []).map(s => `<span class="tag drop">－ ${esc(s)}</span>`).join("") || "<span class='empty-hint'>None</span>";
        box.innerHTML = `
            <div class="priority-banner ${pcls}">${esc(r.action_priority || "—")}</div>
            <div><b>${esc(r.course_title)}</b> · ${esc(r.district_name)} · ${esc(r.sector)}</div>
            <div class="rec-cols">
                <div class="rec-box"><h4>🟢 Skills to Add</h4>${add}</div>
                <div class="rec-box"><h4>🔴 Skills to Deprecate</h4>${drop}</div>
            </div>
            <div class="rec-box">
                <h4>🎯 Recommended NSQF Alignment</h4>
                <p>${esc(r.recommended_nsqf_qp || "—")}</p>
                <p class="obs-meta" style="margin-top:8px">${esc(r.district_industry_demand_note || "")}</p>
            </div>`;
    } catch (e) {
        box.innerHTML = `<p class="empty-hint">Failed: ${esc(e.message)}</p>`;
    }
}

/* ---------- Skill Trend Radar ---------- */
function trendItem(r) {
    return `<div class="trend-item">
        <div class="ts">${esc(r.skill)}</div>
        <div class="tm"><span>Demand ${r.demand_rate}%</span><span>Taught ${r.course_coverage_rate}%</span></div>
    </div>`;
}
async function loadTrends() {
    try {
        const t = await fetchJSON(`${API}/trends/emerging-skills`);
        $("trendEmerging").innerHTML = (t.emerging || []).map(trendItem).join("") || "<p class='empty-hint'>None detected.</p>";
        $("trendEstablished").innerHTML = (t.established || []).map(trendItem).join("") || "<p class='empty-hint'>None.</p>";
        $("trendDeclining").innerHTML = (t.declining || []).map(trendItem).join("") || "<p class='empty-hint'>None.</p>";
        $("kpiEmerging").textContent = (t.emerging || []).length;
    } catch (e) {
        $("trendEmerging").innerHTML = `<p class='empty-hint'>Failed: ${esc(e.message)}</p>`;
    }
}

/* ---------- Live postings KPI ---------- */
async function loadPostingsKpi() {
    try {
        const s = await fetchJSON(`${API}/collector/stats`);
        $("kpiPostings").textContent = (s.total || 0).toLocaleString();
    } catch (e) {}
}

/* ---------- Employer Feedback ---------- */
function stars(n) { return "★".repeat(n) + "☆".repeat(5 - n); }
async function loadFeedback() {
    try {
        const list = await fetchJSON(`${API}/feedback`);
        $("feedbackList").innerHTML = list.slice().reverse().map(f => `
            <div class="fb-card">
                <div class="fb-head">
                    <span class="fb-name">${esc(f.employer_name)} · ${esc(f.company)}</span>
                    <span class="fb-stars">${stars(f.satisfaction_rating)}</span>
                </div>
                <div class="fb-meta">${esc(f.sector)} · ${esc(f.district_name)}</div>
                <div class="fb-comment">${esc(f.comments)}</div>
            </div>`).join("") || "<p class='empty-hint'>No feedback yet.</p>";
    } catch (e) {}
}
function splitSkills(v) {
    return (v || "").split(",").map(s => s.trim()).filter(Boolean);
}
async function submitFeedback(e) {
    e.preventDefault();
    const f = e.target;
    const payload = {
        employer_name: f.employer_name.value.trim(),
        company: f.company.value.trim(),
        sector: f.sector.value.trim(),
        district_name: f.district_name.value.trim(),
        validated_skills: splitSkills(f.validated_skills.value),
        missing_skills: splitSkills(f.missing_skills.value),
        satisfaction_rating: parseInt(f.satisfaction_rating.value, 10),
        comments: f.comments.value.trim(),
    };
    try {
        await postJSON(`${API}/feedback`, payload);
        $("feedbackMsg").textContent = "✅ Feedback submitted. Thank you!";
        f.reset();
        loadFeedback();
        setTimeout(() => { $("feedbackMsg").textContent = ""; }, 3000);
    } catch (err) {
        $("feedbackMsg").textContent = "";
        toast("Submit failed: " + err.message, true);
    }
}

/* ---------- Scan Market (job collector) ---------- */
async function scanMarket() {
    const btn = $("scanBtn"), status = $("scanStatus");
    btn.disabled = true;
    status.textContent = "📡 Scanning sources…";
    try {
        const r = await postJSON(`${API}/collector/collect`, {});
        status.textContent = `✔ +${r.collected} new · ${r.skipped} known · ${(r.sources || []).join(", ")}`;
        toast(`Collected ${r.collected} new postings from ${(r.sources || []).length} sources`);
        // Refresh everything affected by new market data
        await Promise.all([
            loadPostingsKpi(),
            loadDistricts(),
            loadGapTable(),
            loadObsolescence(),
            loadTrends(),
        ]);
    } catch (e) {
        status.textContent = "Scan failed.";
        toast("Scan failed: " + e.message, true);
    } finally {
        btn.disabled = false;
    }
}

/* ---------- Bootstrap ---------- */
function wireEvents() {
    $("scanBtn").addEventListener("click", scanMarket);
    $("planBtn").addEventListener("click", generatePlan);
    $("districtSelect").addEventListener("change", e => renderDistrict(e.target.value));
    $("recCourseSelect").addEventListener("change", e => loadRecommendation(e.target.value));
    $("feedbackForm").addEventListener("submit", submitFeedback);
}

async function init() {
    wireEvents();
    await loadCourses();       // populates COURSES + recCourseSelect + kpiCourses
    await Promise.all([
        loadDistricts(),       // districtSelect + kpiDistricts + default render
        loadPostingsKpi(),     // kpiPostings
        loadGapTable(),        // gap table + kpiRisk
        loadObsolescence(),    // obsolescence cards
        loadTrends(),          // trend radar + kpiEmerging
        loadFeedback(),        // feedback list
    ]);
}

document.addEventListener("DOMContentLoaded", init);


