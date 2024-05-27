document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const totalExpenses = document.getElementById('totalExpenses');
    let expenses = [];

    if(localStorage.getItem('expenses')) {
        expenses = JSON.parse(localStorage.getItem('expenses'));
        displayExpenses();
    }

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = document.getElementById('date').value;
        const category = document.getElementById('category').value;

        if(description && amount && date && category) {
            const expense = {
                id: Date.now(),
                description: description,
                amount: amount,
                date: date,
                category: category
            };

            expenses.push(expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));

            displayExpenses();
            updateTotalExpenses();

            document.getElementById('description').value = '';
            document.getElementById('amount').value = '';
            document.getElementById('date').value = '';
        }
    });

    function displayExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${expense.description}</span>
                <span>$${expense.amount}</span>
                <span>${expense.date}</span>
                <span>${expense.category}</span>
                <button onclick="editExpense(${expense.id})">Edit</button>
                <button onclick="deleteExpense(${expense.id})">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }

    function updateTotalExpenses() {
        const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        totalExpenses.textContent = total.toFixed(2);
    }

    window.deleteExpense = function(id) {
        expenses = expenses.filter(expense => expense.id !== id);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses();
        updateTotalExpenses();
    };

    window.editExpense = function(id) {
        const expense = expenses.find(expense => expense.id === id);
        document.getElementById('description').value = expense.description;
        document.getElementById('amount').value = expense.amount;
        document.getElementById('date').value = expense.date;
        document.getElementById('category').value = expense.category;

        expenses = expenses.filter(expense => expense.id !== id);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        
        displayExpenses();
        updateTotalExpenses();
    };
});
