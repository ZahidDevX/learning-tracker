// Simple vanilla JS tracker for Laravel docs. Stores state in localStorage.
const STORAGE_KEY = 'laravel-learning-progress:v1';

// Fixed, built-in learning checklist. Edit this array to change the list.
const DEFAULT_SECTIONS = [
    {
        title: 'Prologue',
        items: [
            { title: 'Release Notes', href: '/docs/12.x/releases' },
            { title: 'Upgrade Guide', href: '/docs/12.x/upgrade' },
            { title: 'Contribution Guide', href: '/docs/12.x/contributions' },
        ],
    },
    {
        title: 'Getting Started',
        items: [
            { title: 'Installation', href: '/docs/12.x/installation' },
            { title: 'Configuration', href: '/docs/12.x/configuration' },
            { title: 'Agentic Development', href: '/docs/12.x/ai' },
            { title: 'Directory Structure', href: '/docs/12.x/structure' },
            { title: 'Frontend', href: '/docs/12.x/frontend' },
            { title: 'Starter Kits', href: '/docs/12.x/starter-kits' },
            { title: 'Deployment', href: '/docs/12.x/deployment' },
        ],
    },
    {
        title: 'Architecture Concepts',
        items: [
            { title: 'Request Lifecycle', href: '/docs/12.x/lifecycle' },
            { title: 'Service Container', href: '/docs/12.x/container' },
            { title: 'Service Providers', href: '/docs/12.x/providers' },
            { title: 'Facades', href: '/docs/12.x/facades' },
        ],
    },
    {
        title: 'The Basics',
        items: [
            { title: 'Routing', href: '/docs/12.x/routing' },
            { title: 'Middleware', href: '/docs/12.x/middleware' },
            { title: 'CSRF Protection', href: '/docs/12.x/csrf' },
            { title: 'Controllers', href: '/docs/12.x/controllers' },
            { title: 'Requests', href: '/docs/12.x/requests' },
            { title: 'Responses', href: '/docs/12.x/responses' },
            { title: 'Views', href: '/docs/12.x/views' },
            { title: 'Blade Templates', href: '/docs/12.x/blade' },
            { title: 'Asset Bundling', href: '/docs/12.x/vite' },
            { title: 'URL Generation', href: '/docs/12.x/urls' },
            { title: 'Session', href: '/docs/12.x/session' },
            { title: 'Validation', href: '/docs/12.x/validation' },
            { title: 'Error Handling', href: '/docs/12.x/errors' },
            { title: 'Logging', href: '/docs/12.x/logging' },
        ],
    },
    {
        title: 'Digging Deeper',
        items: [
            { title: 'Artisan Console', href: '/docs/12.x/artisan' },
            { title: 'Broadcasting', href: '/docs/12.x/broadcasting' },
            { title: 'Cache', href: '/docs/12.x/cache' },
            { title: 'Collections', href: '/docs/12.x/collections' },
            { title: 'Concurrency', href: '/docs/12.x/concurrency' },
            { title: 'Context', href: '/docs/12.x/context' },
            { title: 'Contracts', href: '/docs/12.x/contracts' },
            { title: 'Events', href: '/docs/12.x/events' },
            { title: 'File Storage', href: '/docs/12.x/filesystem' },
            { title: 'Helpers', href: '/docs/12.x/helpers' },
            { title: 'HTTP Client', href: '/docs/12.x/http-client' },
            { title: 'Localization', href: '/docs/12.x/localization' },
            { title: 'Mail', href: '/docs/12.x/mail' },
            { title: 'Notifications', href: '/docs/12.x/notifications' },
            { title: 'Package Development', href: '/docs/12.x/packages' },
            { title: 'Processes', href: '/docs/12.x/processes' },
            { title: 'Queues', href: '/docs/12.x/queues' },
            { title: 'Rate Limiting', href: '/docs/12.x/rate-limiting' },
            { title: 'Strings', href: '/docs/12.x/strings' },
            { title: 'Task Scheduling', href: '/docs/12.x/scheduling' },
        ],
    },
    {
        title: 'Security',
        items: [
            { title: 'Authentication', href: '/docs/12.x/authentication' },
            { title: 'Authorization', href: '/docs/12.x/authorization' },
            { title: 'Email Verification', href: '/docs/12.x/verification' },
            { title: 'Encryption', href: '/docs/12.x/encryption' },
            { title: 'Hashing', href: '/docs/12.x/hashing' },
            { title: 'Password Reset', href: '/docs/12.x/passwords' },
        ],
    },
    {
        title: 'Database',
        items: [
            { title: 'Getting Started', href: '/docs/12.x/database' },
            { title: 'Query Builder', href: '/docs/12.x/queries' },
            { title: 'Pagination', href: '/docs/12.x/pagination' },
            { title: 'Migrations', href: '/docs/12.x/migrations' },
            { title: 'Seeding', href: '/docs/12.x/seeding' },
            { title: 'Redis', href: '/docs/12.x/redis' },
            { title: 'MongoDB', href: '/docs/12.x/mongodb' },
        ],
    },
    {
        title: 'Eloquent ORM',
        items: [
            { title: 'Getting Started', href: '/docs/12.x/eloquent' },
            { title: 'Relationships', href: '/docs/12.x/eloquent-relationships' },
            { title: 'Collections', href: '/docs/12.x/eloquent-collections' },
            { title: 'Mutators / Casts', href: '/docs/12.x/eloquent-mutators' },
            { title: 'API Resources', href: '/docs/12.x/eloquent-resources' },
            { title: 'Serialization', href: '/docs/12.x/eloquent-serialization' },
            { title: 'Factories', href: '/docs/12.x/eloquent-factories' },
        ],
    },
    {
        title: 'AI',
        items: [
            { title: 'Boost', href: '/docs/12.x/boost' },
            { title: 'MCP', href: '/docs/12.x/mcp' },
        ],
    },
    {
        title: 'Testing',
        items: [
            { title: 'Getting Started', href: '/docs/12.x/testing' },
            { title: 'HTTP Tests', href: '/docs/12.x/http-tests' },
            { title: 'Console Tests', href: '/docs/12.x/console-tests' },
            { title: 'Browser Tests', href: '/docs/12.x/dusk' },
            { title: 'Database', href: '/docs/12.x/database-testing' },
            { title: 'Mocking', href: '/docs/12.x/mocking' },
        ],
    },
    {
        title: 'Packages',
        items: [
            { title: 'Cashier (Stripe)', href: '/docs/12.x/billing' },
            { title: 'Cashier (Paddle)', href: '/docs/12.x/cashier-paddle' },
            { title: 'Dusk', href: '/docs/12.x/dusk' },
            { title: 'Envoy', href: '/docs/12.x/envoy' },
            { title: 'Fortify', href: '/docs/12.x/fortify' },
            { title: 'Folio', href: '/docs/12.x/folio' },
            { title: 'Homestead', href: '/docs/12.x/homestead' },
            { title: 'Horizon', href: '/docs/12.x/horizon' },
            { title: 'Mix', href: '/docs/12.x/mix' },
            { title: 'Octane', href: '/docs/12.x/octane' },
            { title: 'Passport', href: '/docs/12.x/passport' },
            { title: 'Pennant', href: '/docs/12.x/pennant' },
            { title: 'Pint', href: '/docs/12.x/pint' },
            { title: 'Precognition', href: '/docs/12.x/precognition' },
            { title: 'Prompts', href: '/docs/12.x/prompts' },
            { title: 'Pulse', href: '/docs/12.x/pulse' },
            { title: 'Reverb', href: '/docs/12.x/reverb' },
            { title: 'Sail', href: '/docs/12.x/sail' },
            { title: 'Sanctum', href: '/docs/12.x/sanctum' },
            { title: 'Scout', href: '/docs/12.x/scout' },
            { title: 'Socialite', href: '/docs/12.x/socialite' },
            { title: 'Telescope', href: '/docs/12.x/telescope' },
            { title: 'Valet', href: '/docs/12.x/valet' },
        ],
    },
    {
        title: 'External',
        items: [
            { title: 'API Documentation', href: 'https://api.laravel.com/docs/12.x' },
            { title: 'Changelog', href: '/docs/changelog' },
        ],
    },
];

