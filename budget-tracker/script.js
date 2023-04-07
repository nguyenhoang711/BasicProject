// const balance = document.getElementById('balance');
const listTrans = document.getElementById('list');
    // balance.textContent = 120000;
const addBtn = document.getElementById('btn');
addBtn.addEventListener('click', newTransaction);
load();

function html() {
    return `
        <li>
            <span class='time'></span>
            <span class='description'></span>
            <span class='amount-money'></span>
            <button class="delete-btn">&#10005;</button>
        </li>
    `
}

//hàm đầu tiên
function load() {
    //lay ra thong tin trong local storage
    const entries = JSON.parse(localStorage.getItem('budget-tracker') || '[]');
    //truyen tung thanh phan vao
    for (const item of entries) {
        addTransaction(item);
    }
    updateSummary();
}

function save() {
    //lay ra tat ca cac the li ben trong listTrans
    const rows = Array.from(listTrans.querySelectorAll('li'));
    const data = rows.map(row => {
        return {
            type: row.className,
            time: new Date().toISOString().replace(/T.*/,''),
            description: row.querySelector('.description').textContent,
            money: row.querySelector('.amount-money').textContent
        }
    });

    localStorage.setItem('budget-tracker',JSON.stringify(data));
    updateSummary();
}

//ham load từng phần tử trong local storage
function addTransaction(item = {}) {
    listTrans.insertAdjacentHTML('beforeend', html());

    //inject into html: first element append into
    const row = listTrans.querySelector('li:last-of-type');

    row.setAttribute('class',item.type);
    row.querySelector('.time').textContent = item.time;
    row.querySelector('.description').textContent = item.description;
    row.querySelector('.amount-money').textContent = item.money;
    row.querySelector('.delete-btn').addEventListener('click', e => {
        onDeleteEntry(e);
    });
}

function newTransaction() {
    listTrans.insertAdjacentHTML('beforeend', html());

    //inject into html: first element append into
    const row = listTrans.querySelector('li:last-of-type');
    const description = document.getElementById('text');
    const amount = document.getElementById('amount');

    row.setAttribute('class', amount.value < 0 ? 'minus':'plus');
    row.querySelector('.time').textContent = new Date().toISOString().replace(/T.*/,'');
    row.querySelector('.description').textContent = description.value|| 'default';
    row.querySelector('.amount-money').textContent = amount.value|| 0;
    row.querySelector('.delete-btn').addEventListener('click', e => {
        onDeleteEntry(e);
    });
    save();
    reloadForm();
}

function onDeleteEntry(e) {
    e.target.closest('li').remove();
    save();
}

function reloadForm() {;
    document.getElementById('text').value = '';
    document.getElementById('amount').value = 0;
}

function updateSummary() {
    const entries = JSON.parse(localStorage.getItem('budget-tracker') || '[]');
    let totalNegative = 0;
    let totalPositive = 0;
    entries.forEach((entry) => {
        if(entry.money >= 0){
            totalPositive += Number(entry.money);
        }else totalNegative += Number(entry.money);
    });

    document.getElementById('money-plus').textContent = totalPositive;
    document.getElementById('money-dec').textContent = totalNegative;
    document.getElementById('balance').textContent = totalPositive + totalNegative;
}