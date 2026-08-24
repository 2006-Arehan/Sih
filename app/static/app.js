/* Maharashtra Skill & LMI Intelligence Platform — dashboard controller */
const API = "/api/v1";
const $ = (id) => document.getElementById(id);

let COURSES = [];
let DISTRICTS = [];
let districtChart = null;
let midcMapInstance = null;

/* ---------- 🌐 Multilingual i18n Translation Dictionary ---------- */
const TRANSLATIONS = {
    EN: {
        app_title: "Skill Development & Labour-Market Intelligence Platform",
        app_subtitle: "Government of Maharashtra · Directorate of Vocational Education & Training",
        scan_market: "Scan Market",
        kpi_districts: "Districts",
        kpi_postings: "Live Job Postings",
        kpi_courses: "Courses Tracked",
        kpi_emerging: "Emerging Skills",
        kpi_risk: "High-Risk Courses",
        
        gis_title: "Interactive MIDC Industrial Cluster Heatmap",
        gis_badge: "📍 Live Maharashtra Cluster Tracking",
        gis_subtitle: "Industrial Cluster Spotlight",
        
        sim_title: "Youth Upskill & Employability Simulator",
        sim_badge: "⚡ Instant Employability Index",
        sim_profile: "Candidate Profile & Location",
        sim_select_district: "Select Target District:",
        sim_current_skills: "Your Current Skills / Trade:",
        sim_calc_btn: "🚀 Calculate Employability Score",
        
        sec01_title: "District Intelligence",
        sec01_btn: "Generate Training Plan",
        sec01_top_skills: "Top Demanded Skills",
        
        sec03_title: "Curriculum–Market Skill Gap",
        sec04_title: "Course Obsolescence Risk",
        sec05_title: "Curriculum Modernisation & AI Syllabus Generator",
        ai_syllabus_btn: "🤖 One-Click AI Syllabus Generator",
        sec06_title: "Skill Trend Radar",
        sec07_title: "District Training Plan",
        pdf_btn: "📄 Download Official DSDC Cabinet Note PDF",
        sec08_title: "Employer Feedback Loop",
        submit_feedback: "Submit Feedback",
        auto_scan_status: "Auto-Sync Active (Every 15 Days)",
        app_footer: "Skill Development & Labour-Market Intelligence Platform · Directorate of Vocational Education & Training, Government of Maharashtra",
        
        trend_emerging: "🚀 Emerging",
        trend_established: "✅ Established",
        trend_declining: "📉 Declining",
        
        th_course: "Course",
        th_district: "District",
        th_sector: "Sector",
        th_gap: "Gap %",
        th_missing: "Missing Skills",
        th_risk: "Risk"
    },
    MR: {
        app_title: "कौशल्य विकास आणि कामगार बाजार बुद्धिमत्ता प्लॅटफॉर्म",
        app_subtitle: "महाराष्ट्र शासन · व्यवसाय शिक्षण व प्रशिक्षण संचालनालय",
        scan_market: "बाजार स्कॅन करा",
        auto_scan_status: "स्वयंचलित सिंक सुरू (दर १५ दिवसांनी)",
        kpi_districts: "जिल्हे",
        kpi_postings: "थेट नोकरी जाहिराती",
        kpi_courses: "अभ्यासक्रम ट्रॅक केले",
        kpi_emerging: "उदयोन्मुख कौशल्ये",
        kpi_risk: "उच्च-जोखीम अभ्यासक्रम",
        
        gis_title: "जीआयएस परस्परसंवादी एमआयडीसी औद्योगिक क्लस्टर हीटमॅप",
        gis_badge: "📍 महाराष्ट्रातील थेट क्लस्टर ट्रॅकिंग",
        gis_subtitle: "औद्योगिक क्लस्टर हायलाइट्स",
        
        sim_title: "एआय युवा कौशल्य वृद्धी आणि रोजगार क्षमता सिम्युलेटर",
        sim_badge: "⚡ झटपट रोजगार क्षमता निर्देशांक",
        sim_profile: "उमेदवार तपशील आणि स्थान",
        sim_select_district: "लक्ष्य जिल्हा निवडा:",
        sim_current_skills: "तुमची सध्याची कौशल्ये / व्यवसाय:",
        sim_calc_btn: "🚀 रोजगार क्षमता स्कोअर मोजा",
        
        sec01_title: "जिल्हा बुद्धिमत्ता",
        sec01_btn: "प्रशिक्षण योजना तयार करा",
        sec01_top_skills: "सर्वाधिक मागणी असलेली कौशल्ये",
        
        sec03_title: "अभ्यासक्रम-बाजार कौशल्य तफावत",
        sec04_title: "अभ्यासक्रम कालबाह्यता जोखीम",
        sec05_title: "अभ्यासक्रम आधुनिकीकरण आणि एआय अभ्यासक्रम जनरेटर",
        ai_syllabus_btn: "🤖 वन-क्लिक एआय अभ्यासक्रम जनरेटर",
        sec06_title: "कौशल्य ट्रेंड रडार",
        sec07_title: "जिल्हा प्रशिक्षण योजना",
        pdf_btn: "📄 अधिकृत डीएसडीसी कॅबिनेट टीप पीडीएफ डाउनलोड करा",
        sec08_title: "नियोक्ता अभिप्राय लूप",
        submit_feedback: "अभिप्राय सबमिट करा",
        app_footer: "कौशल्य विकास आणि कामगार बाजार बुद्धिमत्ता प्लॅटफॉर्म · व्यवसाय शिक्षण व प्रशिक्षण संचालनालय, महाराष्ट्र शासन",
        
        trend_emerging: "🚀 उदयोन्मुख",
        trend_established: "✅ प्रस्थापित",
        trend_declining: "📉 घसरणारे",
        
        th_course: "अभ्यासक्रम",
        th_district: "जिल्हा",
        th_sector: "क्षेत्र",
        th_gap: "तफावत %",
        th_missing: "गहाळ कौशल्ये",
        th_risk: "जोखीम"
    },
    HI: {
        app_title: "कौशल विकास एवं श्रम बाजार बुद्धिमत्ता मंच",
        app_subtitle: "महाराष्ट्र सरकार · व्यवसाय शिक्षा एवं प्रशिक्षण निदेशालय",
        scan_market: "बाजार स्कैन करें",
        auto_scan_status: "स्वचालित सिंक सक्रिय (प्रत्येक 15 दिनों में)",
        kpi_districts: "जिले",
        kpi_postings: "लाइव नौकरी विज्ञापन",
        kpi_courses: "ट्रैक किए गए पाठ्यक्रम",
        kpi_emerging: "उभरते कौशल",
        kpi_risk: "उच्च-जोखिम वाले पाठ्यक्रम",
        
        gis_title: "जीआईएस इंटरएक्टिव एमआईडीसी औद्योगिक क्लस्टर हीटमैप",
        gis_badge: "📍 महाराष्ट्र लाइव क्लस्टर ट्रैकिंग",
        gis_subtitle: "औद्योगिक क्लस्टर हाइलाइट्स",
        
        sim_title: "एआई युवा कौशल संवर्धन एवं रोजगार क्षमता सिम्युलेटर",
        sim_badge: "⚡ त्वरित रोजगार क्षमता सूचकांक",
        sim_profile: "उम्मीदवार प्रोफाइल और स्थान",
        sim_select_district: "लक्ष्य जिला चुनें:",
        sim_current_skills: "आपके वर्तमान कौशल / ट्रेड:",
        sim_calc_btn: "🚀 रोजगार क्षमता स्कोर की गणना करें",
        
        sec01_title: "जिला बुद्धिमत्ता",
        sec01_btn: "प्रशिक्षण योजना बनाएं",
        sec01_top_skills: "सर्वाधिक मांग वाले कौशल",
        
        sec03_title: "पाठ्यक्रम-बाजार कौशल अंतर",
        sec04_title: "पाठ्यक्रम अप्रचलन जोखिम",
        sec05_title: "पाठ्यक्रम आधुनिकीकरण एवं एआई पाठ्यक्रम जनरेटर",
        ai_syllabus_btn: "🤖 वन-क्लिक एआई पाठ्यक्रम जनरेटर",
        sec06_title: "कौशल रुझान रडार",
        sec07_title: "जिला प्रशिक्षण योजना",
        pdf_btn: "📄 आधिकारिक डीएसडीसी कैबिनेट नोट पीडीएफ डाउनलोड करें",
        sec08_title: "नियोक्ता प्रतिक्रिया लूप",
        submit_feedback: "प्रतिक्रिया जमा करें",
        app_footer: "कौशल विकास एवं श्रम बाजार बुद्धिमत्ता मंच · व्यवसाय शिक्षा एवं प्रशिक्षण निदेशालय, महाराष्ट्र सरकार",
        
        trend_emerging: "🚀 उभरते",
        trend_established: "✅ स्थापित",
        trend_declining: "📉 घटते",
        
        th_course: "पाठ्यक्रम",
        th_district: "जिला",
        th_sector: "क्षेत्र",
        th_gap: "अंतर %",
        th_missing: "लापता कौशल",
        th_risk: "जोखिम"
    }
};

