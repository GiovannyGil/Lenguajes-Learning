/**
 * Finanzas Premium - App Logic
 * Manejo de estado, persistencia y renderizado dinámico.
 */

// --- DATA STATE ---
const defaultState = {
    q1: { income: 0, expenses: [] },
    q2: { income: 0, expenses: [] },
    savings: { total: 0, history: [] },
    meta: {
        lastCutQ1: null, // YYYY-MM
        lastCutQ2: null  // YYYY-MM
    }
};

let state = JSON.parse(localStorage.getItem('finance_state')) || defaultState;

// Asegurar estructura de datos (Migración simple)
state = { ...defaultState, ...state };
state.q1 = { ...defaultState.q1, ...state.q1 };
state.q2 = { ...defaultState.q2, ...state.q2 };
state.savings = { ...defaultState.savings, ...state.savings };
state.meta = { ...defaultState.meta, ...state.meta };

const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
});

// --- INITIALIZATION ---
window.onload = () => {
    loadState();
    checkAutoCuts();
    renderAll();
    setInterval(updateSystemDate, 1000);
    updateSystemDate();
};

function saveState() {
    localStorage.setItem('finance_state', JSON.stringify(state));
}

function loadState() {
    const i1 = document.getElementById('income-q1');
    const i2 = document.getElementById('income-q2');
    if(i1) i1.value = state.q1.income || '';
    if(i2) i2.value = state.q2.income || '';
}

function updateSystemDate() {
    const el = document.getElementById('system-date');
    if(!el) return;
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('es-ES', { month: 'long' });
    el.innerText = `Hoy es ${day} de ${month}`;
}

// --- CORE LOGIC ---

function updateCalculations() {
    state.q1.income = parseFloat(document.getElementById('income-q1').value) || 0;
    state.q2.income = parseFloat(document.getElementById('income-q2').value) || 0;
    
    const totalExpQ1 = state.q1.expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpQ2 = state.q2.expenses.reduce((acc, curr) => acc + curr.amount, 0);

    const surplusQ1 = state.q1.income - totalExpQ1;
    const surplusQ2 = state.q2.income - totalExpQ2;

    const l1 = document.getElementById('leftover-q1');
    const l2 = document.getElementById('leftover-q2');

    if(l1) {
        l1.value = formatter.format(surplusQ1);
        l1.style.color = surplusQ1 < 0 ? 'var(--danger)' : 'var(--accent)';
    }
    if(l2) {
        l2.value = formatter.format(surplusQ2);
        l2.style.color = surplusQ2 < 0 ? 'var(--danger)' : 'var(--accent)';
    }
    
    saveState();
}

async function addExpense(q) {
    const { value: formValues } = await Swal.fire({
        title: 'Nuevo Gasto',
        background: '#1e293b',
        color: '#f8fafc',
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Descripción" style="background: #0f172a; color: white; border: 1px solid var(--glass-border)">' +
            '<input id="swal-input2" type="number" class="swal2-input" placeholder="Monto" style="background: #0f172a; color: white; border: 1px solid var(--glass-border)">',
        focusConfirm: false,
        confirmButtonText: 'Agregar',
        confirmButtonColor: 'var(--primary)',
        preConfirm: () => {
            const desc = document.getElementById('swal-input1').value;
            const amount = document.getElementById('swal-input2').value;
            if (!desc || !amount) {
                Swal.showValidationMessage('Por favor llena ambos campos');
            }
            return { desc: desc, amount: parseFloat(amount) };
        }
    });

    if (formValues) {
        state[q].expenses.push({
            id: Date.now(),
            desc: formValues.desc,
            amount: formValues.amount
        });
        renderExpenses(q);
        updateCalculations();
        Swal.fire({
            icon: 'success',
            title: 'Gasto agregado',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            background: '#1e293b',
            color: '#f8fafc'
        });
    }
}