// Timer configuration — set these two values to control the countdown.
// `TIMER_START_DATE` should be in YYYY-MM-DD format. `TIMER_TOTAL_DAYS` is a number of days.
const TIMER_START_DATE = '2026-02-07'; // change this to your start date
const TIMER_TOTAL_DAYS = 100; // change this to total learning days

function formatRemaining(ms) {
    if (ms <= 0) return '0d 0h 0m 0s';
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    ms -= days * 24 * 60 * 60 * 1000;
    const hours = Math.floor(ms / (1000 * 60 * 60));
    ms -= hours * 60 * 60 * 1000;
    const minutes = Math.floor(ms / (1000 * 60));
    ms -= minutes * 60 * 1000;
    const seconds = Math.floor(ms / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function updateTimer() {
    const el = document.getElementById('remaining');
    if (!el) return;
    const start = new Date(TIMER_START_DATE + 'T00:00:00');
    if (isNaN(start)) { el.textContent = 'Invalid start date'; return; }
    const end = new Date(start);
    end.setDate(end.getDate() + Number(TIMER_TOTAL_DAYS));
    const now = new Date();
    const diff = end - now;
    el.textContent = formatRemaining(diff);
}


function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

function parseNavFromHtml(html) {
    const container = document.createElement('div');
    container.innerHTML = html;
    const sections = [];
    // Top-level list items that contain a heading and a nested ul
    const lis = container.querySelectorAll('ul > li');
    lis.forEach(li => {
        const h = li.querySelector('h2');
        const ul = li.querySelector('ul');
        if (h && ul) {
            const title = h.textContent.trim();
            const items = Array.from(ul.querySelectorAll('li > a')).map(a => ({
                title: a.textContent.trim(),
                href: a.getAttribute('href') || ''
            }));
            if (items.length) sections.push({ title, items });
        }
    });
    // If parsing failed (no sections), try fallback: find lists of links grouped by h2
    if (!sections.length) {
        const headings = container.querySelectorAll('h2');
        headings.forEach(h => {
            const next = h.nextElementSibling;
            if (next && next.tagName.toLowerCase() === 'ul') {
                const items = Array.from(next.querySelectorAll('li > a')).map(a => ({ title: a.textContent.trim(), href: a.getAttribute('href') || '' }));
                if (items.length) sections.push({ title: h.textContent.trim(), items });
            }
        });
    }
    return sections;
}

function buildIds(sections) {
    const byId = {};
    sections.forEach(s => {
        const sid = slugify(s.title);
        s.items.forEach(i => {
            const id = `${sid}--${slugify(i.title)}`;
            byId[id] = { section: s.title, title: i.title, href: i.href };
        });
    });
    return byId;
}

function loadState() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (e) {
        return {};
    }
}

function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render(sections) {
    const listEl = document.getElementById('list');
    const state = loadState();
    listEl.innerHTML = '';

    // If no sections provided (embedded nav removed), reconstruct from saved state
    if (!sections || !sections.length) {
        const bySection = {};
        Object.keys(state).forEach(k => {
            if (k === 'meta') return;
            const entry = state[k];
            const secName = entry.section || 'General';
            if (!bySection[secName]) bySection[secName] = {};
            bySection[secName][entry.title] = { title: entry.title, href: entry.href || '' };
        });
        sections = Object.keys(bySection).map(sec => ({ title: sec, items: Object.values(bySection[sec]) }));
    }

    let total = 0, completed = 0;
    const ids = buildIds(sections);

    // Save meta if not present
    if (!state.meta) state.meta = { updated: Date.now() };

    const orderedIds = Object.keys(ids); // preserve order from sections
    orderedIds.forEach(id => {
        total += 1;
        if (state[id]) completed += 1;
    });

    document.getElementById('total-count').textContent = total;
    document.getElementById('completed-count').textContent = completed;
    const pct = total ? Math.round((completed / total) * 100) : 0;
    document.getElementById('progress-bar').style.width = pct + '%';

    // determine the next incomplete id (first id not in state)
    const nextId = orderedIds.find(id => !state[id]);

    sections.forEach(s => {
        const sec = document.createElement('div');
        sec.className = 'section';
        const h3 = document.createElement('h3');
        h3.textContent = s.title;
        sec.appendChild(h3);

        s.items.forEach(i => {
            const id = `${slugify(s.title)}--${slugify(i.title)}`;
            const done = !!state[id];
            const item = document.createElement('div');
            item.className = 'item';

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = id;
            input.checked = done;
            // allow unchecking completed items (with confirmation), but only allow checking the next incomplete item
            input.disabled = (!done && id !== nextId);
            input.addEventListener('change', e => {
                const cur = loadState();
                // checking an item (complete)
                if (e.target.checked) {
                    // only the next incomplete item should be checkable (disabled prevents others)
                    cur[id] = { when: Date.now(), href: i.href, title: i.title, section: s.title };
                    saveState(cur);
                    // if this was the last item, notify user
                    const remaining = orderedIds.find(x => !cur[x]);
                    if (!remaining) alert('All items completed — congratulations!');
                } else {
                    // unchecking a previously completed item: ask for confirmation
                    if (done) {
                        const ok = confirm('Mark this item as incomplete? This will unlock subsequent items.');
                        if (!ok) {
                            // revert checkbox
                            e.target.checked = true;
                            return;
                        }
                        delete cur[id];
                        saveState(cur);
                    }
                }
                render(sections);
            });

            const label = document.createElement('label');
            label.htmlFor = id;
            // Build full docs URL if href starts with /docs/
            let fullUrl = i.href;
            if (i.href && i.href.startsWith('/docs/')) {
                fullUrl = 'https://laravel.com' + i.href;
            }
            label.innerHTML = `<strong>${i.title}</strong> <a href="${fullUrl}" target="_blank" rel="noopener" class="muted">[link]</a>`;

            item.appendChild(input);
            item.appendChild(label);
            sec.appendChild(item);
        });

        listEl.appendChild(sec);
    });
}

function getSectionsFromInput() {
    // No longer used: checklist is fixed in DEFAULT_SECTIONS
    return DEFAULT_SECTIONS;
}

function init() {
    const loadBtn = document.getElementById('load-nav');
    const markAllBtn = document.getElementById('mark-all');
    const markNoneBtn = document.getElementById('mark-none');
    const clearBtn = document.getElementById('clear');
    const exportBtn = document.getElementById('export');
    const importBtn = document.getElementById('import');

    // Use the fixed checklist (no embedded or pasted nav)
    let sections = DEFAULT_SECTIONS;
    // start timer updates
    updateTimer();
    setInterval(updateTimer, 1000);
    render(sections);

    if (markAllBtn) {
        markAllBtn.addEventListener('click', () => {
            const state = loadState();
            const ids = buildIds(sections);
            Object.keys(ids).forEach(id => state[id] = { when: Date.now(), ...ids[id] });
            saveState(state);
            render(sections);
        });
    }

    if (markNoneBtn) {
        markNoneBtn.addEventListener('click', () => {
            const state = loadState();
            const ids = buildIds(sections);
            Object.keys(ids).forEach(id => delete state[id]);
            saveState(state);
            render(sections);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Clear all progress?')) {
                localStorage.removeItem(STORAGE_KEY);
                render(sections);
            }
        });
    }

    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const data = loadState();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = 'laravel-learning-progress.json';
            document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
        });
    }

    if (importBtn) {
        importBtn.addEventListener('click', () => {
            const text = prompt('Paste exported JSON here');
            if (!text) return;
            try {
                const data = JSON.parse(text);
                saveState(data);
                sections = getSectionsFromInput();
                render(sections);
                alert('Imported successfully');
            } catch (e) {
                alert('Invalid JSON');
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', init);