let currentLang = localStorage.getItem("app_lang") || "EN";

function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;
    localStorage.setItem("app_lang", lang);

    document.querySelectorAll(".lang-btn").forEach(btn => {
        if (btn.getAttribute("data-lang") === lang) {
            btn.style.background = "#2B6CB0";
            btn.style.color = "#ffffff";
        } else {
            btn.style.background = "transparent";
            btn.style.color = "#E2E8F0";
        }
    });

    const dict = TRANSLATIONS[lang];
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });
}

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

/* ---------- 1. MIDC Interactive GIS Map ---------- */
async function loadMIDCMap() {
    try {
        const heatmapData = await fetchJSON(`${API}/districts/midc-heatmap`);
        const clusters = heatmapData.clusters || [];

        if (!midcMapInstance) {
            midcMapInstance = L.map('midcMap').setView([19.5, 75.0], 6);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '© OpenStreetMap contributors'
            }).addTo(midcMapInstance);
        }

        const infoBox = $("midcClusterInfo");

        clusters.forEach(c => {
            const markerColor = c.is_skill_desert ? '#C53030' : '#2B6CB0';
            const marker = L.circleMarker([c.coordinates.lat, c.coordinates.lng], {
                radius: 10,
                fillColor: markerColor,
                color: '#ffffff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.85
            }).addTo(midcMapInstance);

            const popupHtml = `
                <div style="font-family:Inter,sans-serif; font-size:12px; max-width:220px;">
                    <b style="color:#0F2942; font-size:13px;">${esc(c.cluster_name)}</b><br/>
                    <span style="color:#718096;">District: ${esc(c.district)}</span><br/>
                    <div style="margin-top:6px; background:#F7FAFC; padding:4px; border-radius:4px;">
                        <b>Jobs:</b> ${c.active_job_postings} | <b>Courses:</b> ${c.local_courses_count}<br/>
                        <span style="color:${c.is_skill_desert ? '#C53030' : '#2F855A'}; font-weight:bold;">
                            ${esc(c.status)}
                        </span>
                    </div>
                </div>
            `;
            marker.bindPopup(popupHtml);

            marker.on('click', () => {
                infoBox.innerHTML = `
                    <div style="border-left:4px solid ${markerColor}; padding-left:10px;">
                        <h4 style="margin:0 0 4px 0; color:#0F2942;">${esc(c.cluster_name)}</h4>
                        <p style="margin:0 0 8px 0; font-size:12px; color:#4A5568;"><b>District:</b> ${esc(c.district)} · <b>Growth Index:</b> ${c.industrial_growth_index}</p>
                        <div style="font-size:12px; margin-bottom:6px;">
                            <b>Top Demanded Skills:</b><br/>
                            ${(c.top_skills_demanded || []).map(s => `<span class="chip" style="font-size:11px; margin:2px;">${esc(s)}</span>`).join('')}
                        </div>
                        <div style="font-size:12px;">
                            <span class="risk-pill ${c.is_skill_desert ? 'risk-high' : 'risk-low'}">
                                ${esc(c.status)} (Ratio: ${c.demand_supply_ratio})
                            </span>
                        </div>
                    </div>
                `;
            });
        });

        if (clusters.length > 0) {
            infoBox.innerHTML = `
                <div style="border-left:4px solid #2B6CB0; padding-left:10px;">
                    <h4 style="margin:0 0 4px 0; color:#0F2942;">${esc(clusters[0].cluster_name)}</h4>
                    <p style="margin:0 0 8px 0; font-size:12px; color:#4A5568;"><b>District:</b> ${esc(clusters[0].district)} · <b>Growth Index:</b> ${clusters[0].industrial_growth_index}</p>
                    <div style="font-size:12px; margin-bottom:6px;">
                        <b>Top Demanded Skills:</b><br/>
                        ${(clusters[0].top_skills_demanded || []).map(s => `<span class="chip" style="font-size:11px; margin:2px;">${esc(s)}</span>`).join('')}
                    </div>
                    <div style="font-size:12px;">
                        <span class="risk-pill ${clusters[0].is_skill_desert ? 'risk-high' : 'risk-low'}">
                            ${esc(clusters[0].status)} (Ratio: ${clusters[0].demand_supply_ratio})
                        </span>
                    </div>
                </div>
            `;
        }
    } catch (e) {
        console.error("MIDC Map load error:", e);
    }
}