async function editExpense(q, id) {
    const exp = state[q].expenses.find(e => e.id === id);
    if (!exp) return;

    let currentAmount = exp.amount;

    const { value: formValues } = await Swal.fire({
        title: 'Editar Gasto',
        background: '#1e293b',
        color: '#f8fafc',
        html: `
            <div style="display: flex; flex-direction: column; gap: 15px; text-align: left;">
                <div class="input-group">
                    <label style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 5px;">Descripción</label>
                    <input id="swal-input1" class="swal2-input" value="${exp.desc}" style="margin: 0; width: 100%; background: #0f172a; color: white; border: 1px solid var(--glass-border); border-radius: 12px;">
                </div>
                
                <div class="input-group">
                    <label style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 5px;">Monto Actual</label>
                    <div style="position: relative;">
                        <input id="swal-amount-display" class="swal2-input" value="${currentAmount}" disabled style="margin: 0; width: 100%; background: rgba(15, 23, 42, 0.8); color: var(--accent); border: 2px dashed var(--accent); text-align: center; font-weight: 800; font-size: 1.8rem; border-radius: 16px; height: 70px;">
                        <span style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); color: var(--accent); font-size: 1.2rem; opacity: 0.5;">$</span>
                    </div>
                </div>

                <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 16px; border: 1px solid var(--glass-border); margin-top: 5px;">
                    <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Ajustar Monto</p>
                    <div style="display: grid; grid-template-columns: 1fr auto auto; gap: 10px; align-items: center;">
                        <input id="swal-adj-input" type="number" class="swal2-input" placeholder="0" style="margin: 0; width: 100%; background: #0f172a; color: white; border: 1px solid var(--glass-border); border-radius: 12px; height: 45px;">
                        <button id="btn-sub" type="button" class="btn" style="background: rgba(239, 68, 68, 0.15); color: var(--danger); width: 45px; height: 45px; border-radius: 12px; border: 1px solid var(--danger); cursor: pointer;"><i class="fa-solid fa-minus"></i></button>
                        <button id="btn-add" type="button" class="btn" style="background: rgba(16, 185, 129, 0.15); color: var(--accent); width: 45px; height: 45px; border-radius: 12px; border: 1px solid var(--accent); cursor: pointer;"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
            </div>
        `,
        didOpen: () => {
            const display = document.getElementById('swal-amount-display');
            const adjInput = document.getElementById('swal-adj-input');
            const btnAdd = document.getElementById('btn-add');
            const btnSub = document.getElementById('btn-sub');

            btnAdd.onclick = () => {
                const val = parseFloat(adjInput.value) || 0;
                if(val === 0) return;
                currentAmount += val;
                display.value = currentAmount;
                adjInput.value = '';
                adjInput.focus();
            };

            btnSub.onclick = () => {
                const val = parseFloat(adjInput.value) || 0;
                if(val === 0) return;
                currentAmount -= val;
                display.value = Math.max(0, currentAmount);
                currentAmount = Math.max(0, currentAmount);
                adjInput.value = '';
                adjInput.focus();
            };
        },
        focusConfirm: false,
        confirmButtonText: 'Guardar cambios',
        confirmButtonColor: 'var(--primary)',
        preConfirm: () => {
            const desc = document.getElementById('swal-input1').value;
            if (!desc) {
                Swal.showValidationMessage('Por favor llena la descripción');
            }
            return { desc: desc, amount: currentAmount };
        }
    });

    if (formValues) {
        exp.desc = formValues.desc;
        exp.amount = formValues.amount;
        renderExpenses(q);
        updateCalculations();
        Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            background: '#1e293b',
            color: '#f8fafc'
        });
    }
}