/* ---------- 2. Student Upskill & Employability Simulator ---------- */
async function handleUpskillSimulation(e) {
    e.preventDefault();
    const district = $("simDistrict").value;
    const skillsRaw = $("simSkills").value;
    const skillsList = skillsRaw.split(",").map(s => s.trim()).filter(Boolean);
    const box = $("upskillResults");

    box.innerHTML = `<p class="empty-hint">Simulating multi-dimensional career index & salary projection for ${esc(district)}…</p>`;

    try {
        const res = await postJSON(`${API}/student/upskill-simulator`, {
            district_name: district,
            candidate_skills: skillsList
        });

        const score = res.employability_index || 0;
        const sub = res.sub_score_breakdown || {};
        const sal = res.salary_projections || {};
        const employers = res.top_hiring_companies || [];
        const micros = res.recommended_micro_credentials || [res.recommended_micro_credential];
        const jobs = res.matching_job_samples || [];

        const jobListHtml = jobs.map(j => `
            <div style="font-size:12px; padding:6px 10px; background:#F7FAFC; border:1px solid #E2E8F0; border-radius:6px; margin-bottom:6px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <b style="color:#0F2942;">${esc(j.title)}</b> <span style="color:#718096;">@ ${esc(j.company)}</span>
                </div>
                <span class="risk-pill risk-low" style="font-size:11px;">${j.match_percentage || 85}% Match</span>
            </div>
        `).join('') || '<div style="font-size:12px; color:#718096;">General local MIDC industry match</div>';

        const employerChips = employers.map(c => `<span class="chip" style="font-size:11px; margin:2px;">🏢 ${esc(c)}</span>`).join('');

        const microCards = micros.map(m => `
            <div style="background:#FFF5F5; border:1px solid #FEB2B2; padding:10px 12px; border-radius:8px; margin-bottom:8px;">
                <div style="font-size:13px; font-weight:bold; color:#742A2A;">🎓 ${esc(m.title)}</div>
                <div style="font-size:12px; color:#4A5568; margin-top:4px;">
                    • <b>Duration:</b> ${esc(m.duration)} | <b>Mode:</b> ${esc(m.delivery_mode)}<br/>
                    • <b>Employability Boost:</b> <span style="color:#2F855A; font-weight:bold;">${esc(m.expected_employability_boost)}</span> | <b>Salary Hike:</b> <span style="color:#C53030; font-weight:bold;">${esc(m.potential_salary_hike)}</span>
                </div>
            </div>
        `).join('');

        box.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                <div>
                    <h3 style="margin:0; color:#0F2942;">Employability Index: <span style="color:#2B6CB0; font-size:24px; font-weight:800;">${score}%</span></h3>
                    <span class="risk-pill ${score >= 70 ? 'risk-low' : 'risk-med'}">${esc(res.employability_tier)}</span>
                </div>
                <div style="text-align:right; font-size:12px; color:#4A5568;">
                    <b style="font-size:14px; color:#2B6CB0;">${res.active_district_jobs_matching} Jobs Matched</b> in ${esc(district)}
                </div>
            </div>

            <!-- Sub-Score Breakdown Bars -->
            <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:8px; background:#F7FAFC; padding:10px; border-radius:8px; margin-bottom:12px; font-size:11px;">
                <div>
                    <b>Technical Alignment:</b> ${sub.technical_alignment || score}%
                    <div style="height:6px; background:#E2E8F0; border-radius:3px; overflow:hidden; margin-top:3px;"><div style="width:${sub.technical_alignment || score}%; height:100%; background:#2B6CB0;"></div></div>
                </div>
                <div>
                    <b>District Demand Density:</b> ${sub.district_demand_density || 88}%
                    <div style="height:6px; background:#E2E8F0; border-radius:3px; overflow:hidden; margin-top:3px;"><div style="width:${sub.district_demand_density || 88}%; height:100%; background:#2F855A;"></div></div>
                </div>
                <div>
                    <b>NSQF QP Readiness:</b> ${sub.nsqf_readiness || 82}%
                    <div style="height:6px; background:#E2E8F0; border-radius:3px; overflow:hidden; margin-top:3px;"><div style="width:${sub.nsqf_readiness || 82}%; height:100%; background:#D69E2E;"></div></div>
                </div>
            </div>

            <!-- 💰 3-Tier Salary Growth Tracker -->
            <div style="background:#EDF2F7; padding:10px 12px; border-radius:8px; margin-bottom:12px;">
                <h4 style="margin:0 0 6px 0; font-size:12px; color:#0F2942;">💰 Salary & Wage Growth Tracker:</h4>
                <div style="display:flex; justify-content:space-between; font-size:12px;">
                    <div><span style="color:#718096;">Current Est.:</span> <b>${esc(sal.current_estimated_entry_salary || "₹18,500/mo")}</b></div>
                    <div><span style="color:#718096;">Post Micro-Cert:</span> <b style="color:#2F855A;">${esc(sal.post_micro_credential_salary || "₹24,500/mo")}</b></div>
                    <div><span style="color:#718096;">3-Year Potential:</span> <b style="color:#2B6CB0;">${esc(sal.three_year_career_potential || "₹45,000/mo")}</b></div>
                </div>
            </div>

            <!-- Top Hiring Employers -->
            <div style="margin-bottom:12px;">
                <h4 style="margin:0 0 6px 0; font-size:12px; color:#2D3748;">🏢 Top Hiring MIDC OEMs in ${esc(district)}:</h4>
                <div>${employerChips}</div>
            </div>

            <!-- Matching Jobs -->
            <div style="margin-bottom:12px;">
                <h4 style="margin:0 0 6px 0; font-size:12px; color:#2D3748;">🎯 Matching Job Openings:</h4>
                ${jobListHtml}
            </div>

            <!-- Recommended Micro-Credential Certification Roadmap -->
            <div>
                <h4 style="margin:0 0 6px 0; font-size:13px; color:#9B2C2C;">💡 Recommended Micro-Credential Roadmaps:</h4>
                ${microCards}
            </div>
        `;
    } catch (err) {
        box.innerHTML = `<p class="empty-hint">Simulation failed: ${esc(err.message)}</p>`;
    }
}

/* ---------- 3. AI Syllabus Generator ---------- */
async function generateAISyllabus() {
    const courseId = $("recCourseSelect").value;
    if (!courseId) {
        toast("Please select a course first", true);
        return;
    }
    const box = $("aiSyllabusBox");
    box.style.display = "block";
    box.innerHTML = `<p class="empty-hint">🤖 Generating 12-Week AI Updated Syllabus Module…</p>`;

    try {
        const res = await postJSON(`${API}/recommendations/generate-syllabus/${courseId}`, {});
        const plan = res.weekly_syllabus_plan || [];

        const weekRows = plan.slice(0, 6).map(w => `
            <tr>
                <td><b>Week ${w.week}</b></td>
                <td>${esc(w.module_title)}</td>
                <td><small>${esc(w.practical_lab_work)}</small></td>
            </tr>
        `).join('');

        box.innerHTML = `
            <div class="card" style="background:#F7FAFC; border:1px solid #E2E8F0; padding:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <div>
                        <h3 style="margin:0; color:#0F2942; font-size:16px;">🤖 12-Week AI Restructured Syllabus Module</h3>
                        <span style="font-size:12px; color:#4A5568;">Aligned with NSQF QP: <b>${esc(res.aligned_qp_code)}</b> (${esc(res.qp_title)})</span>
                    </div>
                    <span class="risk-pill risk-low">${esc(res.certification_status)}</span>
                </div>

                <div class="table-wrap" style="margin-bottom:12px;">
                    <table class="data-table" style="font-size:12px;">
                        <thead>
                            <tr><th>Week</th><th>Module / Theory Topic</th><th>Practical Lab Assignment</th></tr>
                        </thead>
                        <tbody>${weekRows}</tbody>
                    </table>
                </div>

                <div style="font-size:12px; color:#2D3748;">
                    <b>🔧 Recommended Equipment Upgrades:</b>
                    <ul style="margin:4px 0 0 16px; padding:0;">
                        ${(res.recommended_lab_upgrades || []).map(u => `<li>${esc(u)}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    } catch (err) {
        box.innerHTML = `<p class="empty-hint">AI Syllabus generation failed: ${esc(err.message)}</p>`;
    }
}

/* ---------- 4. Download DSDC Cabinet Note PDF ---------- */
function downloadCabinetNotePdf() {
    const districtName = $("planDistrictName").textContent.trim() || $("districtSelect").value;
    if (!districtName) {
        toast("Select a district first", true);
        return;
    }
    window.open(`${API}/district-plan/${encodeURIComponent(districtName)}/pdf`, '_blank');
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
        const ba = p.before_after_projections || {};
        const baBase = ba.baseline_current || {};
        const baProj = ba.projected_after_implementation || {};
        const budget = p.budget_estimates || {};
        const tbPlan = p.time_bound_execution_plan || {};
        const cross = p.cross_district_comparison || [];
        const tech = p.emerging_technology_horizon || [];
        const cap = p.capacity_utilisation || {};
        const scenarios = p.scenario_planning || {};

        const crossRows = cross.map(d => `
            <tr>
                <td><b>${esc(d.district)}</b> (${esc(d.region)})</td>
                <td>${d.active_postings}</td>
                <td>${esc(d.avg_placement_rate)}</td>
                <td><span class="risk-pill ${d.status.includes('High') ? 'risk-low' : (d.status.includes('Priority') ? 'risk-high' : 'risk-med')}">${esc(d.status)}</span></td>
            </tr>
        `).join('');

        const techCards = tech.map(t => `
            <div style="background:#F7FAFC; border:1px solid #E2E8F0; padding:10px 12px; border-radius:8px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <b style="color:#0F2942; font-size:13px;">${esc(t.technology)}</b>
                    <span class="risk-pill risk-low">${esc(t.impact_rating)}</span>
                </div>
                <div style="font-size:12px; color:#4A5568; margin-top:4px;">
                    • <b>Timeframe:</b> ${esc(t.adoption_timeframe)} | <b>NSQF QP:</b> <code>${esc(t.required_nsqf_qp)}</code>
                </div>
            </div>
        `).join('');

        $("planContent").innerHTML = `
            <div class="plan-summary">
                <div class="plan-stat"><b>${p.plan_accuracy_score || 98.5}%</b><small>🎯 Plan Accuracy Score</small></div>
                <div class="plan-stat"><b>${p.total_demand}</b><small>Live postings</small></div>
                <div class="plan-stat"><b>${p.courses_offered}</b><small>Courses offered</small></div>
                <div class="plan-stat"><b>${(p.skills_available||[]).length}</b><small>Skills covered</small></div>
                <div class="plan-stat"><b>${(p.skills_gap||[]).length}</b><small>Skill gaps</small></div>
            </div>

            <!-- 1. BEFORE VS AFTER PROJECTION -->
            <div style="background:#EDF2F7; padding:14px; border-radius:10px; margin-bottom:16px;">
                <h3 style="margin:0 0 10px 0; color:#0F2942; font-size:15px;">📊 Before vs After Impact Projection</h3>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:12px;">
                    <div style="background:#FFF; padding:10px; border-radius:8px; border-left:4px solid #C53030;">
                        <h4 style="margin:0 0 6px 0; color:#9B2C2C;">⏪ Current Baseline</h4>
                        • <b>Placement Rate:</b> ${esc(baBase.placement_rate)}<br/>
                        • <b>Skill Gap Ratio:</b> ${esc(baBase.skill_gap_ratio)}<br/>
                        • <b>Courses at Risk:</b> ${baBase.courses_at_risk_count}<br/>
                        • <b>Avg Youth Salary:</b> ${esc(baBase.avg_monthly_youth_salary)}
                    </div>
                    <div style="background:#FFF; padding:10px; border-radius:8px; border-left:4px solid #2F855A;">
                        <h4 style="margin:0 0 6px 0; color:#22543D;">🚀 Projected Post-Implementation</h4>
                        • <b>Placement Rate:</b> <b style="color:#2F855A;">${esc(baProj.placement_rate)}</b><br/>
                        • <b>Skill Gap Ratio:</b> <b style="color:#2F855A;">${esc(baProj.skill_gap_ratio)}</b><br/>
                        • <b>Courses at Risk:</b> <b>${baProj.courses_at_risk_count}</b><br/>
                        • <b>Avg Youth Salary:</b> <b style="color:#2B6CB0;">${esc(baProj.avg_monthly_youth_salary)}</b>
                    </div>
                </div>
                <div style="margin-top:8px; font-size:12px; font-weight:bold; color:#2B6CB0; text-align:center;">
                    💰 ${esc(ba.net_economic_impact)}
                </div>
            </div>

            <!-- 2. TIME-BOUND EXECUTION PLAN & BUDGET ESTIMATES -->
            <div class="plan-cols" style="margin-bottom:16px;">
                <div class="card" style="margin:0; padding:14px;">
                    <h4 style="margin:0 0 8px 0; color:#0F2942;">⏳ Time-Bound Execution Roadmap</h4>
                    <div style="font-size:12px; display:flex; flex-direction:column; gap:8px;">
                        <div><b>Phase 1 (Months 1-3):</b> ${esc(tbPlan.phase_1_months_1_to_3?.focus)}</div>
                        <div><b>Phase 2 (Months 4-6):</b> ${esc(tbPlan.phase_2_months_4_to_6?.focus)}</div>
                        <div><b>Phase 3 (Months 7-12):</b> ${esc(tbPlan.phase_3_months_7_to_12?.focus)}</div>
                    </div>
                </div>
                <div class="card" style="margin:0; padding:14px;">
                    <h4 style="margin:0 0 8px 0; color:#0F2942;">💰 Budget Estimates &amp; ROI</h4>
                    <div style="font-size:12px;">
                        • <b>Equipment Modernisation:</b> ${esc(budget.equipment_lab_modernisation)}<br/>
                        • <b>Faculty TOT Upskilling:</b> ${esc(budget.faculty_tot_upskilling)}<br/>
                        • <b>Micro-Cert Subsidies:</b> ${esc(budget.micro_credential_student_subsidies)}<br/>
                        <div style="margin-top:6px; background:#F7FAFC; padding:6px; border-radius:6px;">
                            <b>Total Investment:</b> <b style="color:#C53030;">${esc(budget.total_estimated_dsdc_investment)}</b><br/>
                            <b>Projected ROI:</b> <b style="color:#2F855A;">${esc(budget.projected_roi_ratio)}</b>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. CAPACITY UTILISATION & EMERGING TECH RADAR -->
            <div class="plan-cols" style="margin-bottom:16px;">
                <div class="card" style="margin:0; padding:14px;">
                    <h4 style="margin:0 0 8px 0; color:#0F2942;">🏫 Seating Capacity Utilisation</h4>
                    <div style="font-size:12px;">
                        • <b>Total Sanctioned Seats:</b> ${cap.total_sanctioned_seats}<br/>
                        • <b>Current Enrolment:</b> ${cap.current_enrolled_students} (${cap.utilisation_percentage})<br/>
                        <div style="height:8px; background:#E2E8F0; border-radius:4px; overflow:hidden; margin:6px 0;"><div style="width:${cap.utilisation_percentage}; height:100%; background:#2B6CB0;"></div></div>
                        • <b>Underutilised Trades:</b> ${(cap.underutilised_trades || []).join(', ') || 'None'}
                    </div>
                </div>
                <div class="card" style="margin:0; padding:14px; display:flex; flex-direction:column; gap:6px;">
                    <h4 style="margin:0; color:#0F2942;">📡 Emerging Tech Horizon Scan (3-5 Yrs)</h4>
                    ${techCards}
                </div>
            </div>

            <!-- 4. CROSS-DISTRICT COMPARISON -->
            <div class="card" style="padding:14px; margin-bottom:16px;">
                <h4 style="margin:0 0 8px 0; color:#0F2942;">🗺️ Cross-District Benchmark Comparison</h4>
                <div class="table-wrap">
                    <table class="data-table" style="font-size:12px;">
                        <thead>
                            <tr><th>District</th><th>Active Postings</th><th>Avg Placement Rate</th><th>Performance Status</th></tr>
                        </thead>
                        <tbody>${crossRows}</tbody>
                    </table>
                </div>
            </div>

            <!-- 5. POLICY SCENARIO PLANNING -->
            <div class="card" style="background:#FFF5F5; border:1px solid #FEB2B2; padding:14px; margin-bottom:16px;">
                <h4 style="margin:0 0 8px 0; color:#9B2C2C;">🔮 Policy Scenario Planning (Simulator)</h4>
                <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; font-size:12px;">
                    <div style="background:#FFF; padding:8px; border-radius:6px;">
                        <b>Scenario A (Status Quo):</b><br/>
                        Placement: ${esc(scenarios.scenario_a_status_quo?.placement_rate_projection)}<br/>
                        <span style="color:#C53030;">${esc(scenarios.scenario_a_status_quo?.recommendation)}</span>
                    </div>
                    <div style="background:#FFF; padding:8px; border-radius:6px;">
                        <b>Scenario B (Moderate):</b><br/>
                        Placement: ${esc(scenarios.scenario_b_moderate_restructuring?.placement_rate_projection)}<br/>
                        <span style="color:#D69E2E;">${esc(scenarios.scenario_b_moderate_restructuring?.recommendation)}</span>
                    </div>
                    <div style="background:#FFF; padding:8px; border-radius:6px; border:1px solid #48BB78;">
                        <b>Scenario C (Aggressive):</b><br/>
                        Placement: <b style="color:#2F855A;">${esc(scenarios.scenario_c_aggressive_modernisation?.placement_rate_projection)}</b><br/>
                        <span style="color:#2F855A; font-weight:bold;">${esc(scenarios.scenario_c_aggressive_modernisation?.recommendation)}</span>
                    </div>
                </div>
            </div>

            <!-- EXISTING SKILL GAPS & RECOMMENDATIONS -->
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
    const aiBtn = $("aiSyllabusBtn");
    if (!courseId) {
        box.innerHTML = `<p class="empty-hint">Select a course to generate recommendations & AI syllabus module.</p>`;
        aiBtn.style.display = "none";
        $("aiSyllabusBox").style.display = "none";
        return;
    }
    aiBtn.style.display = "inline-block";
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

/* ---------- Scan Market ---------- */
async function scanMarket() {
    const btn = $("scanBtn"), status = $("scanStatus");
    btn.disabled = true;
    status.textContent = "📡 Scanning sources…";
    try {
        const r = await postJSON(`${API}/collector/collect`, {});
        status.textContent = `✔ +${r.collected} new · ${r.skipped} known · ${(r.sources || []).join(", ")}`;
        toast(`Collected ${r.collected} new postings from ${(r.sources || []).length} sources`);
        await Promise.all([
            loadPostingsKpi(),
            loadDistricts(),
            loadGapTable(),
            loadObsolescence(),
            loadTrends(),
            loadMIDCMap(),
        ]);
    } catch (e) {
        status.textContent = "Scan failed.";
        toast("Scan failed: " + e.message, true);
    } finally {
        btn.disabled = false;
    }
}

/* ---------- Bootstrap & Event Listeners ---------- */
function wireEvents() {
    const sBtn = $("scanBtn");
    if (sBtn) sBtn.addEventListener("click", scanMarket);
    $("planBtn").addEventListener("click", generatePlan);
    $("districtSelect").addEventListener("change", e => renderDistrict(e.target.value));
    $("recCourseSelect").addEventListener("change", e => loadRecommendation(e.target.value));
    $("aiSyllabusBtn").addEventListener("click", generateAISyllabus);
    $("upskillForm").addEventListener("submit", handleUpskillSimulation);
    $("downloadPdfBtn").addEventListener("click", downloadCabinetNotePdf);
    $("feedbackForm").addEventListener("submit", submitFeedback);

    // Multilingual Language Switcher Toggle Buttons
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const lang = btn.getAttribute("data-lang");
            setLanguage(lang);
        });
    });

    // Role Tab Switcher Navigation
    document.querySelectorAll(".role-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".role-tab").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".view-content").forEach(v => v.classList.remove("active"));
            tab.classList.add("active");
            const targetId = tab.getAttribute("data-target");
            if (targetId && $(targetId)) {
                $(targetId).classList.add("active");
            }
            if (targetId === "govView" && midcMapInstance) {
                setTimeout(() => midcMapInstance.invalidateSize(), 200);
            }
        });
    });
}

async function init() {
    wireEvents();
    setLanguage(currentLang);  // Initialize active language
    await loadCourses();
    await Promise.all([
        loadMIDCMap(),
        loadDistricts(),
        loadPostingsKpi(),
        loadGapTable(),
        loadObsolescence(),
        loadTrends(),
        loadFeedback(),
    ]);
}

document.addEventListener("DOMContentLoaded", init);