async function removeExpense(q, id) {
    const result = await Swal.fire({
        title: '¿Eliminar gasto?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        background: '#1e293b',
        color: '#f8fafc',
        showCancelButton: true,
        confirmButtonColor: 'var(--danger)',
        cancelButtonColor: 'var(--glass-border)',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        state[q].expenses = state[q].expenses.filter(e => e.id !== id);
        renderExpenses(q);
        updateCalculations();
    }
}

async function addManualDeposit() {
    const { value: formValues } = await Swal.fire({
        title: 'Agregar Ahorro',
        background: '#1e293b',
        color: '#f8fafc',
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Descripción (Ej: Ahorro guardado)" style="background: #0f172a; color: white; border: 1px solid var(--glass-border)">' +
            '<input id="swal-input2" type="number" class="swal2-input" placeholder="Monto" style="background: #0f172a; color: white; border: 1px solid var(--glass-border)">',
        focusConfirm: false,
        confirmButtonText: 'Depositar',
        confirmButtonColor: 'var(--accent)',
        preConfirm: () => {
            const desc = document.getElementById('swal-input1').value;
            const amount = document.getElementById('swal-input2').value;
            if (!desc || !amount) {
                Swal.showValidationMessage('Campos requeridos');
            }
            return { desc: desc, amount: parseFloat(amount) };
        }
    });

    if (formValues) {
        state.savings.history.unshift({
            id: Date.now(),
            desc: formValues.desc,
            amount: formValues.amount,
            date: new Date().toLocaleDateString(),
            type: 'income'
        });
        
        state.savings.total += formValues.amount;
        renderSavings();
        saveState();
        Swal.fire({
            icon: 'success',
            title: 'Ahorro agregado',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            background: '#1e293b',
            color: '#f8fafc'
        });
    }
}

async function addManualWithdrawal() {
    const { value: formValues } = await Swal.fire({
        title: 'Registrar Imprevisto',
        background: '#1e293b',
        color: '#f8fafc',
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Descripción" style="background: #0f172a; color: white; border: 1px solid var(--glass-border)">' +
            '<input id="swal-input2" type="number" class="swal2-input" placeholder="Monto" style="background: #0f172a; color: white; border: 1px solid var(--glass-border)">',
        focusConfirm: false,
        confirmButtonText: 'Retirar',
        confirmButtonColor: 'var(--secondary)',
        preConfirm: () => {
            const desc = document.getElementById('swal-input1').value;
            const amount = document.getElementById('swal-input2').value;
            if (!desc || !amount) {
                Swal.showValidationMessage('Campos requeridos');
            }
            return { desc: desc, amount: parseFloat(amount) };
        }
    });

    if (formValues) {
        state.savings.history.unshift({
            id: Date.now(),
            desc: formValues.desc,
            amount: formValues.amount,
            date: new Date().toLocaleDateString(),
            type: 'withdrawal'
        });
        
        state.savings.total -= formValues.amount;
        renderSavings();
        saveState();
        Swal.fire({
            icon: 'info',
            title: 'Retiro registrado',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            background: '#1e293b',
            color: '#f8fafc'
        });
    }
}

// --- AUTOMATIC CUTS ---
function checkAutoCuts() {
    const now = new Date();
    const day = now.getDate();
    const currentMonthYear = `${now.getFullYear()}-${now.getMonth()}`;

    // Corte Q1: Ocurre el día 29 de cada mes
    if (day >= 29 && state.meta.lastCutQ1 !== currentMonthYear) {
        const totalExpQ1 = state.q1.expenses.reduce((acc, curr) => acc + curr.amount, 0);
        const surplus = state.q1.income - totalExpQ1;
        
        if (surplus > 0) {
            processCut('q1', surplus, "Corte Q1 Automático (Día 29)");
        }
        state.meta.lastCutQ1 = currentMonthYear;
        saveState();
    }

    // Corte Q2: Ocurre el día 14 de cada mes (sobrante del mes anterior/quincena 30)
    if (day >= 14 && state.meta.lastCutQ2 !== currentMonthYear) {
        const totalExpQ2 = state.q2.expenses.reduce((acc, curr) => acc + curr.amount, 0);
        const surplus = state.q2.income - totalExpQ2;
        
        if (surplus > 0) {
            processCut('q2', surplus, "Corte Q2 Automático (Día 14)");
        }
        state.meta.lastCutQ2 = currentMonthYear;
        saveState();
    }
}

function processCut(origin, amount, label) {
    state.savings.total += amount;
    state.savings.history.unshift({
        id: Date.now(),
        desc: label,
        amount: amount,
        date: new Date().toLocaleDateString(),
        type: 'income'
    });
}

// --- RENDERING ---

function renderExpenses(q) {
    const container = document.getElementById(`expenses-${q}`);
    if(!container) return;
    container.innerHTML = '';
    
    state[q].expenses.forEach(exp => {
        const div = document.createElement('div');
        div.className = 'expense-item';
        div.innerHTML = `
            <div class="expense-info">
                <span class="desc">${exp.desc}</span>
                <span class="val">${formatter.format(exp.amount)}</span>
            </div>
            <button class="btn btn-edit" onclick="editExpense('${q}', ${exp.id})" title="Editar">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button class="btn btn-remove" onclick="removeExpense('${q}', ${exp.id})" title="Eliminar">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        container.appendChild(div);
    });
}

function renderSavings() {
    const container = document.getElementById('savings-history');
    if(!container) return;
    container.innerHTML = '';
    
    const ts = document.getElementById('total-savings');
    const badge = document.getElementById('savings-total-badge');
    if(ts) ts.value = formatter.format(state.savings.total);
    if(badge) badge.innerText = formatter.format(state.savings.total);

    state.savings.history.forEach(item => {
        const div = document.createElement('div');
        div.className = `history-item ${item.type === 'income' ? 'income' : 'expense'}`;
        div.innerHTML = `
            <div class="history-info">
                <h4>${item.desc}</h4>
                <span>${item.date}</span>
            </div>
            <div class="amount ${item.type === 'income' ? 'pos' : 'neg'}">
                ${item.type === 'income' ? '+' : '-'}${formatter.format(item.amount)}
            </div>
        `;
        container.appendChild(div);
    });
}

function renderAll() {
    renderExpenses('q1');
    renderExpenses('q2');
    renderSavings();
    updateCalculations();
}
